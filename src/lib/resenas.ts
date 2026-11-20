import { z } from "astro/zod";
import { pedirAlPanelSiExiste, type ListaDelPanel } from "./payload";

// Reseñas de Google Maps que se muestran antes del pie de todas las páginas.
// Se cargan en el panel ("Reseñas"), a mano o con «Sincronizar con Google».
// Sin sesión el panel solo entrega las marcadas como publicadas.
const Resena = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  autor: z.string().min(1),
  estrellas: z.number().int().min(1).max(5),
  texto: z.string().min(1),
  cuando: z.string().nullish(),
  enlace: z.url().nullish(),
});

export type Resena = z.infer<typeof Resena>;

const MAXIMO = 6;

const cargar = async (): Promise<Resena[]> => {
  const lista = await pedirAlPanelSiExiste<ListaDelPanel<unknown>>(`/api/resenas?limit=${MAXIMO}&sort=-createdAt&depth=0`);
  return z.array(Resena).parse(lista?.docs ?? []);
};

// Se pide una sola vez por build, no una por página.
const resenas = await cargar();

export const obtenerResenas = (): Resena[] => resenas;
