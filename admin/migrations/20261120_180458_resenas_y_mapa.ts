import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`resenas\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`autor\` text NOT NULL,
  	\`estrellas\` numeric NOT NULL,
  	\`cuando\` text,
  	\`texto\` text NOT NULL,
  	\`enlace\` text,
  	\`publicada\` integer DEFAULT true,
  	\`origen\` text DEFAULT 'manual',
  	\`id_google\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`resenas_id_google_idx\` ON \`resenas\` (\`id_google\`);`)
  await db.run(sql`CREATE INDEX \`resenas_updated_at_idx\` ON \`resenas\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`resenas_created_at_idx\` ON \`resenas\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`resenas_id\` integer REFERENCES resenas(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_resenas_id_idx\` ON \`payload_locked_documents_rels\` (\`resenas_id\`);`)
  await db.run(sql`ALTER TABLE \`ajustes\` ADD \`mapa_incrustado\` text;`)
  await db.run(sql`ALTER TABLE \`ajustes\` ADD \`puntaje_google\` numeric;`)
  await db.run(sql`ALTER TABLE \`ajustes\` ADD \`total_resenas_google\` numeric;`)
  await db.run(sql`ALTER TABLE \`ajustes\` ADD \`google_place_id\` text;`)
  // Datos del perfil de CERO Market en Google Maps al 2026-11-20 (4,8 con 123
  // reseñas). Se editan en «Datos del local» y «Sincronizar con Google» los
  // actualiza. Sin fila de ajustes (base nueva) no hace nada: ahí los carga
  // la semilla.
  await db.run(sql`UPDATE \`ajustes\` SET \`mapa_incrustado\` = 'https://www.google.com/maps?cid=3435888497562594688&output=embed&hl=es', \`puntaje_google\` = 4.8, \`total_resenas_google\` = 123`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`resenas\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`productos_id\` integer,
  	\`categorias_id\` integer,
  	\`importaciones_id\` integer,
  	\`posts_id\` integer,
  	\`medios_id\` integer,
  	\`usuarios_id\` integer,
  	\`ignorados_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`productos_id\`) REFERENCES \`productos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categorias_id\`) REFERENCES \`categorias\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`importaciones_id\`) REFERENCES \`importaciones\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`medios_id\`) REFERENCES \`medios\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`usuarios_id\`) REFERENCES \`usuarios\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ignorados_id\`) REFERENCES \`ignorados\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "productos_id", "categorias_id", "importaciones_id", "posts_id", "medios_id", "usuarios_id", "ignorados_id") SELECT "id", "order", "parent_id", "path", "productos_id", "categorias_id", "importaciones_id", "posts_id", "medios_id", "usuarios_id", "ignorados_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_productos_id_idx\` ON \`payload_locked_documents_rels\` (\`productos_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categorias_id_idx\` ON \`payload_locked_documents_rels\` (\`categorias_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_importaciones_id_idx\` ON \`payload_locked_documents_rels\` (\`importaciones_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_medios_id_idx\` ON \`payload_locked_documents_rels\` (\`medios_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_usuarios_id_idx\` ON \`payload_locked_documents_rels\` (\`usuarios_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_ignorados_id_idx\` ON \`payload_locked_documents_rels\` (\`ignorados_id\`);`)
  await db.run(sql`ALTER TABLE \`ajustes\` DROP COLUMN \`mapa_incrustado\`;`)
  await db.run(sql`ALTER TABLE \`ajustes\` DROP COLUMN \`puntaje_google\`;`)
  await db.run(sql`ALTER TABLE \`ajustes\` DROP COLUMN \`total_resenas_google\`;`)
  await db.run(sql`ALTER TABLE \`ajustes\` DROP COLUMN \`google_place_id\`;`)
}
