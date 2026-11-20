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
  // Opcionales: un panel que todavía no los tiene (o los dejó vacíos) no rompe el sitio.
  mapaIncrustado: z.url().nullish(),
  googlePlaceId: z.string().nullish(),
  puntajeGoogle: z.number().min(1).max(5).nullish(),
  totalResenasGoogle: z.number().int().min(0).nullish(),
});

export const ajustes = Ajustes.parse(await pedirAlPanel("/api/globals/ajustes?depth=0"));

// Mapa de Google para incrustar. Sin enlace propio, se busca el local por su dirección.
export const mapaParaIncrustar: string =
  ajustes.mapaIncrustado ??
  `https://www.google.com/maps?q=${encodeURIComponent(`CERO Market ${ajustes.direccion}`)}&output=embed&hl=es`;

// Para dejar una reseña hace falta el ID del lugar; sin él, se abre la ficha del local.
export const enlaceParaResenar: string = ajustes.googlePlaceId
  ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(ajustes.googlePlaceId)}`
  : ajustes.mapa;

export const enlaceWhatsapp = (mensaje?: string): string => {
  const base = `https://wa.me/${ajustes.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
};
