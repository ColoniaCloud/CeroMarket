// Productos a granel: el cliente elige cuánto quiere y el sitio calcula el
// precio. El precio del producto es por kilo (o por litro) y la cantidad se
// guarda en gramos (o ml). Corre en el build y en el navegador.
export type Venta = "empaquetado" | "granel";
export type Unidad = "kilo" | "litro";

export const PASO_GRANEL = 50;
export const MINIMO_GRANEL = 50;
export const MAXIMO_GRANEL = 20_000;
export const OPCIONES_RAPIDAS = [100, 250, 500, 1000] as const;

export const medidaDe = (unidad: Unidad): "g" | "ml" => (unidad === "litro" ? "ml" : "g");

// Un múltiplo de 50 entre el mínimo y el máximo.
export const normalizarGranel = (cantidad: number): number => {
  if (!Number.isFinite(cantidad)) return MINIMO_GRANEL;
  const redondeada = Math.round(cantidad / PASO_GRANEL) * PASO_GRANEL;
  return Math.min(MAXIMO_GRANEL, Math.max(MINIMO_GRANEL, redondeada));
};

// precioPorUnidad es el precio de 1 kilo (o 1 litro); cantidad va en g (o ml).
export const precioDeGranel = (precioPorUnidad: number, cantidad: number): number =>
  Math.round((precioPorUnidad * cantidad) / 1000);

const decimal = new Intl.NumberFormat("es-UY", { maximumFractionDigits: 2 });

// 250 → "250 g"; 1000 → "1 kg"; 1500 → "1,5 kg". En litros: "250 ml", "1 l".
export const formatearCantidad = (cantidad: number, unidad: Unidad): string => {
  if (cantidad < 1000) return `${decimal.format(cantidad)} ${medidaDe(unidad)}`;
  return `${decimal.format(cantidad / 1000)} ${unidad === "litro" ? "l" : "kg"}`;
};

export const nombreDeUnidad = (unidad: Unidad): string => (unidad === "litro" ? "litro" : "kilo");
