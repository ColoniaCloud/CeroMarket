// Página /pedido: muestra lo guardado en el navegador, deja cambiar
// cantidades y arma el mensaje de WhatsApp con el pedido y los datos de
// entrega. El mensaje sale desde el WhatsApp del cliente hacia el local.
import {
  armarMensaje,
  cambiarCantidad,
  escucharCambios,
  leerPedido,
  totalConPrecio,
  vaciarPedido,
  type Entrega,
  type LineaCompleta,
  type ProductoDelCatalogo,
} from "../lib/pedido";
import { detalleDeProducto, formatearPrecio } from "../lib/texto";

const buscar = <T extends Element>(selector: string, raiz: ParentNode = document): T => {
  const elemento = raiz.querySelector<T>(selector);
  if (!elemento) throw new Error(`Pedido: falta ${selector}`);
  return elemento;
};

const iniciarPedido = async (raiz: HTMLElement) => {
  const cargando = buscar<HTMLElement>("[data-pedido-cargando]", raiz);
  const vacio = buscar<HTMLElement>("[data-pedido-vacio]", raiz);
  const contenido = buscar<HTMLElement>("[data-pedido-contenido]", raiz);
  const lista = buscar<HTMLUListElement>("[data-pedido-lineas]", raiz);
  const total = buscar<HTMLElement>("[data-pedido-total]", raiz);
  const plantilla = buscar<HTMLTemplateElement>("[data-plantilla-linea]", raiz);
  const formulario = buscar<HTMLFormElement>("[data-pedido-form]", raiz);
  const campoDireccion = buscar<HTMLElement>("[data-campo-direccion]", raiz);
  const error = buscar<HTMLElement>("[data-pedido-error]", raiz);
  const enviado = buscar<HTMLElement>("[data-pedido-enviado]", raiz);

  let catalogo: Map<string, ProductoDelCatalogo>;
  try {
    const respuesta = await fetch("/catalogo.json");
    if (!respuesta.ok) throw new Error(String(respuesta.status));
    const productos = (await respuesta.json()) as ProductoDelCatalogo[];
    catalogo = new Map(productos.map((producto) => [producto.id, producto]));
  } catch {
    cargando.textContent = "No pudimos cargar los productos. Recargá la página para intentar de nuevo.";
    return;
  }
  cargando.hidden = true;

  // Un producto que se sacó del catálogo después de agregarlo no aparece.
  const lineasCompletas = (): LineaCompleta[] =>
    leerPedido().flatMap((linea) => {
      const producto = catalogo.get(linea.id);
      return producto ? [{ producto, cantidad: linea.cantidad }] : [];
    });

  const textoDeTotal = (lineas: LineaCompleta[]): string => {
    const conPrecio = lineas.filter(({ producto }) => producto.precio != null);
    if (conPrecio.length === 0) return "Los precios te los confirmamos por WhatsApp.";
    if (conPrecio.length === lineas.length) return `Total: ${formatearPrecio(totalConPrecio(lineas))}`;
    return `Subtotal de lo que tiene precio: ${formatearPrecio(totalConPrecio(conPrecio))}. El resto te lo confirmamos.`;
  };

  const dibujarLinea = ({ producto, cantidad }: LineaCompleta): HTMLLIElement => {
    const fragmento = plantilla.content.cloneNode(true) as DocumentFragment;
    const fila = buscar<HTMLLIElement>("li", fragmento);
    fila.dataset.id = producto.id;
    for (const enlace of fila.querySelectorAll<HTMLAnchorElement>("[data-enlace]")) enlace.href = producto.url;
    buscar<HTMLElement>("[data-nombre]", fila).textContent = producto.nombre;
    buscar<HTMLElement>("[data-detalle]", fila).textContent = [
      detalleDeProducto(producto.marca, producto.presentacion),
      producto.disponible ? "" : "Sin stock por ahora",
    ].filter(Boolean).join(" · ");
    buscar<HTMLElement>("[data-precio]", fila).textContent =
      producto.precio == null ? "Precio a confirmar" : `${formatearPrecio(producto.precio)} c/u`;
    buscar<HTMLElement>("[data-cantidad]", fila).textContent = String(cantidad);

    const foto = buscar<HTMLImageElement>("[data-foto]", fila);
    if (producto.imagen) foto.src = producto.imagen;
    else foto.remove();

    buscar<HTMLElement>("[data-menos]", fila).setAttribute("aria-label", `Uno menos de ${producto.nombre}`);
    buscar<HTMLElement>("[data-mas]", fila).setAttribute("aria-label", `Uno más de ${producto.nombre}`);
    buscar<HTMLElement>("[data-quitar]", fila).setAttribute("aria-label", `Quitar ${producto.nombre} del pedido`);
    return fila;
  };

  const dibujar = () => {
    // Al volver a dibujar la lista se pierde el foco: se devuelve al mismo
    // botón de la misma fila (o a la fila siguiente si se quitó).
    const activo = document.activeElement as HTMLElement | null;
    const filaActiva = activo?.closest<HTMLElement>("[data-pedido-lineas] li");
    const accion = ["data-menos", "data-mas", "data-quitar"].find((nombre) => activo?.hasAttribute(nombre));
    const indiceActivo = filaActiva ? [...lista.children].indexOf(filaActiva) : -1;

    const lineas = lineasCompletas();
    contenido.hidden = lineas.length === 0;
    vacio.hidden = lineas.length > 0;
    lista.replaceChildren(...lineas.map(dibujarLinea));
    total.textContent = lineas.length > 0 ? textoDeTotal(lineas) : "";

    if (filaActiva && accion) {
      const fila =
        lista.querySelector<HTMLElement>(`li[data-id="${CSS.escape(filaActiva.dataset.id ?? "")}"]`) ??
        (lista.children[Math.min(indiceActivo, lista.children.length - 1)] as HTMLElement | undefined);
      (fila?.querySelector<HTMLElement>(`[${accion}]`) ?? fila?.querySelector<HTMLElement>("button"))?.focus();
    }
  };

  lista.addEventListener("click", (evento) => {
    const boton = (evento.target as HTMLElement).closest<HTMLButtonElement>("button");
    const id = boton?.closest<HTMLElement>("li")?.dataset.id;
    if (!boton || !id) return;
    const actual = leerPedido().find((linea) => linea.id === id)?.cantidad ?? 0;
    if (boton.hasAttribute("data-mas")) cambiarCantidad(id, actual + 1);
    else if (boton.hasAttribute("data-menos")) cambiarCantidad(id, Math.max(1, actual - 1));
    else if (boton.hasAttribute("data-quitar")) cambiarCantidad(id, 0);
  });

  const modoElegido = (): Entrega["modo"] =>
    new FormData(formulario).get("modo") === "envio" ? "envio" : "retiro";

  const actualizarEntrega = () => {
    const conEnvio = modoElegido() === "envio";
    campoDireccion.hidden = !conEnvio;
    buscar<HTMLInputElement>("[name='direccion']", formulario).required = conEnvio;
  };
  formulario.addEventListener("change", actualizarEntrega);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const datos = new FormData(formulario);
    const entrega: Entrega = {
      nombre: String(datos.get("nombre") ?? "").trim(),
      modo: modoElegido(),
      direccion: String(datos.get("direccion") ?? "").trim(),
      notas: String(datos.get("notas") ?? "").trim(),
    };

    const faltante = !entrega.nombre
      ? { campo: "nombre", texto: "Escribí tu nombre para que sepamos de quién es el pedido." }
      : entrega.modo === "envio" && !entrega.direccion
        ? { campo: "direccion", texto: "Escribí la dirección de entrega." }
        : null;
    if (faltante) {
      error.textContent = faltante.texto;
      buscar<HTMLInputElement>(`[name='${faltante.campo}']`, formulario).focus();
      return;
    }
    error.textContent = "";

    const lineas = lineasCompletas();
    if (lineas.length === 0) return;
    const enlace = document.createElement("a");
    enlace.href = `https://wa.me/${raiz.dataset.whatsapp}?text=${encodeURIComponent(armarMensaje(lineas, entrega))}`;
    enlace.target = "_blank";
    enlace.rel = "noopener";
    enlace.click();
    enviado.hidden = false;
  });

  buscar<HTMLButtonElement>("[data-pedido-vaciar]", raiz).addEventListener("click", () => {
    vaciarPedido();
    enviado.hidden = true;
    buscar<HTMLElement>("[data-pedido-vacio-titulo]", raiz).textContent = "¡Gracias por tu pedido!";
    buscar<HTMLElement>("[data-pedido-vacio-texto]", raiz).textContent =
      "Te respondemos por WhatsApp para confirmar precios y la entrega.";
    vacio.focus();
  });

  actualizarEntrega();
  dibujar();
  escucharCambios(dibujar);
};

const raiz = document.querySelector<HTMLElement>("[data-pedido]");
if (raiz) void iniciarPedido(raiz);
