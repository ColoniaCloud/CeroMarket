import type { CollectionConfig } from "payload";
import { campoSlug } from "../lib/campos";
import { alCambiar } from "../lib/publicar";

export const Productos: CollectionConfig = {
  slug: "productos",
  labels: { singular: "Producto", plural: "Productos" },
  access: { read: () => true },
  defaultSort: "nombre",
  admin: {
    useAsTitle: "nombre",
    defaultColumns: ["imagen", "nombre", "categoria", "precio", "disponible"],
    listSearchableFields: ["nombre", "marca"],
    group: "Catálogo",
  },
  hooks: { afterChange: [alCambiar], afterDelete: [alCambiar] },
  fields: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    campoSlug("nombre"),
    {
      type: "row",
      fields: [
        { name: "marca", label: "Marca", type: "text", admin: { width: "50%" } },
        {
          name: "presentacion",
          label: "Presentación",
          type: "text",
          admin: { width: "50%", description: "Ej: 250 ml, 190 g, a granel." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "categoria",
          label: "Categoría",
          type: "relationship",
          relationTo: "categorias",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "precio",
          label: "Precio (UYU)",
          type: "number",
          min: 0,
          admin: {
            width: "50%",
            description: "Si queda vacío, el sitio muestra «precio a confirmar» y el pedido lo consulta.",
          },
        },
      ],
    },
    { name: "descripcion", label: "Descripción", type: "textarea" },
    { name: "imagen", label: "Foto principal", type: "upload", relationTo: "medios" },
    { name: "galeria", label: "Más fotos", type: "upload", relationTo: "medios", hasMany: true },
    {
      name: "disponible",
      label: "Disponible",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Destildado: se ve «sin stock» y no se puede agregar al pedido." },
    },
    {
      name: "destacado",
      label: "Destacado en la portada",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
  ],
};
