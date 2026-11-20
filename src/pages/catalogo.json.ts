import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import type { ProductoDelCatalogo } from "../lib/pedido";
import { obtenerProductos, urlDeProducto } from "../lib/productos";

// Datos mínimos de cada producto para la página /pedido: el pedido guardado
// en el navegador tiene solo ids y cantidades, y se completa con esto. Como
// se regenera en cada build, un cambio de precio llega solo al pedido.
export const GET: APIRoute = async () => {
  const productos = await obtenerProductos();
  const catalogo: ProductoDelCatalogo[] = await Promise.all(
    productos.map(async (producto) => {
      const { nombre, marca, presentacion, precio, disponible, imagen, venta, unidad } = producto.data;
      const miniatura = imagen
        ? await getImage({ src: imagen.src, width: 144, height: 144, fit: "cover", format: "webp" })
        : null;
      return {
        id: producto.id,
        nombre,
        marca,
        presentacion,
        precio,
        disponible,
        venta,
        unidad,
        url: urlDeProducto(producto),
        imagen: miniatura?.src ?? null,
      };
    }),
  );
  return new Response(JSON.stringify(catalogo), { headers: { "Content-Type": "application/json" } });
};
