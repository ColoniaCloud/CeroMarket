import path from "node:path";
import { pathToFileURL } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { es } from "@payloadcms/translations/languages/es";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Categorias } from "./collections/Categorias";
import { Medios } from "./collections/Medios";
import { Posts } from "./collections/Posts";
import { Productos } from "./collections/Productos";
import { Usuarios } from "./collections/Usuarios";
import { Ajustes } from "./globals/Ajustes";
import { directorioDeDatos, secretoDelPanel } from "./lib/datos";
import { migrations } from "./migrations";

export default buildConfig({
  admin: {
    user: Usuarios.slug,
    meta: { titleSuffix: " · CERO Market" },
  },
  i18n: { supportedLanguages: { es }, fallbackLanguage: "es" },
  collections: [Productos, Categorias, Posts, Medios, Usuarios],
  globals: [Ajustes],
  db: sqliteAdapter({
    client: { url: pathToFileURL(path.join(directorioDeDatos, "payload.sqlite")).href },
    migrationDir: path.join(process.cwd(), "migrations"),
    prodMigrations: migrations,
  }),
  editor: lexicalEditor(),
  secret: secretoDelPanel,
  sharp,
  typescript: { outputFile: path.resolve("payload-types.ts") },
});
