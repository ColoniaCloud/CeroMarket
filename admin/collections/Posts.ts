import { lexicalHTMLField } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { campoSlug } from "../lib/campos";
import { alCambiar } from "../lib/publicar";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Nota o receta", plural: "Notas y recetas" },
  // Los borradores se ven solo en el panel; el sitio recibe lo publicado.
  versions: { drafts: true },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
  },
  defaultSort: "-fecha",
  admin: { useAsTitle: "titulo", defaultColumns: ["titulo", "tipo", "_status", "fecha"], group: "Contenido" },
  hooks: { afterChange: [alCambiar], afterDelete: [alCambiar] },
  fields: [
    { name: "titulo", label: "Título", type: "text", required: true },
    campoSlug("titulo"),
    {
      name: "tipo",
      label: "Tipo",
      type: "select",
      required: true,
      defaultValue: "nota",
      options: [
        { label: "Nota", value: "nota" },
        { label: "Receta", value: "receta" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "fecha", label: "Fecha de publicación", type: "date", admin: { position: "sidebar" } },
    { name: "bajada", label: "Bajada", type: "textarea", admin: { description: "Resumen de una o dos líneas." } },
    { name: "portada", label: "Portada", type: "upload", relationTo: "medios" },
    { name: "contenido", label: "Contenido", type: "richText" },
    // El sitio Astro recibe el contenido ya en HTML: no necesita el editor.
    lexicalHTMLField({ htmlFieldName: "contenidoHTML", lexicalFieldName: "contenido" }),
  ],
};
