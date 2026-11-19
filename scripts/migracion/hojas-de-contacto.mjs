// Herramienta de la migración: arma hojas de contacto numeradas con todas las
// imágenes recuperadas, para poder asignarlas a mano a cada producto (los
// archivos son GUIDs y el vínculo producto↔imagen vivía en la base borrada).
//
// Uso: node scripts/migracion/hojas-de-contacto.mjs <carpeta-de-salida>
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const salida = process.argv[2];
if (!salida) {
  console.error("Falta la carpeta de salida.");
  process.exit(1);
}
mkdirSync(salida, { recursive: true });

const MEDIA = fileURLToPath(new URL("../../recovered/media/", import.meta.url));
const CARPETAS = ["2025/08", "2023/03", "2023/05"];
const COLUMNAS = 5;
const FILAS = 4;
const LADO = 300;
const ETIQUETA = 28;
const MARGEN = 8;

const archivos = CARPETAS.flatMap((carpeta) =>
  readdirSync(join(MEDIA, carpeta))
    .sort()
    .map((nombre) => `${carpeta}/${nombre}`),
);

const indice = [];
for (const [posicion, archivo] of archivos.entries()) {
  const { width, height } = await sharp(join(MEDIA, archivo)).metadata();
  indice.push({ n: posicion + 1, archivo, ancho: width, alto: height });
}
writeFileSync(join(salida, "indice.json"), JSON.stringify(indice, null, 1));

const porHoja = COLUMNAS * FILAS;
const anchoHoja = MARGEN + COLUMNAS * (LADO + MARGEN);
const altoHoja = MARGEN + FILAS * (LADO + ETIQUETA + MARGEN);

for (let inicio = 0; inicio < indice.length; inicio += porHoja) {
  const tanda = indice.slice(inicio, inicio + porHoja);
  const capas = [];
  for (const [i, item] of tanda.entries()) {
    const x = MARGEN + (i % COLUMNAS) * (LADO + MARGEN);
    const y = MARGEN + Math.floor(i / COLUMNAS) * (LADO + ETIQUETA + MARGEN);
    const miniatura = await sharp(join(MEDIA, item.archivo))
      .rotate()
      .resize(LADO, LADO, { fit: "contain", background: "#ffffff" })
      .flatten({ background: "#ffffff" })
      .jpeg()
      .toBuffer();
    const etiqueta = `<svg width="${LADO}" height="${ETIQUETA}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#111"/><text x="8" y="20" font-family="Arial" font-size="18" font-weight="700" fill="#fff">#${item.n}</text><text x="${LADO - 8}" y="20" font-family="Arial" font-size="14" fill="#aaa" text-anchor="end">${item.ancho}×${item.alto}</text></svg>`;
    capas.push({ input: Buffer.from(etiqueta), left: x, top: y });
    capas.push({ input: miniatura, left: x, top: y + ETIQUETA });
  }
  const numero = String(inicio / porHoja + 1).padStart(2, "0");
  await sharp({ create: { width: anchoHoja, height: altoHoja, channels: 3, background: "#cfcfcf" } })
    .composite(capas)
    .jpeg({ quality: 82 })
    .toFile(join(salida, `hoja-${numero}.jpg`));
}

console.log(`${indice.length} imágenes en ${Math.ceil(indice.length / porHoja)} hojas → ${salida}`);
