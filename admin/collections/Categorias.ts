import type { CollectionConfig } from "payload";
import { campoSlug } from "../lib/campos";
import { alCambiar } from "../lib/publicar";

export const Categorias: CollectionConfig = {
  slug: "categorias",
  labels: { singular: "Categoría", plural: "Categorías" },
  access: { read: () => true },
  defaultSort: "orden",
  admin: { useAsTitle: "nombre", defaultColumns: ["nombre", "orden"], group: "Catálogo" },
  hooks: { afterChange: [alCambiar], afterDelete: [alCambiar] },
  fields: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    campoSlug("nombre"),
    {
      name: "orden",
      label: "Orden",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Las de número más bajo aparecen primero en el sitio." },
    },
  ],
};
