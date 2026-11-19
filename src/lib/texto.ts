// Texto en minúsculas y sin tildes para el buscador del catálogo. Corre en
// el build y en el navegador, por eso vive aparte (sin astro:content).
export const normalizar = (texto: string): string =>
  texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
