// Lee de la base lo que el análisis necesita saber del catálogo actual.
import type { Payload, PayloadRequest } from "payload";
import type { EstadoActual } from "./analizar";

export const cargarEstado = async (payload: Payload, req?: PayloadRequest): Promise<EstadoActual> => {
  const opciones = { pagination: false as const, depth: 0, overrideAccess: true, ...(req ? { req } : {}) };
  const [productos, categorias, ignorados] = await Promise.all([
    payload.find({ collection: "productos", ...opciones }),
    payload.find({ collection: "categorias", ...opciones }),
    payload.find({ collection: "ignorados", ...opciones }),
  ]);

  return {
    productos: productos.docs.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      marca: producto.marca ?? "",
      presentacion: producto.presentacion ?? "",
      codigo: producto.codigo ?? null,
      precio: producto.precio ?? null,
      venta: producto.venta ?? "empaquetado",
    })),
    categorias: categorias.docs.map(({ slug, nombre }) => ({ slug, nombre })),
    ignorados: Object.fromEntries(ignorados.docs.map(({ codigo, motivo }) => [codigo, motivo || "Ignorado"])),
  };
};
