// Reglas para convertir una fila de la lista de precios del CRM en un producto
// del panel: nombre legible, presentación, marca, categoría y si es a granel.
// Son heurísticas: aciertan en la mayoría y lo dudoso se revisa en la pantalla
// de revisión (y siempre se puede corregir después en el producto).
import type { FilaLista } from "./tipos";

export const sinAcentos = (texto: string): string =>
  texto.normalize("NFD").replace(/\p{Diacritic}/gu, "");

// Texto en minúsculas y sin acentos, para comparar.
export const claveDe = (texto: string): string => sinAcentos(texto).toLowerCase();

// ---------- Categorías ----------

export type CategoriaBase = { slug: string; nombre: string };

// Las categorías que existen al migrar más las que hacen falta para el resto
// de la lista. Las que no existan en el panel se crean al aplicar.
export const CATEGORIAS_BASE: CategoriaBase[] = [
  { slug: "especias", nombre: "Especias y condimentos" },
  { slug: "granos", nombre: "Granos, harinas y legumbres" },
  { slug: "frutos-secos", nombre: "Frutos secos y deshidratados" },
  { slug: "superalimentos", nombre: "Superalimentos" },
  { slug: "cafe-infusiones", nombre: "Café, yerba e infusiones" },
  { slug: "almacen", nombre: "Almacén" },
  { slug: "dulces", nombre: "Chocolates y snacks" },
  { slug: "cuidado-personal", nombre: "Cuidado personal" },
  { slug: "hogar", nombre: "Hogar zero waste" },
  { slug: "bebidas", nombre: "Bebidas" },
  { slug: "mascotas", nombre: "Mascotas" },
  { slug: "otros", nombre: "Otros productos" },
];

// 1) Frases que mandan sobre todo lo demás: casos donde la primera palabra
//    engaña ("crema de maní" no es cuidado personal).
const FRASES: [RegExp, string][] = [
  [/crema (de )?(leche|mani|almendra|avellana|pistacho|caju|coco|nuez|batata|zapallo)/, "almacen"],
  [/aceite (esencial|es\.|para barba|de (almendras|rosa|argan|jojoba|masaje|barba))/, "cuidado-personal"],
  [/jabon (liquido )?(para |de )?(ropa|lavar|lavarropas|vajilla)|jabon en barra para ropa/, "hogar"],
  [/(limpiador|limpia) (multiuso|pisos|vidrios|bano|cocina|desengrasante|de superficies)/, "hogar"],
  [/cepillo.*(diente|dental|pelo|barba|unas)|pasta (de )?(dientes|dental)/, "cuidado-personal"],
  [/mostaza.*(grano|polvo)|semillas? de mostaza/, "especias"],
  [/leche de (coco|almendra|avena|soja|arroz)/, "almacen"],
  [/tintura de |extracto de |jalea real|propoleo/, "superalimentos"],
];

// 2) Palabras sueltas, de izquierda a derecha: manda la primera que se
//    reconoce ("ACEITE DE COCO" es aceite, no coco). Las que terminan en "="
//    tienen que coincidir exactas (sal, te, pan); el resto vale como comienzo
//    de palabra, así cubre plurales ("aceitunas").
const PALABRAS: Record<string, string[]> = {
  mascotas: ["gato", "perro", "mascota"],
  hogar: [
    "detergente", "lavavajilla", "lavandina", "limpiador", "desengrasante", "suavizante", "esponja", "estropajo",
    "escobill", "cepillo", "bolsa", "botella", "frasco", "vaso", "mug", "taza", "sorbete", "bombilla", "pajita",
    "envoltorio", "vela", "incienso", "sahumerio", "pano", "termo", "tupper", "vianda", "cubierto", "rinonera",
    "mochila", "neceser", "cuaderno", "purificador", "ecofiltro", "filtro", "set=", "kit=", "balde",
    "cesto", "difusor", "residuo", "devol", "vaio", "lapicera", "fibra", "botellon", "cajita", "aromatizante",
    "sanitizante", "bactericida", "valvula", "tirilla", "dispensador",
  ],
  "cuidado-personal": [
    "shampoo", "champu", "sham=", "acondicionador", "jabon", "crema", "serum", "balsamo", "desodorante", "peine",
    "dentifrico", "enjuague", "talco", "polvo=", "maquillaje", "rubor", "labial", "mascara=", "esmalte", "exfoliante",
    "tonico", "micelar", "mascarilla", "gloss", "iluminador", "delineador", "sombra", "corrector",
    "repelente", "protector", "colonia", "perfume", "gel=", "roll", "copa=", "toallita", "tampon", "algodon",
    "hisopo", "panuelo", "desmaquillante", "karite", "facial", "corporal", "depil", "navaja", "afeitar", "pomada", "unguento",
  ],
  bebidas: ["agua=", "kombucha", "jugo", "gaseosa", "soda=", "vino", "cerveza", "licor", "sidra", "bebida", "refresco", "tonica", "garnacha", "malbec", "tannat", "grape"],
  "cafe-infusiones": [
    "cafe", "yerba", "mate=", "te=", "tes=", "trini", "twinings", "infusion", "manzanilla", "tilo", "boldo", "menta",
    "poleo", "cedron", "marcela", "carqueja", "hibisco", "rooibos", "matcha", "chai", "valeriana", "pasiflora",
    "ginkgo", "gingko", "calendula", "tisana", "malva", "marrubio", "veronica", "cola=", "lavanda", "melisa", "petalo", "hojas=",
  ],
  superalimentos: [
    "maca=", "espirulina", "spirulina", "chlorella", "colag", "goji", "acai", "aguaymanto", "psyllium", "moringa",
    "nibs", "lucuma", "baobab", "camu", "ashwagandha", "proteina", "suplemento", "probiotico", "omega", "vitamina",
    "bayas", "amalaki", "triphala", "ginseng", "tempeh", "kimchi", "jalea", "polen", "neem", "vitanna",
  ],
  dulces: [
    "chocolate", "bombon", "alfajor", "galleta", "galletita", "barrita", "barra=", "bars=", "bar=", "turron", "snack",
    "garrapi", "cookie", "delicookie", "brownie", "muffin", "budin", "torta", "caramelo", "chicle", "gomita",
    "marshmallow", "helado", "postre", "flan", "mantecol", "oblea", "chips=", "chip=", "hippeas", "tableta",
    "masita", "pochoclo", "palomita", "chupet", "bizcocho", "cacao", "cobertura", "regaliz", "energy", "confite",
  ],
  "frutos-secos": [
    "papaya", "almendra", "nuez", "nueces", "nuts=", "mani=", "castana", "caju", "pistacho", "avellana", "pecan", "macadamia",
    "pasa=", "pasas=", "ciruela", "damasco", "orejon", "datil", "higo", "arandano", "coco=", "cocos=", "cocomix",
    "fruta", "deshidrat", "des.=", "cereza", "pinon", "pipas", "girasol", "zapallo", "sesamo", "confitad", "semilla",
    "mix=", "banana", "manzana", "pera=", "mango", "durazno", "frutilla", "kiwi", "naranja", "limon", "pomelo", "ananas",
  ],
  especias: [
    "pimienta", "pimenton", "aji=", "ajo=", "ajos=", "oregano", "romero", "tomillo", "laurel", "perejil", "albahaca",
    "cilantro", "coriandro", "comino", "curcuma", "canela", "clavo", "moscada", "jengibre", "cardamomo", "anis=",
    "hinojo", "sal=", "sales=", "especia", "condimento", "sazon", "adobo", "chimichurri", "curry", "garam",
    "masala", "paprika", "paprica", "wasabi", "zaatar", "sichuan", "galangal", "asafetida", "fenogreco", "alcaravea",
    "ajwain", "azafran", "vainilla", "estragon", "eneldo", "mejorana", "salvia", "ciboulette", "cebollin", "cebolla",
    "hongo", "shiitake", "shitake", "alga=", "algas=", "nori", "wakame", "kombu", "agar=", "sumac", "achiote",
    "enebro", "cayena", "chile", "herbs", "herbes", "hierba", "provence", "provenzal", "merken", "urucum", "cascara",
    "espinaca", "pizza=", "zanahoria", "remolacha", "puerro", "apio", "macis", "tandoori", "amapola", "jalapeno", "gomasio",
  ],
  almacen: [
    "aceite", "aceituna", "vinagre", "salsa", "ketchup", "mayonesa", "mostaza", "aderezo", "mermelada", "dulce=",
    "miel", "jarabe", "azucar", "stevia", "endulzante", "panela", "melaza", "sirope", "pasta=", "pastas=", "fideo",
    "tallarin", "espagueti", "ravioles", "noqui", "lasagna", "pan=", "tostada", "grisin", "tortilla", "wrap", "huevo",
    "queso", "manteca", "ghee", "tahini", "hummus", "conserva", "pepino", "pepinillo", "pickle", "encurtido",
    "chucrut", "escabeche", "atun", "sardina", "caldo", "sopa", "pure=", "passata", "pulpa", "tomate", "levadura",
    "bicarbonato", "gelatina", "leche", "yogur", "y.gurt", "kefir", "tofu", "seitan", "bizcochuelo", "premezcla",
    "rebozador", "repollo", "naveia", "receta", "goma=", "dalfour", "pimiento", "morron", "berenjena", "zucchini",
    "palmito", "alcaparra", "choclo", "hamburguesa", "milanesa", "vegetal", "dulces=", "eritritol", "edulcorante", "sucra",
    "extrac", "membrillo", "untable", "panko", "gofio", "pate=", "olio", "mct=", "yogart", "dip=", "guacamole", "nude=",
    "rawmesan", "cebollitas", "sabores", "almibar", "esencia=",
  ],
  granos: [
    "arroz", "harina", "poroto", "lenteja", "garbanzo", "arveja", "quinoa", "quinua", "avena", "trigo", "cebada",
    "centeno", "maiz", "mijo", "amaranto", "sarraceno", "alforfon", "bulgur", "cous", "granola", "cereal", "muesli",
    "copos", "salvado", "germen", "farina", "semola", "polenta", "sorgo", "teff", "soja", "mung", "urad", "dal=",
    "tape=", "adzuki", "haba=", "habas=", "lupino", "chia=", "lino=", "mandioca", "tapioca", "almidon", "fecula",
    "maicena", "legumbre", "grano", "alpiste", "semolin", "lentejon",
  ],
};

// Marcas de un solo rubro: sirven cuando el nombre no dice qué es.
const CATEGORIA_POR_MARCA: Record<string, string> = {
  BROTTA: "cuidado-personal",
  AMMALUA: "cuidado-personal",
  LINDURAS: "cuidado-personal",
  NATURALMENTE: "cuidado-personal",
  MARE: "hogar",
  "MY ECO": "hogar",
  "DELI FOR LIFE": "almacen",
  "TERRA VERDE": "cafe-infusiones",
  GENESE: "dulces",
};

const palabrasDe = (articulo: string): string[] =>
  claveDe(articulo).replace(/[^a-z0-9.]+/g, " ").trim().split(" ").filter(Boolean);

const coincide = (palabra: string, lista: string[]): boolean =>
  lista.some((candidata) => (candidata.endsWith("=") ? palabra === candidata.slice(0, -1) : palabra.startsWith(candidata)));

// Marcas que solo venden cosmética: mandan sobre el nombre ("ACEITE ALMENDRAS
// AmmaLua" es cuidado personal aunque diga "aceite").
const CATEGORIA_FIJA_POR_MARCA: Record<string, string> = {
  BROTTA: "cuidado-personal",
  AMMALUA: "cuidado-personal",
  LINDURAS: "cuidado-personal",
};

export const categoriaDe = (articulo: string, marca = ""): string => {
  const fija = CATEGORIA_FIJA_POR_MARCA[marca.trim().toUpperCase()];
  if (fija) return fija;
  const clave = claveDe(articulo);
  for (const [frase, categoria] of FRASES) if (frase.test(clave)) return categoria;
  for (const palabra of palabrasDe(articulo)) {
    for (const [categoria, lista] of Object.entries(PALABRAS)) if (coincide(palabra, lista)) return categoria;
  }
  return CATEGORIA_POR_MARCA[marca.trim().toUpperCase()] ?? "otros";
};

// ---------- Granel o empaquetado ----------

export type Venta = "empaquetado" | "granel";
export type Unidad = "kilo" | "litro";

// Un peso o un volumen en el nombre ("250g", "1 lt.", "500 ML").
const PESO = /\b(\d+(?:[.,]\d+)?)\s*(kgs?|grs?|gr|g|ml|cc|lts?|l)\b\.?/i;

// Líquidos que, a granel, se venden por litro.
const LIQUIDOS = /\b(aceite|detergente|acondicionador|shampoo|champu|vinagre|limpiador|desengrasante|suavizante|lavandina|jabon liquido|gel|crema corporal|crema|jarabe|miel|sirope|melaza|salsa|leche|agua|kombucha|jugo|tintura|esencia|extracto)\b/;

// Categorías cuyos productos, sin peso en el nombre, se venden por kilo.
const GRANEL_POR_CATEGORIA = new Set(["especias", "granos", "frutos-secos", "cafe-infusiones", "superalimentos"]);
// Palabras que delatan un producto ya envasado aunque no traiga el peso.
const ENVASADO = /\b(bolsa|caja|cajita|sobre|saquito|sachet|set|pack|frasco|botella|lata|barrita|barritas|galleta|galletas|alfajor|alfajores|receta|capsula|capsulas|unidad|unidades|x ?\d+)\b/;

export const ventaDe = (articulo: string, categoria: string): { venta: Venta; unidad: Unidad } => {
  const clave = claveDe(articulo);
  const liquido = LIQUIDOS.test(clave);
  if (/\bgranel\b/.test(clave)) return { venta: "granel", unidad: liquido ? "litro" : "kilo" };
  if (PESO.test(clave) || ENVASADO.test(clave)) return { venta: "empaquetado", unidad: "kilo" };
  if (GRANEL_POR_CATEGORIA.has(categoria)) return { venta: "granel", unidad: "kilo" };
  return { venta: "empaquetado", unidad: "kilo" };
};

// ---------- Nombre, presentación y marca ----------

const MARCAS_CONOCIDAS: Record<string, string> = {
  CAMPOCLARO: "Campo Claro",
  "LA TRINIDAD": "La Trinidad",
  AMMALUA: "Ammalua",
  "TERRA VERDE": "Terra Verde",
  "PIQUE ROTO": "Pique Roto",
  "PUNTO SANO": "Punto Sano",
  "VIRGINIA SALVO": "Virginia Salvo",
  "LA ABUNDANCIA": "La Abundancia",
  "NATUR GREEN": "Natur Green",
  "MY ECO": "My Eco",
  NATURALMENTE: "Naturalmente",
  LINDURAS: "Linduras",
  BROTTA: "Brotta",
  PRANA: "Prana",
  SERPIS: "Serpis",
};

const capitalizar = (palabra: string): string => (palabra ? palabra[0]!.toUpperCase() + palabra.slice(1).toLowerCase() : palabra);

const tituloDe = (texto: string): string => texto.toLowerCase().split(/\s+/).map(capitalizar).join(" ");

export const marcaLegible = (marca: string): string => {
  const limpia = marca.replace(/\s+/g, " ").trim();
  if (!limpia) return "";
  return MARCAS_CONOCIDAS[limpia.toUpperCase()] ?? tituloDe(limpia);
};

const UNIDADES: Record<string, string> = { kg: "kg", kgs: "kg", g: "g", gr: "g", grs: "g", ml: "ml", cc: "ml", l: "l", lt: "l", lts: "l" };

// Mayúscula inicial y, dentro de comillas, cada palabra ("cafetin" -> "Cafetin").
const frase = (texto: string): string => {
  const minuscula = texto.toLowerCase().replace(/\s+/g, " ").trim();
  const conComillas = minuscula.replace(/"([^"]+)"/g, (_, dentro: string) => `"${dentro.split(" ").map(capitalizar).join(" ")}"`);
  return conComillas ? conComillas[0]!.toUpperCase() + conComillas.slice(1) : conComillas;
};

export type ProductoNuevo = {
  codigo: string;
  nombre: string;
  marca: string;
  presentacion: string;
  precio: number;
  categoria: string;
  venta: Venta;
  unidad: Unidad;
};

// "ACEITE DE COCO 200ML PRANA" -> nombre "Aceite de coco", marca "Prana",
// presentación "200 ml".
export const productoDeFila = (fila: FilaLista): ProductoNuevo => {
  const categoria = categoriaDe(fila.articulo, fila.marca);
  const { venta, unidad } = ventaDe(fila.articulo, categoria);
  let texto = fila.articulo;

  let presentacion = "";
  if (venta === "empaquetado") {
    const peso = PESO.exec(texto);
    if (peso) {
      presentacion = `${peso[1]!.replace(".", ",")} ${UNIDADES[peso[2]!.toLowerCase()] ?? peso[2]}`;
      texto = texto.replace(PESO, " ");
    }
  }
  if (venta === "granel") texto = texto.replace(/\b(a\s+)?granel\b/gi, " ");

  // La marca al final del nombre (con o sin comillas) pasa al campo Marca.
  const marca = marcaLegible(fila.marca);
  if (fila.marca) {
    const escapada = fila.marca.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
    texto = texto.replace(new RegExp(`\\s*["“]?${escapada}["”]?\\s*$`, "i"), " ");
  }
  // "GALANGAL BOLSA 50g", "ESTRAGON PAQ.": el envase no es parte del nombre.
  if (categoria !== "hogar") texto = texto.replace(/\s+(bolsa|paq\.?|paquete|pote|sobre)\s*$/i, " ");
  texto = texto.replace(/\s+/g, " ").replace(/[\s,.\-/]+$/g, "").trim();

  return {
    codigo: fila.codigo,
    nombre: frase(texto || fila.articulo),
    marca,
    presentacion,
    precio: fila.precio,
    categoria,
    venta,
    unidad,
  };
};
