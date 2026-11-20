import path from "node:path";
import { APIError, type CollectionBeforeChangeHook, type CollectionConfig, type Endpoint } from "payload";
import { directorioDeDatos } from "../lib/datos";
import { analizar, type Analisis } from "../lib/lista/analizar";
import { aplicarLista, ErrorDeDecisiones, validarDecisiones } from "../lib/lista/aplicar";
import { normalizarDecisiones } from "../lib/lista/decisiones";
import { cargarEstado } from "../lib/lista/estado";
import { leerPdf } from "../lib/lista/leerPdf";
import { ErrorDeLista } from "../lib/lista/tipos";

const logueado = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

// Al subir el PDF se lee y se compara con el catálogo, pero no se cambia nada:
// el resultado queda guardado para revisarlo y recién después aplicarlo.
const analizarAlSubir: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  if (operation !== "create") return data;
  if (!req.file) throw new APIError("Subí el PDF de la lista de precios.", 400, undefined, true);

  let lista;
  try {
    lista = await leerPdf(new Uint8Array(req.file.data));
  } catch (error) {
    if (error instanceof ErrorDeLista) throw new APIError(error.message, 400, undefined, true);
    throw error;
  }
  const analisis = analizar(lista, await cargarEstado(req.payload, req));
  return {
    ...data,
    estado: "pendiente",
    progreso: 0,
    lista: `${lista.lista || "Lista"} · ${lista.fecha ?? "sin fecha"}`,
    analisis,
  };
};

const QUINCE_MINUTOS = 15 * 60_000;

// POST /api/importaciones/:id/aplicar — con las decisiones de la revisión.
// Responde enseguida y sigue trabajando en segundo plano: la primera lista
// crea más de mil productos y no entra en lo que espera un pedido web.
const aplicar: Endpoint = {
  path: "/:id/aplicar",
  method: "post",
  handler: async (req) => {
    if (!req.user) return Response.json({ error: "Iniciá sesión para aplicar la lista." }, { status: 401 });
    const id = req.routeParams?.id;
    if (typeof id !== "string" && typeof id !== "number") return Response.json({ error: "Falta la lista." }, { status: 400 });

    let crudo: unknown;
    try {
      crudo = await req.json?.();
    } catch {
      return Response.json({ error: "Las decisiones no llegaron bien." }, { status: 400 });
    }
    const decisiones = normalizarDecisiones(crudo);
    const { payload } = req;

    const documento = await payload.findByID({ collection: "importaciones", id, depth: 0, overrideAccess: true });
    const analisis = documento.analisis as unknown as Analisis | null;
    if (!analisis) return Response.json({ error: "Esta lista no tiene análisis." }, { status: 409 });
    const trabada = documento.estado === "aplicando" && Date.now() - new Date(documento.updatedAt).getTime() > QUINCE_MINUTOS;
    if (documento.estado === "aplicada") return Response.json({ error: "Esta lista ya se aplicó." }, { status: 409 });
    if (documento.estado === "aplicando" && !trabada) return Response.json({ error: "Esta lista se está aplicando." }, { status: 409 });

    try {
      const estado = await cargarEstado(payload);
      validarDecisiones(
        analisis,
        decisiones,
        new Map(estado.productos.flatMap((producto) => (producto.codigo ? [[producto.codigo, producto.id] as const] : []))),
      );
    } catch (error) {
      if (error instanceof ErrorDeDecisiones) return Response.json({ error: error.message }, { status: 400 });
      throw error;
    }

    await payload.update({ collection: "importaciones", id, data: { estado: "aplicando", progreso: 0 }, overrideAccess: true });

    void aplicarLista({
      payload,
      analisis,
      decisiones,
      alAvanzar: async (hechas, total) => {
        await payload.update({
          collection: "importaciones",
          id,
          data: { progreso: Math.min(99, Math.round((hechas / Math.max(total, 1)) * 100)) },
          overrideAccess: true,
        });
      },
    })
      .then((resultado) =>
        payload.update({ collection: "importaciones", id, data: { estado: "aplicada", progreso: 100, resultado }, overrideAccess: true }),
      )
      .catch((error: unknown) => {
        payload.logger.error({ err: error }, "[lista] No se pudo aplicar la lista");
        return payload.update({
          collection: "importaciones",
          id,
          data: { estado: "error", resultado: { errores: [error instanceof Error ? error.message : String(error)] } },
          overrideAccess: true,
        });
      });

    return Response.json({ ok: true }, { status: 202 });
  },
};

export const Importaciones: CollectionConfig = {
  slug: "importaciones",
  labels: { singular: "Lista de precios", plural: "Listas de precios" },
  access: { read: logueado, create: logueado, update: logueado, delete: logueado },
  defaultSort: "-createdAt",
  admin: {
    useAsTitle: "lista",
    defaultColumns: ["lista", "estado", "createdAt"],
    group: "Catálogo",
    description:
      "Subí el PDF «Listas de precios» del CRM. Se lee y se compara con el catálogo, pero no se cambia nada hasta que lo revisás y tocás «Aplicar».",
  },
  upload: {
    staticDir: path.join(directorioDeDatos, "listas"),
    mimeTypes: ["application/pdf"],
  },
  hooks: { beforeChange: [analizarAlSubir] },
  endpoints: [aplicar],
  fields: [
    {
      name: "estado",
      label: "Estado",
      type: "select",
      defaultValue: "pendiente",
      options: [
        { label: "Para revisar", value: "pendiente" },
        { label: "Aplicando…", value: "aplicando" },
        { label: "Aplicada", value: "aplicada" },
        { label: "Con error", value: "error" },
      ],
      admin: { position: "sidebar", readOnly: true },
    },
    { name: "lista", label: "Lista", type: "text", admin: { position: "sidebar", readOnly: true } },
    { name: "progreso", type: "number", defaultValue: 0, admin: { disabled: true } },
    {
      name: "analisis",
      type: "json",
      admin: { disabled: true },
      access: { read: logueado },
      // Pesa cientos de KB: el listado no lo necesita, solo la pantalla de revisión.
      // (Devolver undefined conservaría el valor: por eso null.)
      hooks: { afterRead: [({ findMany, value }) => (findMany ? null : value)] },
    },
    { name: "resultado", type: "json", admin: { disabled: true } },
    {
      name: "revision",
      type: "ui",
      admin: { components: { Field: "/components/RevisionDeLista#RevisionDeLista" } },
    },
  ],
};
