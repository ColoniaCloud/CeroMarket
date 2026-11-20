import path from "node:path";
import { pathToFileURL } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { es } from "@payloadcms/translations/languages/es";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Categorias } from "./collections/Categorias";
import { Ignorados } from "./collections/Ignorados";
import { Importaciones } from "./collections/Importaciones";
import { Medios } from "./collections/Medios";
import { Posts } from "./collections/Posts";
import { Productos } from "./collections/Productos";
import { Resenas } from "./collections/Resenas";
import { Usuarios } from "./collections/Usuarios";
import { Ajustes } from "./globals/Ajustes";
import { directorioDeDatos, secretoDelPanel } from "./lib/datos";
import { migrations } from "./migrations";

export default buildConfig({
  admin: {
    user: Usuarios.slug,
    // Siempre claro: es el modo de la marca (blanco, menta y pizarra).
    theme: "light",
    meta: {
      titleSuffix: " · CERO Market",
      icons: [{ rel: "icon", type: "image/png", url: "/favicon.png" }],
    },
    components: {
      graphics: {
        Logo: "/components/Logo#Logo",
        Icon: "/components/Icono#Icono",
      },
    },
  },
  i18n: { supportedLanguages: { es }, fallbackLanguage: "es" },
  collections: [Productos, Categorias, Importaciones, Posts, Resenas, Medios, Usuarios, Ignorados],
  globals: [Ajustes],
  db: sqliteAdapter({
    // Las migraciones son la única fuente de verdad del esquema, también en
    // desarrollo: sin esto `next dev` empuja cambios solo y después `migrate`
    // pide confirmar una pérdida de datos.
    push: false,
    client: { url: pathToFileURL(path.join(directorioDeDatos, "payload.sqlite")).href },
    migrationDir: path.join(process.cwd(), "migrations"),
    prodMigrations: migrations,
  }),
  editor: lexicalEditor(),
  secret: secretoDelPanel,
  sharp,
  typescript: { outputFile: path.resolve("payload-types.ts") },
});
