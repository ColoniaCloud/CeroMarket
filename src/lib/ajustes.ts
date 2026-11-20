import { z } from "astro/zod";
import { pedirAlPanel } from "./payload";

// Los datos del local se editan en el panel ("Datos del local") y se validan
// otra vez acá: un número de WhatsApp mal cargado rompe el build en vez de
// romper el botón principal del sitio en producción.
const Ajustes = z.object({
  whatsapp: z.string().regex(/^\d{8,15}$/, "WhatsApp en formato internacional, solo dígitos"),
  email: z.email(),
  instagram: z.url(),
  facebook: z.url(),
  direccion: z.string().min(1),
  mapa: z.url(),
  horario: z.string().min(1),
  envios: z.string().min(1),
});

export const ajustes = Ajustes.parse(await pedirAlPanel("/api/globals/ajustes?depth=0"));

export const enlaceWhatsapp = (mensaje?: string): string => {
  const base = `https://wa.me/${ajustes.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
};
