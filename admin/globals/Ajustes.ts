import type { GlobalConfig } from "payload";
import { alCambiar } from "../lib/publicar";

const url = (valor: unknown) =>
  !valor || /^https?:\/\/\S+$/.test(String(valor)) || "Tiene que ser una dirección completa (https://...).";

export const Ajustes: GlobalConfig = {
  slug: "ajustes",
  label: "Datos del local",
  access: { read: () => true },
  admin: { group: "Administración" },
  hooks: { afterChange: [alCambiar] },
  fields: [
    {
      name: "whatsapp",
      label: "WhatsApp",
      type: "text",
      required: true,
      admin: { description: "Formato internacional, solo dígitos. Ej: 59896238315. A este número llegan los pedidos." },
      validate: (valor: unknown) => /^\d{8,15}$/.test(String(valor ?? "")) || "Solo dígitos, con el 598 adelante.",
    },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "direccion", label: "Dirección", type: "text", required: true },
    { name: "horario", label: "Horario", type: "text", required: true },
    { name: "mapa", label: "Enlace a Google Maps", type: "text", required: true, validate: url },
    { name: "instagram", label: "Instagram", type: "text", required: true, validate: url },
    { name: "facebook", label: "Facebook", type: "text", required: true, validate: url },
    { name: "envios", label: "Texto de envíos", type: "textarea", required: true },
    {
      type: "collapsible",
      label: "Google Maps y reseñas",
      fields: [
        {
          name: "mapaIncrustado",
          label: "Mapa para el pie del sitio",
          type: "text",
          validate: url,
          admin: {
            description:
              "En Google Maps: Compartir → Incorporar un mapa → copiá solo la dirección que está dentro de src=\"…\". Vacío: se busca el local por su dirección.",
          },
        },
        {
          type: "row",
          fields: [
            {
              name: "puntajeGoogle",
              label: "Puntaje en Google",
              type: "number",
              min: 1,
              max: 5,
              admin: { width: "50%", step: 0.1, description: "Ej: 4.8. «Sincronizar con Google» (en Reseñas) lo actualiza." },
            },
            {
              name: "totalResenasGoogle",
              label: "Cantidad de reseñas",
              type: "number",
              min: 0,
              admin: { width: "50%", step: 1 },
              validate: (valor: unknown) => valor == null || Number.isInteger(valor) || "Un número entero.",
            },
          ],
        },
        {
          name: "googlePlaceId",
          label: "ID del lugar en Google",
          type: "text",
          admin: { description: "Lo completa «Sincronizar con Google». Sirve para el botón «Dejar una reseña»." },
        },
      ],
    },
  ],
};
