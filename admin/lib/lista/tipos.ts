// Una fila de la lista de precios del CRM: código, artículo, marca y precio
// de contado. El precio ya viene como número (1.390,00 -> 1390).
export type FilaLista = {
  codigo: string;
  articulo: string;
  marca: string;
  precio: number;
};

export type ListaLeida = {
  filas: FilaLista[];
  // "Principal", "Pesos Uruguayos" y la fecha del pie ("03/09/2026 11:21").
  lista: string;
  moneda: string;
  fecha: string | null;
  paginas: number;
  // Filas que se salteó porque no pudo leerlas (precio ilegible, sin nombre).
  advertencias: string[];
};

// Un problema del archivo que se le explica a la persona que lo subió.
export class ErrorDeLista extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "ErrorDeLista";
  }
}
