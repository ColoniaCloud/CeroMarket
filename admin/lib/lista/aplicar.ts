// Aplica una lista de precios ya revisada: vincula productos con su código del
// CRM, actualiza precios, crea los productos nuevos y marca los que ya no
// están. Se puede volver a correr sin duplicar nada (cada producto nuevo tiene
// un código único): si se interrumpe a la mitad, alcanza con aplicarla de nuevo.
import type { Payload } from "payload";
import { aSlug } from "../slug";
import { programarPublicacion, SIN_PUBLICAR } from "../publicar";
import type { Analisis } from "./analizar";
import type { Decisiones, ResultadoDeAplicar } from "./decisiones";
import { CATEGORIAS_BASE, productoDeFila } from "./reglas";

const MAXIMO_ERRORES = 30;

export class ErrorDeDecisiones extends Error {}

// Revisa que las decisiones tengan sentido ANTES de empezar a escribir.
export const validarDecisiones = (analisis: Analisis, decisiones: Decisiones, productosConCodigo: Map<string, number>): void => {
  const codigosDeLista = new Set(analisis.filas.map((fila) => fila.c));
  const elegidos = new Map<string, string>();
  for (const [productoId, codigo] of Object.entries(decisiones.vinculos)) {
    if (!codigo) continue;
    if (!codigosDeLista.has(codigo)) throw new ErrorDeDecisiones(`El código ${codigo} no está en la lista.`);
    const dueno = productosConCodigo.get(codigo);
    if (dueno !== undefined && String(dueno) !== productoId) {
      throw new ErrorDeDecisiones(`El código ${codigo} ya pertenece a otro producto.`);
    }
    const otro = elegidos.get(codigo);
    if (otro && otro !== productoId) {
      throw new ErrorDeDecisiones(`El código ${codigo} está elegido para dos productos distintos.`);
    }
    elegidos.set(codigo, productoId);
  }
  for (const [codigo, precio] of Object.entries(decisiones.conflictos)) {
    const conflicto = analisis.conflictos.find((candidato) => candidato.codigo === codigo);
    if (!conflicto) throw new ErrorDeDecisiones(`El código ${codigo} no tiene conflicto de precios.`);
    if (precio !== null && !conflicto.precios.includes(precio)) {
      throw new ErrorDeDecisiones(`El precio elegido para ${codigo} no está entre los de la lista.`);
    }
  }
};

type Entrada = { payload: Payload; analisis: Analisis; decisiones: Decisiones; alAvanzar?: (hechas: number, total: number) => Promise<void> | void };

export const aplicarLista = async ({ payload, analisis, decisiones, alAvanzar }: Entrada): Promise<ResultadoDeAplicar> => {
  const contexto = { [SIN_PUBLICAR]: true };
  const resultado: ResultadoDeAplicar = {
    vinculados: 0,
    preciosActualizados: 0,
    creados: 0,
    categoriasCreadas: 0,
    noDisponibles: 0,
    ignorados: 0,
    errores: [],
  };
  const fallo = (donde: string, error: unknown) => {
    if (resultado.errores.length < MAXIMO_ERRORES) {
      resultado.errores.push(`${donde}: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const { docs: productos } = await payload.find({ collection: "productos", pagination: false, depth: 0, overrideAccess: true });
  const porCodigo = new Map(productos.flatMap((producto) => (producto.codigo ? [[producto.codigo, producto] as const] : [])));
  const slugsEnUso = new Set(productos.map((producto) => producto.slug));

  // Filas de la lista por código; los conflictos entran con el precio elegido.
  const filas = new Map(analisis.filas.map((fila) => [fila.c, fila]));
  for (const conflicto of analisis.conflictos) {
    const elegido = decisiones.conflictos[conflicto.codigo];
    if (elegido != null) filas.set(conflicto.codigo, { c: conflicto.codigo, a: conflicto.articulo, m: "", p: elegido });
  }

  const vinculoDeProducto = new Map(
    Object.entries(decisiones.vinculos).flatMap(([id, codigo]) => (codigo ? [[Number(id), codigo] as const] : [])),
  );
  const codigosVinculados = new Set(vinculoDeProducto.values());
  const noActualizar = new Set(decisiones.noActualizarPrecios);

  // Un código con precios distintos al que se le eligió precio y todavía no
  // existe en la web se crea como producto nuevo, igual que el resto.
  const deConflictos = analisis.conflictos.flatMap((conflicto) => {
    const precio = decisiones.conflictos[conflicto.codigo];
    if (precio == null || porCodigo.has(conflicto.codigo)) return [];
    const producto = productoDeFila({ codigo: conflicto.codigo, articulo: conflicto.articulo, marca: "", precio });
    return [{ ...producto, articulo: conflicto.articulo }];
  });
  const candidatosNuevos = [...analisis.nuevos, ...deConflictos];

  const total = productos.length + candidatosNuevos.length + decisiones.noDisponibles.length;
  let hechas = 0;
  const avanzar = async () => {
    hechas += 1;
    if (alAvanzar && hechas % 25 === 0) await alAvanzar(hechas, total);
  };

  // 1) Vincular y actualizar precios de lo que ya está en la web.
  for (const producto of productos) {
    const codigoNuevo = vinculoDeProducto.get(producto.id);
    const codigo = producto.codigo ?? codigoNuevo;
    const fila = codigo ? filas.get(codigo) : undefined;
    if (!codigo || !fila) {
      await avanzar();
      continue;
    }
    const datos: Record<string, unknown> = {};
    if (codigoNuevo && !producto.codigo) {
      datos.codigo = codigoNuevo;
      // El producto recién vinculado adopta granel/empaquetado si las reglas lo
      // proponen granel; lo ya elegido a mano como granel no se toca.
      if ((producto.venta ?? "empaquetado") === "empaquetado") {
        const propuesto = productoDeFila({ codigo, articulo: fila.a, marca: fila.m, precio: fila.p });
        if (propuesto.venta === "granel") {
          datos.venta = "granel";
          datos.unidadGranel = propuesto.unidad;
        }
      }
    }
    const cambiaPrecio = producto.precio !== fila.p && (codigoNuevo || !noActualizar.has(producto.id));
    if (cambiaPrecio) datos.precio = fila.p;
    if (Object.keys(datos).length > 0) {
      try {
        await payload.update({ collection: "productos", id: producto.id, data: datos, overrideAccess: true, context: contexto });
        if (datos.codigo) resultado.vinculados += 1;
        if (datos.precio !== undefined) resultado.preciosActualizados += 1;
      } catch (error) {
        fallo(`Actualizar «${producto.nombre}»`, error);
      }
    }
    await avanzar();
  }

  // 2) Categorías que faltan.
  const { docs: categorias } = await payload.find({ collection: "categorias", pagination: false, depth: 0, overrideAccess: true });
  const categoriaPorSlug = new Map(categorias.map((categoria) => [categoria.slug, categoria.id]));
  let orden = categorias.reduce((maximo, categoria) => Math.max(maximo, categoria.orden ?? 0), 0);
  const aCrear = candidatosNuevos.filter((nuevo) => !decisiones.noCrear.includes(nuevo.codigo));
  const slugsNecesarios = new Set(aCrear.map((nuevo) => decisiones.cambios[nuevo.codigo]?.categoria ?? nuevo.categoria));
  for (const slug of slugsNecesarios) {
    if (categoriaPorSlug.has(slug)) continue;
    const base = CATEGORIAS_BASE.find((categoria) => categoria.slug === slug);
    try {
      orden += 1;
      const creada = await payload.create({
        collection: "categorias",
        data: { nombre: base?.nombre ?? slug, slug, orden },
        overrideAccess: true,
        context: contexto,
      });
      categoriaPorSlug.set(slug, creada.id);
      resultado.categoriasCreadas += 1;
    } catch (error) {
      fallo(`Crear la categoría ${slug}`, error);
    }
  }

  // 3) Productos nuevos (menos los que se vincularon con uno existente).
  const slugLibre = (candidatos: string[]): string => {
    for (const candidato of candidatos) {
      const slug = aSlug(candidato);
      if (slug && !slugsEnUso.has(slug)) return slug;
    }
    return aSlug(candidatos[candidatos.length - 1] ?? "producto");
  };
  for (const nuevo of aCrear) {
    if (porCodigo.has(nuevo.codigo) || codigosVinculados.has(nuevo.codigo)) {
      await avanzar();
      continue;
    }
    const ajuste = decisiones.cambios[nuevo.codigo] ?? {};
    const categoria = categoriaPorSlug.get(ajuste.categoria ?? nuevo.categoria);
    const nombre = ajuste.nombre?.trim() || nuevo.nombre;
    const venta = ajuste.venta ?? nuevo.venta;
    if (!categoria) {
      fallo(`Crear «${nombre}»`, new Error("no se pudo resolver la categoría"));
      await avanzar();
      continue;
    }
    const slug = slugLibre([
      nombre,
      `${nombre} ${nuevo.presentacion}`,
      `${nombre} ${nuevo.marca} ${nuevo.presentacion}`,
      `${nombre} ${nuevo.codigo}`,
    ]);
    try {
      await payload.create({
        collection: "productos",
        data: {
          nombre,
          slug,
          marca: nuevo.marca || undefined,
          presentacion: venta === "granel" ? undefined : nuevo.presentacion || undefined,
          categoria,
          precio: nuevo.precio,
          venta,
          unidadGranel: venta === "granel" ? (ajuste.unidad ?? nuevo.unidad) : undefined,
          codigo: nuevo.codigo,
          disponible: true,
          publicado: true,
        },
        overrideAccess: true,
        context: contexto,
      });
      slugsEnUso.add(slug);
      resultado.creados += 1;
    } catch (error) {
      fallo(`Crear «${nombre}»`, error);
    }
    await avanzar();
  }

  // 4) Productos que ya no están en la lista.
  for (const id of decisiones.noDisponibles) {
    try {
      await payload.update({ collection: "productos", id, data: { disponible: false }, overrideAccess: true, context: contexto });
      resultado.noDisponibles += 1;
    } catch (error) {
      fallo(`Marcar no disponible el producto ${id}`, error);
    }
    await avanzar();
  }

  // 5) Lo que se destildó al revisar no vuelve a aparecer en próximas listas.
  const fecha = analisis.archivo.fecha ?? "sin fecha";
  for (const nuevo of analisis.nuevos.filter((candidato) => decisiones.noCrear.includes(candidato.codigo))) {
    try {
      await payload.create({
        collection: "ignorados",
        data: { codigo: nuevo.codigo, articulo: nuevo.articulo, motivo: `Descartado al revisar la lista del ${fecha}` },
        overrideAccess: true,
        context: contexto,
      });
      resultado.ignorados += 1;
    } catch {
      // Ya estaba en la lista de ignorados: no pasa nada.
    }
  }

  // Un solo aviso a GitHub para todo lo que se acaba de cambiar.
  if (resultado.vinculados + resultado.preciosActualizados + resultado.creados + resultado.noDisponibles + resultado.categoriasCreadas > 0) {
    programarPublicacion();
  }
  return resultado;
};
