// Cada cambio en el panel le pide a GitHub que vuelva a compilar y publicar
// ceromarket.com.uy: dispara a mano el workflow "Publicar" (workflow_dispatch).
// Alcanza con un token fine-grained con permiso "Actions: Read and write" solo
// sobre el repo; no hace falta permiso sobre el código. Los cambios seguidos
// se juntan: se avisa una sola vez, 20 s después del último.
const REPOSITORIO = "ColoniaCloud/CeroMarket";
const ESPERA_MS = 20_000;

let pendiente: ReturnType<typeof setTimeout> | undefined;

const avisarAGitHub = async () => {
  const token = process.env.GITHUB_TOKEN_PUBLICAR;
  if (!token) {
    console.warn("[publicar] Falta GITHUB_TOKEN_PUBLICAR: el sitio no se republica solo.");
    return;
  }
  try {
    const respuesta = await fetch(`https://api.github.com/repos/${REPOSITORIO}/actions/workflows/publicar.yml/dispatches`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "ceromarket-admin",
      },
      body: JSON.stringify({ ref: "main" }),
    });
    if (!respuesta.ok) console.error(`[publicar] GitHub respondió ${respuesta.status}: ${await respuesta.text()}`);
    else console.log("[publicar] Pedido de publicación enviado a GitHub.");
  } catch (error) {
    console.error("[publicar] No se pudo avisar a GitHub:", error);
  }
};

export const programarPublicacion = () => {
  clearTimeout(pendiente);
  pendiente = setTimeout(() => void avisarAGitHub(), ESPERA_MS);
};

// La migración que carga el contenido inicial pasa este contexto para no
// disparar 200 publicaciones.
export const SIN_PUBLICAR = "sinPublicar";

type ConContexto = { req: { context: Record<string, unknown> } };

export const alCambiar = <T>({ req, doc }: ConContexto & { doc: T }): T => {
  if (!req.context[SIN_PUBLICAR]) programarPublicacion();
  return doc;
};
