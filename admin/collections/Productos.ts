import type { CollectionConfig } from "payload";
import { campoSlug } from "../lib/campos";
import { alCambiar } from "../lib/publicar";

export const Productos: CollectionConfig = {
  slug: "productos",
  labels: { singular: "Producto", plural: "Productos" },
  // Sin sesión solo se ven los publicados: es lo que lee el sitio.
  access: { read: ({ req }) => (req.user ? true : { publicado: { not_equals: false } }) },
  defaultSort: "nombre",
  admin: {
    useAsTitle: "nombre",
    defaultColumns: ["imagen", "nombre", "categoria", "precio", "venta", "disponible"],
    listSearchableFields: ["nombre", "marca", "codigo"],
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
          admin: { width: "50%", description: "Ej: 250 ml, 190 g. En productos a granel va vacío." },
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
            description:
              "A granel: es el precio por kilo (o por litro, según «El precio es por»). Si queda vacío, el sitio muestra «precio a confirmar».",
          },
        },
      ],
    },
    { name: "descripcion", label: "Descripción", type: "textarea" },
    { name: "imagen", label: "Foto principal", type: "upload", relationTo: "medios" },
    { name: "galeria", label: "Más fotos", type: "upload", relationTo: "medios", hasMany: true },
    {
      name: "venta",
      label: "Venta",
      type: "select",
      required: true,
      defaultValue: "empaquetado",
      options: [
        { label: "Empaquetado (por unidad)", value: "empaquetado" },
        { label: "A granel (el cliente elige cuánto)", value: "granel" },
      ],
      admin: {
        position: "sidebar",
        description: "A granel: la ficha pide los gramos (o ml) y calcula el precio.",
      },
    },
    {
      name: "unidadGranel",
      label: "El precio es por",
      type: "select",
      defaultValue: "kilo",
      options: [
        { label: "Kilo", value: "kilo" },
        { label: "Litro", value: "litro" },
      ],
      admin: { position: "sidebar", condition: (datos) => datos?.venta === "granel" },
    },
    {
      name: "codigo",
      label: "Código del CRM",
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Con este código la lista de precios mensual actualiza el precio de este producto.",
      },
      hooks: {
        // Vacío es «sin código», no un texto vacío: así no choca el unique.
        beforeValidate: [({ value }) => (typeof value === "string" && value.trim() ? value.trim() : null)],
      },
    },
    {
      name: "disponible",
      label: "Disponible",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Destildado: se ve «sin stock» y no se puede agregar al pedido." },
    },
    {
      name: "publicado",
      label: "Publicado",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Destildado: el producto no aparece en el sitio." },
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
