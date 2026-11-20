// "Castañas de Pará orgánicas 190 g" -> "castanas-de-para-organicas-190-g".
export const aSlug = (texto: string): string =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
