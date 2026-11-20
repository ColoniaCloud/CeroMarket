// Carga el contenido inicial (admin/semilla/) en una base VACÍA: categorías,
// productos, notas, fotos y datos del local. Para una base nueva, por ejemplo
// en desarrollo:
//
//   npm run payload migrate
//   npm run semilla
//
// En producción ya se cargó el 2026-11-20; si hay productos, no hace nada.
import { getPayload } from "payload";
import config from "../payload.config";
import { cargarContenidoInicial } from "../lib/semilla";

const payload = await getPayload({ config });
await cargarContenidoInicial(payload);
process.exit(0);
