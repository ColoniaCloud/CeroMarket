// Cliente mínimo de la API del panel (Payload, admin.ceromarket.com.uy).
// Solo se usa al compilar: el sitio publicado sigue siendo estático. Si el
// panel no responde, el build falla y queda publicada la versión anterior.

export const URL_DEL_PANEL = (import.meta.env.PAYLOAD_URL ?? "https://admin.ceromarket.com.uy").replace(/\/$/, "");

export const pedirAlPanel = async <T>(ruta: string): Promise<T> => {
  const direccion = `${URL_DEL_PANEL}${ruta}`;
  let respuesta: Response;
  try {
    respuesta = await fetch(direccion);
  } catch (error) {
    throw new Error(`No se pudo conectar con el panel (${direccion}).`, { cause: error });
  }
  if (!respuesta.ok) throw new Error(`El panel respondió ${respuesta.status} en ${direccion}.`);
  return (await respuesta.json()) as T;
};

// Para lo que un panel todavía sin actualizar puede no tener (por ejemplo la
// colección de reseñas, mientras Hostinger termina de publicar el panel nuevo):
// un 404 es "no hay" y no rompe el build. Cualquier otro error sí.
export const pedirAlPanelSiExiste = async <T>(ruta: string): Promise<T | null> => {
  try {
    return await pedirAlPanel<T>(ruta);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("El panel respondió 404")) return null;
    throw error;
  }
};

export type ListaDelPanel<T> = { docs: T[]; totalDocs: number };

// Una foto tal como la devuelve el panel (colección "medios").
export type MedioDelPanel = { url?: string | null; width?: number | null; height?: number | null; alt?: string | null };

// Una foto lista para <Image>: URL absoluta y medidas originales.
export type Foto = { src: string; width: number; height: number; alt: string };

export const aFoto = (medio: MedioDelPanel | number | null | undefined): Foto | null => {
  if (!medio || typeof medio !== "object" || !medio.url || !medio.width || !medio.height) return null;
  return { src: `${URL_DEL_PANEL}${medio.url}`, width: medio.width, height: medio.height, alt: medio.alt ?? "" };
};
