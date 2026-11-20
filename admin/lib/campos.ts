import type { Field } from "payload";
import { aSlug } from "./slug";

// La dirección de cada producto, categoría o nota en el sitio. Se arma sola
// desde el nombre; se puede editar, pero no conviene en algo ya publicado.
export const campoSlug = (desde: string): Field => ({
  name: "slug",
  label: "Dirección (URL)",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "Se completa sola. No la cambies en algo ya publicado: rompe los enlaces que haya circulando.",
  },
  hooks: {
    beforeValidate: [({ value, data }) => value || (data?.[desde] ? aSlug(String(data[desde])) : value)],
  },
});
