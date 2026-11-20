// Helpers de texto que corren en el build y en el navegador, por eso viven
// aparte (sin astro:content).

// Minúsculas y sin tildes, para el buscador del catálogo.
export const normalizar = (texto: string): string =>
  texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

const pesos = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "UYU",
  maximumFractionDigits: 0,
});

export const formatearPrecio = (valor: number): string => pesos.format(valor);

// "Prana, 190 g": lo que va entre paréntesis después del nombre.
export const detalleDeProducto = (marca: string, presentacion: string): string =>
  [marca, presentacion].filter(Boolean).join(", ");
