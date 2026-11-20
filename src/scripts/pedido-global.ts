// Corre en todas las páginas: el contador del pedido en la cabecera, los
// botones "Agregar" (tarjetas y ficha) y el aviso que confirma lo agregado.
// Sin JavaScript los botones quedan ocultos y el sitio sigue funcionando
// con la consulta por WhatsApp de cada producto.
import {
  agregarAlPedido,
  CANTIDAD_MAXIMA,
  contarUnidades,
  escucharCambios,
} from "../lib/pedido";

const actualizarContador = () => {
  const unidades = contarUnidades();
  for (const contador of document.querySelectorAll<HTMLElement>("[data-pedido-cantidad]")) {
    contador.textContent = String(unidades);
    contador.hidden = unidades === 0;
  }
  for (const enlace of document.querySelectorAll<HTMLElement>("[data-pedido-enlace]")) {
    enlace.setAttribute("aria-label", unidades === 0 ? "Pedido, vacío" : `Pedido, ${unidades} ${unidades === 1 ? "producto" : "productos"}`);
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

// Cantidad elegida en la ficha (el selector − 1 +); en las tarjetas es 1.
const cantidadElegida = (boton: HTMLElement): number => {
  const campo = boton.closest("[data-agregar-caja]")?.querySelector<HTMLInputElement>("[data-cantidad]");
  const valor = Number(campo?.value ?? 1);
  return Number.isFinite(valor) ? Math.min(CANTIDAD_MAXIMA, Math.max(1, Math.round(valor))) : 1;
};

document.addEventListener("click", (evento) => {
  const objetivo = evento.target as HTMLElement;

  const paso = objetivo.closest<HTMLButtonElement>("[data-sumar], [data-restar]");
  if (paso) {
    const campo = paso.closest("[data-agregar-caja]")?.querySelector<HTMLInputElement>("[data-cantidad]");
    if (campo) {
      const delta = paso.hasAttribute("data-sumar") ? 1 : -1;
      campo.value = String(Math.min(CANTIDAD_MAXIMA, Math.max(1, (Number(campo.value) || 1) + delta)));
    }
    return;
  }

  const boton = objetivo.closest<HTMLButtonElement>("[data-agregar]");
  if (!boton?.dataset.agregar) return;
  const cantidad = cantidadElegida(boton);
  agregarAlPedido(boton.dataset.agregar, cantidad);
  // Vuelve a 1 para que un segundo clic no sume de más sin querer.
  const campo = boton.closest("[data-agregar-caja]")?.querySelector<HTMLInputElement>("[data-cantidad]");
  if (campo) campo.value = "1";
  const nombre = boton.dataset.nombre ?? "el producto";
  avisar(cantidad > 1 ? `Agregaste ${cantidad} × ${nombre}` : `Agregaste ${nombre}`);

  const etiqueta = boton.querySelector<HTMLElement>("[data-agregar-texto]");
  if (etiqueta) {
    const original = etiqueta.dataset.original ?? etiqueta.textContent ?? "";
    etiqueta.dataset.original = original;
    etiqueta.textContent = "Agregado";
    window.setTimeout(() => (etiqueta.textContent = original), 1600);
  }
});

for (const elemento of document.querySelectorAll<HTMLElement>("[data-agregar], [data-agregar-caja]")) {
  elemento.hidden = false;
}
actualizarContador();
escucharCambios(actualizarContador);
