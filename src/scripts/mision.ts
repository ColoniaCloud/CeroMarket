// Misión zero waste, en escritorio: la columna de fotos queda fija (CSS
// sticky) y, a medida que cada paso cruza el centro de la pantalla, su foto
// se descubre sobre la anterior. En móvil cada paso trae su propia foto y
// este script no hace nada.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ABIERTA = "inset(0% 0% 0% 0%)";
const CERRADA = "inset(100% 0% 0% 0%)";

const iniciarPasos = (seccion: HTMLElement) => {
  const pasos = [...seccion.querySelectorAll<HTMLElement>("[data-paso]")];
  const fotos = [...seccion.querySelectorAll<HTMLElement>("[data-paso-foto]")];
  const numeros = pasos.map((paso) => paso.querySelector<HTMLElement>("[data-paso-numero]"));

  gsap.matchMedia().add(
    { escritorio: "(min-width: 1024px)", reducido: "(prefers-reduced-motion: reduce)" },
    (contexto) => {
      const { escritorio, reducido } = contexto.conditions ?? {};
      if (!escritorio) return;

      gsap.set(fotos.slice(1), { clipPath: CERRADA });
      gsap.set(numeros.slice(1), { opacity: 0.15 });

      const mostrar = (destino: number) => {
        fotos.forEach((foto, indice) => {
          if (indice === 0) return;
          gsap.to(foto, {
            clipPath: indice <= destino ? ABIERTA : CERRADA,
            duration: reducido ? 0 : 0.9,
            ease: "power3.inOut",
            overwrite: true,
          });
        });
        numeros.forEach((numero, indice) => {
          gsap.to(numero, { opacity: indice === destino ? 1 : 0.15, duration: reducido ? 0 : 0.4, overwrite: true });
        });
      };

      pasos.forEach((paso, indice) => {
        ScrollTrigger.create({
          trigger: paso,
          start: "top center",
          end: "bottom center",
          onToggle: (disparador) => {
            // Al volver por arriba del primer paso, la columna vuelve a su foto.
            const volvioAlPrincipio = indice === 0 && disparador.direction < 0;
            if (disparador.isActive || volvioAlPrincipio) mostrar(indice);
          },
        });
      });
    },
  );
};

const seccion = document.querySelector<HTMLElement>("[data-pasos]");
if (seccion) iniciarPasos(seccion);
