import { getCollection, type CollectionEntry } from "astro:content";
import { nombreDeCategoria } from "./categorias";
import { detalleDeProducto, formatearPrecio, normalizar } from "./texto";

export type Producto = CollectionEntry<"productos">;

export const obtenerProductos = async (): Promise<Producto[]> => {
  const productos = await getCollection("productos");
  return productos.sort((a, b) => a.data.nombre.localeCompare(b.data.nombre, "es"));
};

export const urlDeProducto = (producto: Producto): string => `/producto/${producto.id}/`;

// Mismo nombre en la tarjeta y en la ficha: el navegador anima la foto de
// una página a la otra (View Transitions entre documentos).
export const transicionDeFoto = (producto: Producto): string => `view-transition-name: foto-${producto.id}`;

// Lo que va escrito en la etiqueta pizarra. Los precios se perdieron con la
// base vieja: si no hay precio ni presentación, no se muestra etiqueta.
export const textoDeEtiqueta = (producto: Producto): string => {
  const { presentacion, precio: valor } = producto.data;
  const partes = [presentacion, valor == null ? "" : formatearPrecio(valor)].filter(Boolean);
  return partes.join(" · ");
};

export const mensajeDeConsulta = (producto: Producto): string => {
  const { nombre, marca, presentacion } = producto.data;
  const detalle = detalleDeProducto(marca, presentacion);
  return `Hola, quiero consultar por ${nombre}${detalle ? ` (${detalle})` : ""}.`;
};

export const textoBuscable = (producto: Producto): string => {
  const { nombre, marca, presentacion } = producto.data;
  return normalizar([nombre, marca, presentacion].join(" "));
};

export const textoDeCategoria = (producto: Producto): string => normalizar(nombreDeCategoria(producto.data.categoria));
