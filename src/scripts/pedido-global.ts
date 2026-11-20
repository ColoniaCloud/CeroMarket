// Corre en todas las páginas: el contador del pedido en la cabecera, los
// botones "Agregar" (tarjetas y ficha), el selector de cantidad de los
// productos a granel y el aviso que confirma lo agregado. Sin JavaScript todo
// esto queda oculto y el sitio sigue funcionando con la consulta por WhatsApp
// de cada producto.
import {
  agregarAlPedido,
  CANTIDAD_MAXIMA,
  contarProductos,
  escucharCambios,
} from "../lib/pedido";
import {
  formatearCantidad,
  MAXIMO_GRANEL,
  normalizarGranel,
  PASO_GRANEL,
  precioDeGranel,
  type Unidad,
} from "../lib/granel";
import { formatearPrecio } from "../lib/texto";

const actualizarContador = () => {
  const total = contarProductos();
  for (const contador of document.querySelectorAll<HTMLElement>("[data-pedido-cantidad]")) {
    contador.textContent = String(total);
    contador.hidden = total === 0;
  }
  for (const enlace of document.querySelectorAll<HTMLElement>("[data-pedido-enlace]")) {
    enlace.setAttribute("aria-label", total === 0 ? "Pedido, vacío" : `Pedido, ${total} ${total === 1 ? "producto" : "productos"}`);
  }
};

let ocultarAviso: number | undefined;
const avisar = (texto: string) => {
  const aviso = document.querySelector<HTMLElement>("[data-aviso]");
  const mensaje = document.querySelector<HTMLElement>("[data-aviso-texto]");
  if (!aviso || !mensaje) return;
  mensaje.textContent = texto;
  aviso.dataset.visible = "true";
  clearTimeout(ocultarAviso);
  ocultarAviso = window.setTimeout(() => delete aviso.dataset.visible, 4000);
};

const confirmarEnElBoton = (boton: HTMLElement) => {
  const etiqueta = boton.querySelector<HTMLElement>("[data-agregar-texto]");
  if (!etiqueta) return;
  const original = etiqueta.dataset.original ?? etiqueta.textContent ?? "";
  etiqueta.dataset.original = original;
  etiqueta.textContent = "Agregado";
  window.setTimeout(() => (etiqueta.textContent = original), 1600);
};

const campoDe = (elemento: HTMLElement, selector: string) =>
  elemento.closest("[data-agregar-caja], [data-granel-ficha]")?.querySelector<HTMLInputElement>(selector) ?? null;

// ----- Productos a granel en la ficha: cantidad libre y precio en vivo -----
const iniciarFichaGranel = (ficha: HTMLElement) => {
  const campo = ficha.querySelector<HTMLInputElement>("[data-granel-cantidad]");
  const precioFinal = ficha.querySelector<HTMLElement>("[data-granel-precio]");
  if (!campo || !precioFinal) return;
  const unidad: Unidad = ficha.dataset.unidad === "litro" ? "litro" : "kilo";
  const porUnidad = ficha.dataset.precio ? Number(ficha.dataset.precio) : null;

  const cantidadActual = () => normalizarGranel(Number(campo.value));
  const mostrar = () => {
    const cantidad = cantidadActual();
    const resumen = formatearCantidad(cantidad, unidad);
    precioFinal.textContent = porUnidad == null ? resumen : `${resumen} · ${formatearPrecio(precioDeGranel(porUnidad, cantidad))}`;
    for (const opcion of ficha.querySelectorAll<HTMLButtonElement>("[data-granel-opcion]")) {
      opcion.setAttribute("aria-pressed", String(Number(opcion.dataset.granelOpcion) === cantidad));
    }
  };
  ficha.addEventListener("click", (evento) => {
    const objetivo = (evento.target as HTMLElement).closest<HTMLElement>("[data-granel-opcion], [data-granel-mas], [data-granel-menos]");
    if (!objetivo) return;
    const delta = objetivo.hasAttribute("data-granel-mas") ? PASO_GRANEL : objetivo.hasAttribute("data-granel-menos") ? -PASO_GRANEL : 0;
    campo.value = String(delta !== 0 ? normalizarGranel(cantidadActual() + delta) : Number(objetivo.dataset.granelOpcion));
    mostrar();
  });
  // Al salir del campo, lo que se escribió se corrige a un múltiplo de 50.
  campo.addEventListener("input", () => {
    if (campo.value !== "") mostrar();
  });
  campo.addEventListener("change", () => {
    campo.value = String(cantidadActual());
    mostrar();
  });
  mostrar();
};

document.addEventListener("click", (evento) => {
  const objetivo = evento.target as HTMLElement;

  // Tarjeta de producto a granel: abre o cierra las cantidades rápidas.
  const abrir = objetivo.closest<HTMLButtonElement>("[data-granel-abrir]");
  if (abrir) {
    const abierto = abrir.getAttribute("aria-expanded") === "true";
    abrir.setAttribute("aria-expanded", String(!abierto));
    const opciones = abrir.parentElement?.querySelector<HTMLElement>("[data-granel-opciones]");
    if (opciones) opciones.hidden = abierto;
    return;
  }

  // Selector de unidades de la ficha de un producto empaquetado.
  const paso = objetivo.closest<HTMLButtonElement>("[data-sumar], [data-restar]");
  if (paso) {
    const campo = campoDe(paso, "[data-cantidad]");
    if (campo) {
      const delta = paso.hasAttribute("data-sumar") ? 1 : -1;
      campo.value = String(Math.min(CANTIDAD_MAXIMA, Math.max(1, (Number(campo.value) || 1) + delta)));
    }
    return;
  }

  const boton = objetivo.closest<HTMLButtonElement>("[data-agregar]");
  if (!boton?.dataset.agregar) return;
  const nombre = boton.dataset.nombre ?? "el producto";

  // A granel: la cantidad viene fija en el botón (tarjeta) o del campo (ficha).
  if (boton.hasAttribute("data-granel")) {
    const unidad: Unidad = boton.dataset.unidad === "litro" ? "litro" : "kilo";
    const fija = Number(boton.dataset.cantidadFija);
    const cantidad = fija > 0 ? normalizarGranel(fija) : normalizarGranel(Number(campoDe(boton, "[data-granel-cantidad]")?.value));
    agregarAlPedido(boton.dataset.agregar, cantidad, MAXIMO_GRANEL);
    avisar(`Agregaste ${formatearCantidad(cantidad, unidad)} de ${nombre}`);
    confirmarEnElBoton(boton);
    // Las cantidades rápidas de la tarjeta se cierran al elegir una.
    const abrirTarjeta = boton.closest("[data-granel-caja]")?.querySelector<HTMLButtonElement>("[data-granel-abrir]");
    if (abrirTarjeta) abrirTarjeta.click();
    return;
  }

  const campo = campoDe(boton, "[data-cantidad]");
  const valor = Number(campo?.value ?? 1);
  const cantidad = Number.isFinite(valor) ? Math.min(CANTIDAD_MAXIMA, Math.max(1, Math.round(valor))) : 1;
  agregarAlPedido(boton.dataset.agregar, cantidad);
  // Vuelve a 1 para que un segundo clic no sume de más sin querer.
  if (campo) campo.value = "1";
  avisar(cantidad > 1 ? `Agregaste ${cantidad} × ${nombre}` : `Agregaste ${nombre}`);
  confirmarEnElBoton(boton);
});

for (const elemento of document.querySelectorAll<HTMLElement>("[data-agregar], [data-agregar-caja], [data-granel-caja], [data-granel-ficha]")) {
  elemento.hidden = false;
}
for (const ficha of document.querySelectorAll<HTMLElement>("[data-granel-ficha]")) iniciarFichaGranel(ficha);
actualizarContador();
escucharCambios(actualizarContador);
