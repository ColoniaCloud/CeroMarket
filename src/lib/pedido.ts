// Pedido del cliente: vive en el navegador (localStorage) y no sale de su
// dispositivo hasta que él mismo manda el mensaje por WhatsApp. Este módulo
// corre solo en el navegador; el armado del mensaje es puro y no toca el DOM.
import {
  formatearCantidad,
  normalizarGranel,
  precioDeGranel,
  type Unidad,
  type Venta,
} from "./granel";
import { detalleDeProducto, formatearPrecio } from "./texto";

export type Linea = { id: string; cantidad: number };

// Lo que publica /catalogo.json en cada build (ver pages/catalogo.json.ts).
export type ProductoDelCatalogo = {
  id: string;
  nombre: string;
  marca: string;
  presentacion: string;
  precio: number | null;
  disponible: boolean;
  venta: Venta;
  unidad: Unidad;
  url: string;
  imagen: string | null;
};

export type Entrega = { nombre: string; modo: "retiro" | "envio"; direccion: string; notas: string };

export type LineaCompleta = { producto: ProductoDelCatalogo; cantidad: number };

// Máximo de unidades de un producto empaquetado; el granel tiene el suyo (en g o ml).
export const CANTIDAD_MAXIMA = 99;
export const EVENTO_CAMBIO = "pedido:cambio";
const CLAVE = "cero-pedido";

const esLinea = (valor: unknown): valor is Linea => {
  if (typeof valor !== "object" || valor === null) return false;
  const { id, cantidad } = valor as Record<string, unknown>;
  return typeof id === "string" && Number.isInteger(cantidad) && (cantidad as number) > 0;
};

// Si el navegador bloquea el almacenamiento (modo privado estricto), el
// pedido se arma igual en esta página, aunque no sobreviva a la navegación.
let enMemoria: Linea[] = [];

export const leerPedido = (): Linea[] => {
  try {
    const guardado: unknown = JSON.parse(localStorage.getItem(CLAVE) ?? "[]");
    return Array.isArray(guardado) ? guardado.filter(esLinea) : [];
  } catch {
    return enMemoria;
  }
};

const guardarPedido = (lineas: Linea[]) => {
  enMemoria = lineas;
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lineas));
  } catch {
    // Sin almacenamiento: queda en memoria.
  }
  window.dispatchEvent(new CustomEvent(EVENTO_CAMBIO));
};

const acotar = (cantidad: number, maximo: number): number => Math.min(maximo, Math.max(0, Math.round(cantidad)));

// Para un producto a granel la cantidad va en gramos (o ml) y el máximo es
// MAXIMO_GRANEL; para uno empaquetado son unidades.
export const cambiarCantidad = (id: string, cantidad: number, maximo = CANTIDAD_MAXIMA) => {
  const nueva = acotar(cantidad, maximo);
  const lineas = leerPedido();
  if (nueva === 0) return guardarPedido(lineas.filter((linea) => linea.id !== id));
  const existe = lineas.some((linea) => linea.id === id);
  // Mantiene el orden en que se fueron agregando.
  guardarPedido(
    existe
      ? lineas.map((linea) => (linea.id === id ? { id, cantidad: nueva } : linea))
      : [...lineas, { id, cantidad: nueva }],
  );
};

export const agregarAlPedido = (id: string, cantidad = 1, maximo = CANTIDAD_MAXIMA) => {
  const actual = leerPedido().find((linea) => linea.id === id)?.cantidad ?? 0;
  cambiarCantidad(id, actual + cantidad, maximo);
};

export const vaciarPedido = () => guardarPedido([]);

// Cuántos productos distintos hay en el pedido (no se pueden sumar unidades
// con gramos).
export const contarProductos = (lineas: Linea[] = leerPedido()): number => lineas.length;

// Avisa de cambios hechos en esta pestaña y en otras.
export const escucharCambios = (alCambiar: () => void) => {
  window.addEventListener(EVENTO_CAMBIO, alCambiar);
  window.addEventListener("storage", (evento) => {
    if (evento.key === CLAVE) alCambiar();
  });
};

// Lo que cuesta una línea: por unidad, o por peso si es a granel.
export const precioDeLinea = ({ producto, cantidad }: LineaCompleta): number | null => {
  if (producto.precio == null) return null;
  return producto.venta === "granel" ? precioDeGranel(producto.precio, cantidad) : producto.precio * cantidad;
};

// Una línea guardada antes de que el producto pasara a granel (o al revés)
// puede traer una cantidad que ya no tiene sentido: se corrige acá.
export const cantidadValida = (producto: ProductoDelCatalogo, cantidad: number): number =>
  producto.venta === "granel" ? normalizarGranel(cantidad) : Math.min(CANTIDAD_MAXIMA, Math.max(1, cantidad));

export const tieneGranel = (lineas: LineaCompleta[]): boolean =>
  lineas.some(({ producto }) => producto.venta === "granel");

export const totalConPrecio = (lineas: LineaCompleta[]): number =>
  lineas.reduce((total, linea) => total + (precioDeLinea(linea) ?? 0), 0);

export const todasTienenPrecio = (lineas: LineaCompleta[]): boolean =>
  lineas.every(({ producto }) => producto.precio != null);

// "250 g" para el granel, "2" para lo empaquetado.
export const textoDeCantidad = ({ producto, cantidad }: LineaCompleta): string =>
  producto.venta === "granel" ? formatearCantidad(cantidad, producto.unidad) : String(cantidad);

// El mensaje que el cliente manda al local desde su propio WhatsApp, con
// el formato de WhatsApp (*negrita*).
export const armarMensaje = (lineas: LineaCompleta[], entrega: Entrega): string => {
  const renglones = lineas.map((linea) => {
    const { producto, cantidad } = linea;
    const detalle = detalleDeProducto(producto.marca, producto.presentacion);
    const importe = precioDeLinea(linea);
    const precio = importe == null ? "" : ` - ${formatearPrecio(importe)}`;
    const nombre = `${producto.nombre}${detalle ? ` (${detalle})` : ""}`;
    return producto.venta === "granel"
      ? `- ${formatearCantidad(cantidad, producto.unidad)} de ${nombre}${precio}`
      : `- ${cantidad} x ${nombre}${precio}`;
  });

  const estimado = tieneGranel(lineas);
  const conPrecio = lineas.filter(({ producto }) => producto.precio != null);
  let total = "¿Me confirman precios y disponibilidad?";
  if (conPrecio.length === lineas.length)
    total = `*Total${estimado ? " estimado" : ""}: ${formatearPrecio(totalConPrecio(lineas))}*`;
  else if (conPrecio.length > 0)
    total = `Subtotal de lo que tiene precio: ${formatearPrecio(totalConPrecio(conPrecio))}. El resto me lo confirman.`;
  if (estimado) total += "\nLo que es a granel se pesa en el local: el importe puede variar un poco.";

  const datos = [
    `*Nombre:* ${entrega.nombre}`,
    `*Entrega:* ${entrega.modo === "envio" ? "Envío a domicilio" : "Retiro en el local"}`,
    ...(entrega.modo === "envio" && entrega.direccion ? [`*Dirección:* ${entrega.direccion}`] : []),
    ...(entrega.notas ? [`*Notas:* ${entrega.notas}`] : []),
  ];

  return ["¡Hola! Quiero hacer este pedido desde la web:", renglones.join("\n"), total, datos.join("\n")].join("\n\n");
};
