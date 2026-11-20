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
  ],
};
