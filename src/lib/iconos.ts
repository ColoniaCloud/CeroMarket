// Íconos de Phosphor (https://phosphoricons.com, licencia MIT), peso "bold":
// trazo redondeado y grueso, que acompaña al titular condensado y a los
// botones en píldora. Se importan de a uno: solo viajan los que se usan.
// Para sumar uno, importarlo acá y agregarlo al objeto (el nombre del
// archivo es el del ícono en phosphoricons.com más "-bold").
import arrowUpRight from "@phosphor-icons/core/assets/bold/arrow-up-right-bold.svg?raw";
import envelope from "@phosphor-icons/core/assets/bold/envelope-simple-bold.svg?raw";
import facebook from "@phosphor-icons/core/assets/bold/facebook-logo-bold.svg?raw";
import google from "@phosphor-icons/core/assets/bold/google-logo-bold.svg?raw";
import grains from "@phosphor-icons/core/assets/bold/grains-bold.svg?raw";
import instagram from "@phosphor-icons/core/assets/bold/instagram-logo-bold.svg?raw";
import jar from "@phosphor-icons/core/assets/bold/jar-bold.svg?raw";
import mapPin from "@phosphor-icons/core/assets/bold/map-pin-bold.svg?raw";
import scales from "@phosphor-icons/core/assets/bold/scales-bold.svg?raw";
import whatsapp from "@phosphor-icons/core/assets/bold/whatsapp-logo-bold.svg?raw";
import quotes from "@phosphor-icons/core/assets/fill/quotes-fill.svg?raw";
import star from "@phosphor-icons/core/assets/fill/star-fill.svg?raw";

export const iconos = {
  arrowUpRight,
  envelope,
  facebook,
  google,
  grains,
  instagram,
  jar,
  mapPin,
  quotes,
  scales,
  star,
  whatsapp,
} as const;

export type NombreIcono = keyof typeof iconos;
