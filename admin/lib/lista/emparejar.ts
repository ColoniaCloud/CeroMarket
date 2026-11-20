// Sugiere a qué fila de la lista de precios corresponde cada producto de la
// web que todavía no tiene código del CRM. Solo sugiere: la primera vez lo
// confirma una persona, y desde ahí el producto queda atado a su código.
import { claveDe } from "./reglas";
import type { FilaLista } from "./tipos";

export type ProductoParaEmparejar = { id: number; nombre: string; marca: string; presentacion: string };
export type Candidato = { codigo: string; puntaje: number };
export type Confianza = "segura" | "revisar" | "sin-par";
export type Sugerencia = { productoId: number; confianza: Confianza; candidatos: Candidato[] };

const SIN_VALOR = new Set(["de", "del", "la", "el", "en", "y", "con", "para", "a", "al", "x", "s", "c"]);
const CANDIDATOS_POR_PRODUCTO = 5;
const UMBRAL_SEGURA = 0.8;
const UMBRAL_REVISAR = 0.5;
const VENTAJA_MINIMA = 0.08;

// "250 g", "250gr" y "250G" son lo mismo.
const normalizar = (texto: string): string =>
  claveDe(texto)
    .replace(/(\d+)\s*(gr|grs|g)\b/g, "$1g")
    .replace(/(\d+)\s*(lt|lts|l)\b/g, "$1l")
    .replace(/(\d+)\s*(ml|cc)\b/g, "$1ml")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const palabrasDe = (texto: string): Set<string> =>
  new Set(normalizar(texto).split(" ").filter((palabra) => palabra && !SIN_VALOR.has(palabra)));

const bigramas = (texto: string): Map<string, number> => {
  const compacto = normalizar(texto).replace(/ /g, "");
  const cuenta = new Map<string, number>();
  for (let i = 0; i < compacto.length - 1; i += 1) {
    const par = compacto.slice(i, i + 2);
    cuenta.set(par, (cuenta.get(par) ?? 0) + 1);
  }
  return cuenta;
};

// Coeficiente de Dice sobre pares de letras: tolera "Campo Claro" vs
// "CAMPOCLARO" y pequeñas diferencias de escritura.
const dice = (a: Map<string, number>, b: Map<string, number>): number => {
  let comunes = 0;
  let total = 0;
  for (const n of a.values()) total += n;
  for (const n of b.values()) total += n;
  for (const [par, n] of a) comunes += Math.min(n, b.get(par) ?? 0);
  return total === 0 ? 0 : (2 * comunes) / total;
};

// "nucleo" son las palabras del nombre (sin marca ni presentación): si una de
// ellas no está en la fila, es otro producto aunque la marca coincida ("Aceite
// de lino" no es "ACEITE DE RICINO" de la misma marca).
type Preparada = { palabras: Set<string>; pares: Map<string, number>; nucleo: Set<string> };
const preparar = (texto: string, nombre = ""): Preparada => ({
  palabras: palabrasDe(texto),
  pares: bigramas(texto),
  nucleo: palabrasDe(nombre),
});

// Dos palabras valen lo mismo si son iguales o comparten el comienzo
// ("organico" / "organica", "almendra" / "almendras").
const mismaPalabra = (a: string, b: string): boolean => a === b || (a.length >= 5 && b.length >= 5 && a.slice(0, 5) === b.slice(0, 5));
const PENALIZACION_POR_FALTANTE = 0.3;

const puntaje = (a: Preparada, b: Preparada): number => {
  if (a.palabras.size === 0 || b.palabras.size === 0) return 0;
  let comunes = 0;
  for (const palabra of a.palabras) if (b.palabras.has(palabra)) comunes += 1;
  const porPalabras = (comunes / a.palabras.size) * 0.6 + (comunes / b.palabras.size) * 0.4;
  const base = porPalabras * 0.7 + dice(a.pares, b.pares) * 0.3;
  if (a.nucleo.size === 0) return base;
  let faltan = 0;
  for (const palabra of a.nucleo) if (![...b.palabras].some((otra) => mismaPalabra(palabra, otra))) faltan += 1;
  return base * (1 - (PENALIZACION_POR_FALTANTE * faltan) / a.nucleo.size);
};

export const emparejar = (productos: ProductoParaEmparejar[], filas: FilaLista[]): Sugerencia[] => {
  const deFilas = filas.map((fila) => ({ codigo: fila.codigo, datos: preparar(`${fila.articulo} ${fila.marca}`) }));

  const todas = productos.map((producto) => {
    const datos = preparar(`${producto.nombre} ${producto.marca} ${producto.presentacion}`, producto.nombre);
    const candidatos = deFilas
      .map((fila) => ({ codigo: fila.codigo, puntaje: puntaje(datos, fila.datos) }))
      .sort((a, b) => b.puntaje - a.puntaje)
      .slice(0, CANDIDATOS_POR_PRODUCTO);
    return { producto, candidatos };
  });

  // De mayor a menor puntaje: una fila solo puede ser "segura" para un producto.
  const ocupadas = new Set<string>();
  const confianzas = new Map<number, Confianza>();
  const ordenados = [...todas].sort((a, b) => (b.candidatos[0]?.puntaje ?? 0) - (a.candidatos[0]?.puntaje ?? 0));
  for (const { producto, candidatos } of ordenados) {
    const mejor = candidatos[0];
    const segundo = candidatos[1];
    if (!mejor || mejor.puntaje < UMBRAL_REVISAR) {
      confianzas.set(producto.id, "sin-par");
      continue;
    }
    const clara = mejor.puntaje >= UMBRAL_SEGURA && mejor.puntaje - (segundo?.puntaje ?? 0) >= VENTAJA_MINIMA;
    if (clara && !ocupadas.has(mejor.codigo)) {
      ocupadas.add(mejor.codigo);
      confianzas.set(producto.id, "segura");
    } else {
      confianzas.set(producto.id, "revisar");
    }
  }

  return todas.map(({ producto, candidatos }) => ({
    productoId: producto.id,
    confianza: confianzas.get(producto.id) ?? "sin-par",
    candidatos: candidatos.map((candidato) => ({ ...candidato, puntaje: Math.round(candidato.puntaje * 100) / 100 })),
  }));
};
