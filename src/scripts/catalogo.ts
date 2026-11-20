// Filtro y buscador del catálogo, en el lugar y con animación FLIP.
// Sin este script la página sigue funcionando: los filtros son enlaces a
// /productos/[categoria] y el buscador queda oculto.
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { normalizar } from "../lib/texto";

gsap.registerPlugin(Flip);

const catalogo = document.querySelector<HTMLElement>("[data-catalogo]");

const buscar = <T extends Element>(selector: string, raiz: ParentNode): T => {
  const elemento = raiz.querySelector<T>(selector);
  if (!elemento) throw new Error(`Catálogo: falta ${selector}`);
  return elemento;
};

const iniciarCatalogo = (raiz: HTMLElement) => {
  const tarjetas = [...raiz.querySelectorAll<HTMLElement>("[data-tarjeta]")];
  const filtros = [...raiz.querySelectorAll<HTMLAnchorElement>("[data-filtro]")];
  const titulo = buscar<HTMLElement>("[data-catalogo-titulo]", raiz);
  const total = buscar<HTMLElement>("[data-catalogo-total]", raiz);
  const cajaBuscador = buscar<HTMLElement>("[data-buscador-caja]", raiz);
  const buscador = buscar<HTMLInputElement>("[data-buscador]", raiz);
  const vacio = buscar<HTMLElement>("[data-vacio]", raiz);
  const vacioConsulta = buscar<HTMLElement>("[data-vacio-consulta]", raiz);
  const vacioWhatsapp = buscar<HTMLAnchorElement>("[data-vacio-whatsapp]", raiz);
  const whatsappBase = vacioWhatsapp.href;
  const movimientoReducido = matchMedia("(prefers-reduced-motion: reduce)");

  let categoria = raiz.dataset.categoria ?? "";
  let animacion: gsap.core.Timeline | undefined;

  // Con más de mil productos solo se anima lo que está en pantalla (o cerca):
  // animar todo sería lento y nadie lo ve.
  const cercana = (tarjeta: HTMLElement): boolean => {
    const caja = tarjeta.getBoundingClientRect();
    return caja.bottom > -300 && caja.top < window.innerHeight + 300;
  };

  const filtrar = () => {
    // Todas las palabras tienen que estar, en cualquier orden: "aceite coco"
    // encuentra "Aceite de coco".
    const palabras = normalizar(buscador.value).split(/\s+/).filter(Boolean);
    const coincide = (texto: string | undefined): boolean => palabras.every((palabra) => (texto ?? "").includes(palabra));
    // Terminar la animación anterior antes de medir evita saltos al
    // escribir rápido o tocar varios filtros seguidos.
    animacion?.progress(1);
    const visiblesAntes = tarjetas.filter((tarjeta) => !tarjeta.classList.contains("hidden"));
    const animables = visiblesAntes.filter(cercana);
    const estado = movimientoReducido.matches ? undefined : Flip.getState(animables);

    // Primero se busca en nombre, marca y presentación. Solo si nada
    // coincide se prueba con el nombre de la categoría ("especias", "té"):
    // así "café" no trae el boldo por estar en la misma góndola.
    const enCategoria = tarjetas.filter((tarjeta) => !categoria || tarjeta.dataset.categoria === categoria);
    const porTexto = enCategoria.filter((tarjeta) => coincide(tarjeta.dataset.texto));
    const coincidencias = new Set(
      porTexto.length > 0 ? porTexto : enCategoria.filter((tarjeta) => coincide(tarjeta.dataset.textoCategoria)),
    );

    for (const tarjeta of tarjetas) tarjeta.classList.toggle("hidden", !coincidencias.has(tarjeta));
    const visibles = coincidencias.size;

    total.textContent = String(visibles);
    vacio.hidden = visibles > 0;
    vacioConsulta.textContent = buscador.value.trim();
    vacioWhatsapp.href = `${whatsappBase}?text=${encodeURIComponent(`Hola, ¿tienen ${buscador.value.trim()}?`)}`;

    if (!estado) return;
    const previas = new Set(visiblesAntes);
    const nuevas = tarjetas.filter((tarjeta) => coincidencias.has(tarjeta) && !previas.has(tarjeta) && cercana(tarjeta));
    animacion = Flip.from(estado, {
      duration: 0.5,
      ease: "power3.inOut",
      absolute: true,
      onLeave: (salen) => gsap.to(salen, { autoAlpha: 0, scale: 0.94, duration: 0.25 }),
    });
    // Las que aparecen se muestran con un fundido, hasta un tope razonable.
    if (nuevas.length > 0 && nuevas.length <= 60) {
      gsap.fromTo(nuevas, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.35, delay: 0.15, clearProps: "opacity,visibility,transform" });
    }
  };

  const elegirCategoria = (nueva: string) => {
    categoria = nueva;
    raiz.dataset.categoria = nueva;
    for (const filtro of filtros) {
      if (filtro.dataset.filtro === nueva) {
        filtro.setAttribute("aria-current", "page");
        titulo.textContent = filtro.dataset.titulo ?? "Productos";
        document.title = `${filtro.dataset.titulo ?? "Productos"} · CERO Market`;
      } else {
        filtro.removeAttribute("aria-current");
      }
    }
    filtrar();
  };

  for (const filtro of filtros) {
    filtro.addEventListener("click", (evento) => {
      // Ctrl/Cmd + clic o clic del medio: que abra la pestaña normalmente.
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.button !== 0) return;
      evento.preventDefault();
      if (filtro.dataset.filtro === categoria) return;
      history.pushState({ categoria: filtro.dataset.filtro }, "", filtro.href);
      elegirCategoria(filtro.dataset.filtro ?? "");
    });
  }

  window.addEventListener("popstate", () => {
    const filtro = filtros.find((candidato) => new URL(candidato.href).pathname === location.pathname);
    elegirCategoria(filtro?.dataset.filtro ?? "");
  });

  let espera: number | undefined;
  buscador.addEventListener("input", () => {
    clearTimeout(espera);
    espera = window.setTimeout(filtrar, 160);
  });

  cajaBuscador.hidden = false;
};

if (catalogo) iniciarCatalogo(catalogo);
