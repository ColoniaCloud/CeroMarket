import type { CollectionConfig } from "payload";
import { directorioDeMedios } from "../lib/datos";
import { alCambiar } from "../lib/publicar";

export const Medios: CollectionConfig = {
  slug: "medios",
  labels: { singular: "Foto", plural: "Fotos" },
  access: { read: () => true },
  admin: { useAsTitle: "alt", group: "Contenido" },
  hooks: { afterChange: [alCambiar], afterDelete: [alCambiar] },
  upload: {
    staticDir: directorioDeMedios,
    mimeTypes: ["image/*"],
    focalPoint: true,
    // El sitio optimiza cada foto al compilar; acá solo hace falta la
    // miniatura para las listas del panel.
    imageSizes: [{ name: "miniatura", width: 400, height: 400, fit: "cover" }],
    adminThumbnail: "miniatura",
  },
  fields: [
    {
      name: "alt",
      label: "Descripción de la foto",
      type: "text",
      admin: { description: "Qué se ve en la foto, para quien no la puede ver. Ej: Frasco de castañas de Pará." },
    },
  ],
};
