// Reseñas de Google Maps, por la API oficial de Google (Places API, versión
// nueva). Hace falta una clave de Google Cloud con esa API habilitada, en la
// variable GOOGLE_PLACES_API_KEY del servidor. Solo se usa desde el panel
// (botón «Sincronizar con Google»): la clave nunca llega al navegador ni al
// sitio público.
//
// Google entrega como máximo las 5 reseñas más relevantes, con el puntaje y
// el total del local. Las que ya estaban se actualizan y las nuevas se
// agregan; nunca se borra nada, y lo que se ocultó a mano sigue oculto.
import type { Payload } from "payload";
import { programarPublicacion, SIN_PUBLICAR } from "./publicar";

const API = "https://places.googleapis.com/v1";

export class ErrorDeGoogle extends Error {}

type ResenaDeGoogle = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  googleMapsUri?: string;
  authorAttribution?: { displayName?: string; uri?: string };
};

export type LugarDeGoogle = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  reviews?: ResenaDeGoogle[];
};

export type ResenaParaGuardar = {
  idGoogle: string;
  autor: string;
  estrellas: number;
  texto: string;
  cuando: string | null;
  enlace: string | null;
};

// Descarta las reseñas que no se pueden mostrar: sin texto (solo estrellas),
// sin autor o sin identificador.
export const convertirResenas = (lugar: LugarDeGoogle): ResenaParaGuardar[] =>
  (lugar.reviews ?? []).flatMap((resena) => {
    const texto = (resena.text?.text ?? resena.originalText?.text ?? "").trim();
    const autor = resena.authorAttribution?.displayName?.trim();
    if (!resena.name || !texto || !autor || !resena.rating) return [];
    return [
      {
        idGoogle: resena.name,
        autor,
        estrellas: Math.min(5, Math.max(1, Math.round(resena.rating))),
        texto,
        cuando: resena.relativePublishTimeDescription ?? null,
        enlace: resena.googleMapsUri ?? resena.authorAttribution?.uri ?? null,
      },
    ];
  });

const sinAcentos = (texto: string): string => texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

// La búsqueda por texto podría devolver otro comercio: se exige que la
// dirección de Google tenga el número de puerta del local.
export const esElLocal = (lugar: LugarDeGoogle, direccion: string): boolean => {
  const numero = /\d{2,}/.exec(direccion)?.[0];
  if (!numero || !lugar.formattedAddress) return false;
  return sinAcentos(lugar.formattedAddress).includes(numero);
};

const pedirAGoogle = async <T>(clave: string, ruta: string, campos: string, cuerpo?: unknown): Promise<T> => {
  const respuesta = await fetch(`${API}${ruta}`, {
    method: cuerpo ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": clave,
      "X-Goog-FieldMask": campos,
    },
    ...(cuerpo ? { body: JSON.stringify(cuerpo) } : {}),
  });
  if (!respuesta.ok) {
    let detalle = "";
    try {
      detalle = ((await respuesta.json()) as { error?: { message?: string } }).error?.message ?? "";
    } catch {
      /* la respuesta no era JSON */
    }
    throw new ErrorDeGoogle(`Google respondió ${respuesta.status}${detalle ? `: ${detalle}` : ""}`);
  }
  return (await respuesta.json()) as T;
};

const CAMPOS = "id,displayName,formattedAddress,rating,userRatingCount,reviews";

const buscarLugar = async (clave: string, placeId: string | null | undefined, direccion: string): Promise<LugarDeGoogle> => {
  if (placeId) return pedirAGoogle<LugarDeGoogle>(clave, `/places/${encodeURIComponent(placeId)}?languageCode=es`, CAMPOS);

  const { places } = await pedirAGoogle<{ places?: LugarDeGoogle[] }>(
    clave,
    "/places:searchText",
    CAMPOS.split(",").map((campo) => `places.${campo}`).join(","),
    { textQuery: `CERO Market ${direccion}`, languageCode: "es", maxResultCount: 1 },
  );
  const lugar = places?.[0];
  if (!lugar || !esElLocal(lugar, direccion)) {
    throw new ErrorDeGoogle("Google no encontró el local con esa dirección. Cargá el ID del lugar en «Datos del local».");
  }
  return lugar;
};

export type ResultadoDeSincronizacion = { nuevas: number; actualizadas: number; sinTexto: number; puntaje: number | null; total: number | null };

export const sincronizarResenas = async (payload: Payload): Promise<ResultadoDeSincronizacion> => {
  const clave = process.env.GOOGLE_PLACES_API_KEY;
  if (!clave) {
    throw new ErrorDeGoogle("Falta GOOGLE_PLACES_API_KEY en el servidor. Mientras tanto se pueden cargar las reseñas a mano.");
  }

  const ajustes = await payload.findGlobal({ slug: "ajustes", depth: 0 });
  const lugar = await buscarLugar(clave, ajustes.googlePlaceId, ajustes.direccion);
  const resenas = convertirResenas(lugar);
  const contexto = { [SIN_PUBLICAR]: true };

  let nuevas = 0;
  let actualizadas = 0;
  for (const resena of resenas) {
    const existente = await payload.find({
      collection: "resenas",
      where: { idGoogle: { equals: resena.idGoogle } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    const datos = { autor: resena.autor, estrellas: resena.estrellas, texto: resena.texto, cuando: resena.cuando, enlace: resena.enlace };
    const actual = existente.docs[0];
    if (actual) {
      await payload.update({ collection: "resenas", id: actual.id, data: datos, context: contexto, overrideAccess: true });
      actualizadas++;
    } else {
      await payload.create({
        collection: "resenas",
        data: { ...datos, idGoogle: resena.idGoogle, origen: "google", publicada: true },
        context: contexto,
        overrideAccess: true,
      });
      nuevas++;
    }
  }

  await payload.updateGlobal({
    slug: "ajustes",
    data: {
      puntajeGoogle: lugar.rating ?? ajustes.puntajeGoogle ?? null,
      totalResenasGoogle: lugar.userRatingCount ?? ajustes.totalResenasGoogle ?? null,
      googlePlaceId: lugar.id ?? ajustes.googlePlaceId ?? null,
    },
    context: contexto,
    overrideAccess: true,
  });

  programarPublicacion();
  return {
    nuevas,
    actualizadas,
    sinTexto: (lugar.reviews?.length ?? 0) - resenas.length,
    puntaje: lugar.rating ?? null,
    total: lugar.userRatingCount ?? null,
  };
};
