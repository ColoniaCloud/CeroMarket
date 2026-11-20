import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`importaciones\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`estado\` text DEFAULT 'pendiente',
  	\`lista\` text,
  	\`progreso\` numeric DEFAULT 0,
  	\`analisis\` text,
  	\`resultado\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`importaciones_updated_at_idx\` ON \`importaciones\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`importaciones_created_at_idx\` ON \`importaciones\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`importaciones_filename_idx\` ON \`importaciones\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`ignorados\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`codigo\` text NOT NULL,
  	\`articulo\` text,
  	\`motivo\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ignorados_codigo_idx\` ON \`ignorados\` (\`codigo\`);`)
  await db.run(sql`CREATE INDEX \`ignorados_updated_at_idx\` ON \`ignorados\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`ignorados_created_at_idx\` ON \`ignorados\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`importaciones_id\` integer REFERENCES importaciones(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`ignorados_id\` integer REFERENCES ignorados(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_importaciones_id_idx\` ON \`payload_locked_documents_rels\` (\`importaciones_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_ignorados_id_idx\` ON \`payload_locked_documents_rels\` (\`ignorados_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`importaciones\`;`)
  await db.run(sql`DROP TABLE \`ignorados\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`productos_id\` integer,
  	\`categorias_id\` integer,
  	\`posts_id\` integer,
  	\`medios_id\` integer,
  	\`usuarios_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`productos_id\`) REFERENCES \`productos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categorias_id\`) REFERENCES \`categorias\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`medios_id\`) REFERENCES \`medios\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`usuarios_id\`) REFERENCES \`usuarios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "productos_id", "categorias_id", "posts_id", "medios_id", "usuarios_id") SELECT "id", "order", "parent_id", "path", "productos_id", "categorias_id", "posts_id", "medios_id", "usuarios_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_productos_id_idx\` ON \`payload_locked_documents_rels\` (\`productos_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categorias_id_idx\` ON \`payload_locked_documents_rels\` (\`categorias_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_medios_id_idx\` ON \`payload_locked_documents_rels\` (\`medios_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_usuarios_id_idx\` ON \`payload_locked_documents_rels\` (\`usuarios_id\`);`)
}
