// Entrada de la portada: el titular sube línea por línea desde una máscara,
// la foto se descubre de arriba abajo y el texto aparece después. Es la
// única orquestación de la página; con movimiento reducido no corre (el
// script en línea de index.astro ni siquiera oculta nada).
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const raiz = document.documentElement;

const entrar = () => {
  const titular = document.querySelector<HTMLElement>("[data-entrada='titular']");
  const foto = document.querySelector<HTMLElement>("[data-entrada='foto']");
  const textos = document.querySelectorAll<HTMLElement>("[data-entrada='texto']");
  if (!titular || !foto) return;

  gsap.set([titular, foto, ...textos], { visibility: "visible" });
  raiz.classList.remove("animar");

  // Las máscaras por línea recortan un poco las tildes de las mayúsculas:
  // por eso el texto entra con un fundido y, al terminar, se deshace la
  // división y queda el HTML original.
  SplitText.create(titular, {
    type: "lines",
    mask: "lines",
    onSplit: (partes) =>
      gsap.from(partes.lines, {
        yPercent: 110,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.09,
        ease: "power4.out",
        onComplete: () => partes.revert(),
      }),
  });

  gsap.fromTo(
    foto,
    { clipPath: "inset(0% 0% 100% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut", clearProps: "clipPath" },
  );
  gsap.from(foto.querySelector("img"), { scale: 1.15, duration: 1.6, ease: "power3.out" });
  gsap.from(textos, { y: 18, autoAlpha: 0, duration: 0.8, delay: 0.45, stagger: 0.1, ease: "power3.out" });
};

if (raiz.classList.contains("animar")) {
  // Esperar las fuentes evita que el titular se corte en líneas distintas
  // de las que va a tener al terminar de cargar.
  document.fonts.ready.then(entrar);
}
