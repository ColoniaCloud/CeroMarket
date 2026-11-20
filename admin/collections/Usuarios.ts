import type { CollectionConfig } from "payload";

export const Usuarios: CollectionConfig = {
  slug: "usuarios",
  labels: { singular: "Usuario", plural: "Usuarios" },
  auth: true,
  admin: { useAsTitle: "email", group: "Administración" },
  fields: [{ name: "nombre", label: "Nombre", type: "text" }],
};
