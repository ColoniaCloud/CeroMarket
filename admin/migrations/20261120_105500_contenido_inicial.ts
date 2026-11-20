import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-sqlite";
import { cargarContenidoInicial } from "../lib/semilla";

// Pasa al panel los productos, posts, fotos y datos del local que vivían en
// el repo del sitio. Ver lib/semilla.ts.
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await cargarContenidoInicial(payload, req);
}

// No se deshace: borrar el catálogo entero no es algo que tenga que pasar
// por una migración.
export async function down(_args: MigrateDownArgs): Promise<void> {}
