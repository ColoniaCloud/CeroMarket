import type { CollectionConfig } from "payload";

const logueado = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export const Ignorados: CollectionConfig = {
  slug: "ignorados",
  labels: { singular: "Código ignorado", plural: "Códigos ignorados" },
  access: { read: logueado, create: logueado, update: logueado, delete: logueado },
  admin: {
    useAsTitle: "codigo",
    defaultColumns: ["codigo", "articulo", "motivo"],
    listSearchableFields: ["codigo", "articulo"],
    group: "Administración",
    description:
      "Artículos del CRM que la lista de precios no tiene que convertir en productos (envases, pruebas, insumos). Lo que se destilda al revisar una lista queda acá; borrando la fila vuelve a aparecer en la próxima.",
  },
  fields: [
    {
      name: "codigo",
      label: "Código del CRM",
      type: "text",
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [({ value }) => (typeof value === "string" ? value.trim() : value)] },
    },
    { name: "articulo", label: "Artículo", type: "text" },
    { name: "motivo", label: "Motivo", type: "text" },
  ],
};
