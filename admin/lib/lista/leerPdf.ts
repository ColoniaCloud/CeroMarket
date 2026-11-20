// Lee el PDF "Listas de precios" que genera el CRM. Usa la posición de cada
// texto en la página para armar las columnas (Código, Artículo, Marca,
// Contado). No sirve extraer el texto "de corrido": cuando una marca está
// vacía, las columnas se desfasan una fila y los precios quedan en el
// producto equivocado. Si el formato no es el esperado, rechaza el archivo en
// vez de adivinar.
import { ErrorDeLista, type FilaLista, type ListaLeida } from "./tipos";

type Texto = { str: string; x: number; y: number };

const ENCABEZADOS = ["Código", "Artículo", "Marca", "Contado"] as const;
// Dos textos con baselines a menos de esta distancia (en puntos PDF) son la
// misma fila.
const TOLERANCIA_FILA = 3;

export const leerPrecio = (texto: string): number | null => {
  const limpio = texto.trim();
  if (!/^\d{1,3}(\.\d{3})*(,\d{1,2})?$|^\d+(,\d{1,2})?$/.test(limpio)) return null;
  return Number(limpio.replace(/\./g, "").replace(",", "."));
};

// La versión "legacy" es la que funciona en Node sin canvas. El archivo de
// trabajo se importa a propósito: así el empaquetado de producción (Next
// standalone, en Hostinger) lo incluye; si no, pdfjs lo busca solo y no lo
// encuentra.
const cargarPdfjs = async () => {
  const [pdfjs, trabajador] = await Promise.all([
    import("pdfjs-dist/legacy/build/pdf.mjs"),
    import("pdfjs-dist/legacy/build/pdf.worker.mjs"),
  ]);
  (globalThis as { pdfjsWorker?: unknown }).pdfjsWorker = trabajador;
  return pdfjs;
};

export const leerPdf = async (datos: Uint8Array): Promise<ListaLeida> => {
  const pdfjs = await cargarPdfjs();
  let documento;
  try {
    documento = await pdfjs.getDocument({
      data: new Uint8Array(datos),
      useSystemFonts: false,
      disableFontFace: true,
      verbosity: 0,
    }).promise;
  } catch {
    throw new ErrorDeLista("No se pudo abrir el archivo: no parece un PDF válido.");
  }

  const filas: FilaLista[] = [];
  const advertencias: string[] = [];
  let lista = "";
  let moneda = "";
  let fecha: string | null = null;

  for (let numero = 1; numero <= documento.numPages; numero += 1) {
    const pagina = await documento.getPage(numero);
    const contenido = await pagina.getTextContent();
    const textos: Texto[] = contenido.items.flatMap((item) =>
      "str" in item && item.str.trim() ? [{ str: item.str.trim(), x: item.transform[4] ?? 0, y: item.transform[5] ?? 0 }] : [],
    );

    const encabezado = new Map<string, Texto>();
    for (const nombre of ENCABEZADOS) {
      const encontrado = textos.find((texto) => texto.str === nombre);
      if (encontrado) encabezado.set(nombre, encontrado);
    }
    const faltan = ENCABEZADOS.filter((nombre) => !encabezado.has(nombre));
    if (faltan.length > 0) {
      throw new ErrorDeLista(
        `La página ${numero} no tiene las columnas esperadas (faltan: ${faltan.join(", ")}). ` +
          "Tiene que ser la lista de precios del CRM con Código, Artículo, Marca y Contado.",
      );
    }
    const xArticulo = encabezado.get("Artículo")!.x - 2;
    const xMarca = encabezado.get("Marca")!.x - 2;
    const xPrecio = encabezado.get("Contado")!.x - 40;
    const yEncabezado = encabezado.get("Código")!.y;

    if (numero === 1) {
      // Encima del encabezado: "Lista: Principal, ..., Moneda: Pesos Uruguayos, ..."
      const arriba = textos.filter((texto) => texto.y > yEncabezado).map((texto) => texto.str).join(" ");
      lista = /Lista:\s*([^,]+)/.exec(arriba)?.[1]?.trim() ?? "";
      moneda = /Moneda:\s*([^,]+)/.exec(arriba)?.[1]?.trim() ?? "";
    }
    fecha ??= textos.map((texto) => /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/.exec(texto.str)?.[0]).find(Boolean) ?? null;

    // Agrupa por fila (de arriba hacia abajo) los textos que están debajo del encabezado.
    const debajo = textos.filter((texto) => texto.y < yEncabezado - 1).sort((a, b) => b.y - a.y || a.x - b.x);
    const grupos: { y: number; textos: Texto[] }[] = [];
    for (const texto of debajo) {
      const grupo = grupos.find((candidato) => Math.abs(candidato.y - texto.y) <= TOLERANCIA_FILA);
      if (grupo) grupo.textos.push(texto);
      else grupos.push({ y: texto.y, textos: [texto] });
    }

    for (const grupo of grupos) {
      const columnas = { codigo: [] as string[], articulo: [] as string[], marca: [] as string[], precio: [] as string[] };
      for (const texto of grupo.textos.sort((a, b) => a.x - b.x)) {
        const destino = texto.x < xArticulo ? "codigo" : texto.x < xMarca ? "articulo" : texto.x < xPrecio ? "marca" : "precio";
        columnas[destino].push(texto.str);
      }
      const codigo = columnas.codigo.join(" ");
      if (!/^\d+$/.test(codigo)) continue; // pie de página, fecha, "1/17"...
      const articulo = columnas.articulo.join(" ").replace(/\s+/g, " ").trim();
      const precio = leerPrecio(columnas.precio.join(" "));
      if (!articulo) {
        advertencias.push(`Código ${codigo}: sin nombre, se salteó.`);
        continue;
      }
      if (precio === null) {
        advertencias.push(`Código ${codigo} (${articulo}): precio ilegible «${columnas.precio.join(" ")}», se salteó.`);
        continue;
      }
      filas.push({ codigo, articulo, marca: columnas.marca.join(" ").replace(/\s+/g, " ").trim(), precio });
    }
  }

  if (!/pesos/i.test(moneda)) {
    throw new ErrorDeLista(
      moneda
        ? `La lista está en «${moneda}» y este sistema solo importa listas en pesos uruguayos.`
        : "No se encontró la moneda de la lista en el encabezado del PDF.",
    );
  }
  if (filas.length < 20) {
    throw new ErrorDeLista(`Se leyeron solo ${filas.length} productos: el formato del PDF no es el esperado.`);
  }
  return { filas, lista, moneda, fecha, paginas: documento.numPages, advertencias };
};
