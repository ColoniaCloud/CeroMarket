import { randomBytes } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

// La base SQLite y las fotos viven en disco, así que la carpeta tiene que
// sobrevivir a los deploys. Hostinger reemplaza la carpeta de la app en cada
// push: si PAYLOAD_DATA_DIR queda relativo (o sin definir), la base queda
// adentro de esa copia y el deploy siguiente borra productos y fotos sin
// avisar. Mismo esquema que colonia.cloud.
export const directorioDeDatos = path.resolve(process.env.PAYLOAD_DATA_DIR || path.join(process.cwd(), "data"));
export const directorioDeMedios = path.join(directorioDeDatos, "medios");

mkdirSync(directorioDeMedios, { recursive: true });

if (process.env.NODE_ENV === "production") {
  // hPanel enmascara el valor de la variable: el log es la forma de verla.
  console.log(`[datos] PAYLOAD_DATA_DIR -> ${directorioDeDatos}`);
  const relativo = path.relative(process.cwd(), directorioDeDatos);
  if (!relativo.startsWith("..") && !path.isAbsolute(relativo)) {
    console.warn(
      "[datos] La carpeta de datos está dentro de la app: el próximo deploy borra la base y las fotos. " +
        "Configurá PAYLOAD_DATA_DIR con una ruta absoluta fuera de la app.",
    );
  }
}

// La clave que firma las sesiones del panel. Si no viene en PAYLOAD_SECRET,
// se genera la primera vez y queda guardada en la carpeta de datos (que es
// persistente): así nadie tiene que manejarla ni copiarla a ningún lado. Si
// esa carpeta se pierde, se genera otra y solo hay que volver a iniciar sesión.
const archivoDeSecreto = path.join(directorioDeDatos, ".secreto");

const leerOCrearSecreto = (): string => {
  try {
    writeFileSync(archivoDeSecreto, randomBytes(48).toString("base64url"), { flag: "wx", mode: 0o600 });
  } catch {
    // Ya existía (o lo creó otro proceso del build al mismo tiempo).
  }
  return readFileSync(archivoDeSecreto, "utf8").trim();
};

export const secretoDelPanel = process.env.PAYLOAD_SECRET || leerOCrearSecreto();
