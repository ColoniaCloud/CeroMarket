// Lo que la persona decide en la pantalla de revisión antes de aplicar la
// lista. Es solo tipos: lo comparten el servidor y el componente del panel.
import type { Unidad, Venta } from "./reglas";

export type CambioDeNuevo = { nombre?: string; categoria?: string; venta?: Venta; unidad?: Unidad };

export type Decisiones = {
  // id de producto de la web -> código del CRM con el que se vincula (null = ninguno).
  vinculos: Record<string, string | null>;
  // Cambios de precio que NO se aplican (ids de producto).
  noActualizarPrecios: number[];
  // Código con precios distintos -> precio elegido (null = no aplicar).
  conflictos: Record<string, number | null>;
  // Códigos nuevos que no se crean (y no vuelven a aparecer en próximas listas).
  noCrear: string[];
  // Ajustes a lo que proponen las reglas para un producto nuevo.
  cambios: Record<string, CambioDeNuevo>;
  // Productos (ids) que se marcan como no disponibles porque ya no están en la lista.
  noDisponibles: number[];
};

export type ResultadoDeAplicar = {
  vinculados: number;
  preciosActualizados: number;
  creados: number;
  categoriasCreadas: number;
  noDisponibles: number;
  ignorados: number;
  errores: string[];
};

export const decisionesVacias = (): Decisiones => ({
  vinculos: {},
  noActualizarPrecios: [],
  conflictos: {},
  noCrear: [],
  cambios: {},
  noDisponibles: [],
});

const esObjeto = (valor: unknown): valor is Record<string, unknown> =>
  typeof valor === "object" && valor !== null && !Array.isArray(valor);

const lista = <T>(valor: unknown, esValido: (elemento: unknown) => elemento is T): T[] =>
  Array.isArray(valor) ? valor.filter(esValido) : [];

const esNumero = (valor: unknown): valor is number => typeof valor === "number" && Number.isFinite(valor);
const esTexto = (valor: unknown): valor is string => typeof valor === "string";

// Lo que llega del navegador se trata como no confiable: se queda solo con lo
// que tiene la forma esperada.
export const normalizarDecisiones = (crudo: unknown): Decisiones => {
  const base = decisionesVacias();
  if (!esObjeto(crudo)) return base;

  if (esObjeto(crudo.vinculos)) {
    for (const [id, codigo] of Object.entries(crudo.vinculos)) {
      if (/^\d+$/.test(id) && (codigo === null || esTexto(codigo))) base.vinculos[id] = codigo;
    }
  }
  if (esObjeto(crudo.conflictos)) {
    for (const [codigo, precio] of Object.entries(crudo.conflictos)) {
      if (precio === null || esNumero(precio)) base.conflictos[codigo] = precio;
    }
  }
  base.noActualizarPrecios = lista(crudo.noActualizarPrecios, esNumero);
  base.noDisponibles = lista(crudo.noDisponibles, esNumero);
  base.noCrear = lista(crudo.noCrear, esTexto);
  if (esObjeto(crudo.cambios)) {
    for (const [codigo, cambio] of Object.entries(crudo.cambios)) {
      if (!esObjeto(cambio)) continue;
      const limpio: CambioDeNuevo = {};
      if (esTexto(cambio.nombre)) limpio.nombre = cambio.nombre.slice(0, 200);
      if (esTexto(cambio.categoria)) limpio.categoria = cambio.categoria.slice(0, 80);
      if (cambio.venta === "granel" || cambio.venta === "empaquetado") limpio.venta = cambio.venta;
      if (cambio.unidad === "kilo" || cambio.unidad === "litro") limpio.unidad = cambio.unidad;
      base.cambios[codigo] = limpio;
    }
  }
  return base;
};
