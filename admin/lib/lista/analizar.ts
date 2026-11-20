// Compara la lista de precios del CRM con el catálogo actual y arma el
// resumen que se revisa en el panel antes de aplicar nada. No escribe en la
// base: es una función pura (recibe el estado actual y devuelve el análisis).
import { emparejar, type Candidato, type Confianza } from "./emparejar";
import { CATEGORIAS_BASE, productoDeFila, type Unidad, type Venta } from "./reglas";
import type { ListaLeida } from "./tipos";

// Artículos del CRM que no son productos para la web: devolución de envases y
// un artículo de prueba. Se pueden sumar más desde "Códigos ignorados".
export const IGNORADOS_DE_FABRICA: Record<string, string> = {
  "0200": "Devolución de envase",
  "0201": "Devolución de envase",
  "0202": "Devolución de envase",
  "0203": "Devolución de envase",
  "2542": "Artículo de prueba",
};

// Si desaparecen del PDF más productos que este porcentaje, es más probable
// que sea una lista parcial que productos discontinuados: no se marcan solos.
export const LIMITE_YA_NO_ESTAN = 0.25;

export type ProductoActual = {
  id: number;
  nombre: string;
  marca: string;
  presentacion: string;
  codigo: string | null;
  precio: number | null;
  venta: Venta;
};

export type EstadoActual = {
  productos: ProductoActual[];
  categorias: { slug: string; nombre: string }[];
  ignorados: Record<string, string>;
};

// Fila compacta para guardarla en el documento: c = código, a = artículo,
// m = marca, p = precio.
export type FilaGuardada = { c: string; a: string; m: string; p: number };

export type Nuevo = {
  codigo: string;
  articulo: string;
  nombre: string;
  marca: string;
  presentacion: string;
  precio: number;
  categoria: string;
  venta: Venta;
  unidad: Unidad;
};

export type Analisis = {
  version: 1;
  archivo: { lista: string; moneda: string; fecha: string | null; paginas: number; filas: number };
  advertencias: string[];
  filas: FilaGuardada[];
  conflictos: { codigo: string; articulo: string; precios: number[] }[];
  ignoradas: { codigo: string; articulo: string; precio: number; motivo: string }[];
  precios: { productoId: number; codigo: string; nombre: string; antes: number | null; despues: number }[];
  sinCambios: number;
  yaNoEstan: { productoId: number; codigo: string; nombre: string }[];
  yaNoEstanSospechoso: boolean;
  vincular: {
    productoId: number;
    nombre: string;
    detalle: string;
    confianza: Confianza;
    candidatos: Candidato[];
    // Lo que las reglas proponen para este producto si se vincula (granel o no).
    venta: Venta;
    unidad: Unidad;
  }[];
  nuevos: Nuevo[];
  categorias: { slug: string; nombre: string; nueva: boolean }[];
};

export const analizar = (lista: ListaLeida, estado: EstadoActual): Analisis => {
  const ignorados = { ...IGNORADOS_DE_FABRICA, ...estado.ignorados };

  // 1) Juntar copias idénticas y detectar códigos con precios distintos.
  const porCodigo = new Map<string, { articulo: string; marca: string; precios: Set<number> }>();
  for (const fila of lista.filas) {
    const existente = porCodigo.get(fila.codigo);
    if (existente) existente.precios.add(fila.precio);
    else porCodigo.set(fila.codigo, { articulo: fila.articulo, marca: fila.marca, precios: new Set([fila.precio]) });
  }

  const conflictos: Analisis["conflictos"] = [];
  const ignoradas: Analisis["ignoradas"] = [];
  const filas: FilaGuardada[] = [];
  for (const [codigo, datos] of porCodigo) {
    const precios = [...datos.precios];
    const primero = precios[0] ?? 0;
    if (ignorados[codigo]) {
      ignoradas.push({ codigo, articulo: datos.articulo, precio: primero, motivo: ignorados[codigo]! });
    } else if (precios.length > 1) {
      conflictos.push({ codigo, articulo: datos.articulo, precios: precios.sort((a, b) => a - b) });
    } else if (primero <= 0) {
      ignoradas.push({ codigo, articulo: datos.articulo, precio: primero, motivo: "Precio en cero" });
    } else {
      filas.push({ c: codigo, a: datos.articulo, m: datos.marca, p: primero });
    }
  }
  const filaPorCodigo = new Map(filas.map((fila) => [fila.c, fila]));

  // 2) Productos que ya tienen código: cambio de precio, sin cambio o ya no están.
  const conCodigo = estado.productos.filter((producto) => producto.codigo);
  const codigosEnUso = new Set(conCodigo.map((producto) => producto.codigo as string));
  const precios: Analisis["precios"] = [];
  const yaNoEstan: Analisis["yaNoEstan"] = [];
  let sinCambios = 0;
  for (const producto of conCodigo) {
    const codigo = producto.codigo as string;
    const fila = filaPorCodigo.get(codigo);
    if (!fila) {
      // Un código en conflicto o ignorado no es "ya no está": está en la lista.
      if (!porCodigo.has(codigo)) yaNoEstan.push({ productoId: producto.id, codigo, nombre: producto.nombre });
    } else if (producto.precio === fila.p) {
      sinCambios += 1;
    } else {
      precios.push({ productoId: producto.id, codigo, nombre: producto.nombre, antes: producto.precio, despues: fila.p });
    }
  }

  // 3) Productos de la web sin código: sugerir con qué fila se corresponden.
  //    Solo entre las filas que todavía no tienen producto.
  const filasLibres = filas.filter((fila) => !codigosEnUso.has(fila.c));
  const sinCodigo = estado.productos.filter((producto) => !producto.codigo);
  const sugerencias = emparejar(
    sinCodigo.map(({ id, nombre, marca, presentacion }) => ({ id, nombre, marca, presentacion })),
    filasLibres.map(({ c, a, m, p }) => ({ codigo: c, articulo: a, marca: m, precio: p })),
  );
  const vincular: Analisis["vincular"] = sugerencias.map((sugerencia) => {
    const producto = sinCodigo.find((candidato) => candidato.id === sugerencia.productoId)!;
    const mejor = filaPorCodigo.get(sugerencia.candidatos[0]?.codigo ?? "");
    const propuesto = mejor ? productoDeFila({ codigo: mejor.c, articulo: mejor.a, marca: mejor.m, precio: mejor.p }) : null;
    return {
      productoId: producto.id,
      nombre: producto.nombre,
      detalle: [producto.marca, producto.presentacion].filter(Boolean).join(" · "),
      confianza: sugerencia.confianza,
      candidatos: sugerencia.candidatos,
      venta: propuesto?.venta ?? "empaquetado",
      unidad: propuesto?.unidad ?? "kilo",
    };
  });

  // 4) El resto de las filas libres son productos nuevos.
  const nuevos: Nuevo[] = filasLibres.map((fila) => {
    const producto = productoDeFila({ codigo: fila.c, articulo: fila.a, marca: fila.m, precio: fila.p });
    return { ...producto, articulo: fila.a };
  });

  // 5) Categorías: las que ya existen y las que hay que crear.
  const existentes = new Map(estado.categorias.map((categoria) => [categoria.slug, categoria.nombre]));
  const usadas = new Set(nuevos.map((nuevo) => nuevo.categoria));
  const categorias: Analisis["categorias"] = [
    ...estado.categorias.map((categoria) => ({ ...categoria, nueva: false })),
    ...CATEGORIAS_BASE.filter((categoria) => !existentes.has(categoria.slug) && usadas.has(categoria.slug)).map((categoria) => ({
      ...categoria,
      nueva: true,
    })),
  ];

  return {
    version: 1,
    archivo: { lista: lista.lista, moneda: lista.moneda, fecha: lista.fecha, paginas: lista.paginas, filas: lista.filas.length },
    advertencias: lista.advertencias,
    filas,
    conflictos,
    ignoradas,
    precios,
    sinCambios,
    yaNoEstan,
    yaNoEstanSospechoso: conCodigo.length > 0 && yaNoEstan.length / conCodigo.length > LIMITE_YA_NO_ESTAN,
    vincular,
    nuevos,
    categorias,
  };
};
