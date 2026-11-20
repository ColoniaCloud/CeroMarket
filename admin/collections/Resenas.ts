import type { CollectionConfig, Endpoint } from "payload";
import { ErrorDeGoogle, sincronizarResenas } from "../lib/googleResenas";
import { alCambiar } from "../lib/publicar";

const url = (valor: unknown) =>
  !valor || /^https?:\/\/\S+$/.test(String(valor)) || "Tiene que ser una dirección completa (https://...).";

// POST /api/resenas/sincronizar — trae de Google Maps el puntaje y las
// reseñas más relevantes (ver lib/googleResenas.ts).
const sincronizar: Endpoint = {
  path: "/sincronizar",
  method: "post",
  handler: async (req) => {
    if (!req.user) return Response.json({ error: "Iniciá sesión para sincronizar." }, { status: 401 });
    try {
      return Response.json(await sincronizarResenas(req.payload));
    } catch (error) {
      if (error instanceof ErrorDeGoogle) return Response.json({ error: error.message }, { status: 400 });
      req.payload.logger.error({ err: error }, "[resenas] No se pudo sincronizar con Google");
      return Response.json({ error: "No se pudo sincronizar. Probá de nuevo en un rato." }, { status: 500 });
    }
  },
};

export const Resenas: CollectionConfig = {
  slug: "resenas",
  labels: { singular: "Reseña", plural: "Reseñas" },
  // Sin sesión solo se ven las publicadas: es lo que lee el sitio.
  access: { read: ({ req }) => (req.user ? true : { publicada: { not_equals: false } }) },
  defaultSort: "-createdAt",
  admin: {
    useAsTitle: "autor",
    defaultColumns: ["autor", "estrellas", "cuando", "origen", "publicada"],
    listSearchableFields: ["autor", "texto"],
    group: "Contenido",
    description:
      "Las reseñas que se muestran antes del pie de todas las páginas. Se traen de Google Maps con «Sincronizar con Google» o se cargan a mano.",
    components: { beforeListTable: ["/components/SincronizarResenas#SincronizarResenas"] },
  },
  hooks: { afterChange: [alCambiar], afterDelete: [alCambiar] },
  endpoints: [sincronizar],
  fields: [
    {
      type: "row",
      fields: [
        { name: "autor", label: "Autor", type: "text", required: true, admin: { width: "50%" } },
        {
          name: "estrellas",
          label: "Estrellas",
          type: "number",
          required: true,
          min: 1,
          max: 5,
          admin: { width: "25%", step: 1 },
          validate: (valor: unknown) => Number.isInteger(valor) || "Un número entero del 1 al 5.",
        },
        { name: "cuando", label: "Cuándo", type: "text", admin: { width: "25%", description: "Ej: hace 2 meses" } },
      ],
    },
    { name: "texto", label: "Texto de la reseña", type: "textarea", required: true },
    {
      name: "enlace",
      label: "Enlace a la reseña",
      type: "text",
      validate: url,
      admin: { description: "Opcional: dónde se ve la reseña en Google Maps." },
    },
    { name: "publicada", label: "Mostrar en el sitio", type: "checkbox", defaultValue: true, admin: { position: "sidebar" } },
    {
      name: "origen",
      label: "Origen",
      type: "select",
      defaultValue: "manual",
      options: [
        { label: "Cargada a mano", value: "manual" },
        { label: "Google Maps", value: "google" },
      ],
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "idGoogle",
      label: "ID en Google",
      type: "text",
      unique: true,
      index: true,
      // Vacío es null, no "": así varias reseñas a mano no chocan entre sí.
      hooks: { beforeValidate: [({ value }) => (typeof value === "string" && value.trim() ? value.trim() : null)] },
      admin: { position: "sidebar", readOnly: true, condition: (datos) => Boolean(datos?.idGoogle) },
    },
  ],
};
