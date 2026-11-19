import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { SLUGS_CATEGORIA } from "./lib/categorias";

// Estos esquemas espejan keystatic.config.ts. Si Keystatic escribe algo que
// no cumple, el build falla acá, no en producción.

const productos = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/productos" }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string().min(1),
      marca: z.string().default(""),
      presentacion: z.string().default(""),
      categoria: z.enum(SLUGS_CATEGORIA),
      descripcion: z.string().default(""),
      imagen: image().nullish(),
      galeria: z.array(image()).default([]),
      precio: z.number().nonnegative().nullish(),
      destacado: z.boolean().default(false),
      disponible: z.boolean().default(true),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string().min(1),
      tipo: z.enum(["nota", "receta"]).default("nota"),
      bajada: z.string().default(""),
      fecha: z.coerce.date().nullish(),
      portada: image().nullish(),
      borrador: z.boolean().default(true),
    }),
});

export const collections = { productos, posts };
