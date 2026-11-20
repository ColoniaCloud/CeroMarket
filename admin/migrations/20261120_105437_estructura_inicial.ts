import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`productos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nombre\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`marca\` text,
  	\`presentacion\` text,
  	\`categoria_id\` integer NOT NULL,
  	\`precio\` numeric,
  	\`descripcion\` text,
  	\`imagen_id\` integer,
  	\`disponible\` integer DEFAULT true,
  	\`destacado\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`categoria_id\`) REFERENCES \`categorias\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`imagen_id\`) REFERENCES \`medios\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`productos_slug_idx\` ON \`productos\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`productos_categoria_idx\` ON \`productos\` (\`categoria_id\`);`)
  await db.run(sql`CREATE INDEX \`productos_imagen_idx\` ON \`productos\` (\`imagen_id\`);`)
  await db.run(sql`CREATE INDEX \`productos_updated_at_idx\` ON \`productos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`productos_created_at_idx\` ON \`productos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`productos_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`medios_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`productos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`medios_id\`) REFERENCES \`medios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`productos_rels_order_idx\` ON \`productos_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`productos_rels_parent_idx\` ON \`productos_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`productos_rels_path_idx\` ON \`productos_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`productos_rels_medios_id_idx\` ON \`productos_rels\` (\`medios_id\`);`)
  await db.run(sql`CREATE TABLE \`categorias\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nombre\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`orden\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categorias_slug_idx\` ON \`categorias\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categorias_updated_at_idx\` ON \`categorias\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categorias_created_at_idx\` ON \`categorias\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titulo\` text,
  	\`slug\` text,
  	\`tipo\` text DEFAULT 'nota',
  	\`fecha\` text,
  	\`bajada\` text,
  	\`portada_id\` integer,
  	\`contenido\` text,
  	\`contenido_h_t_m_l\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`portada_id\`) REFERENCES \`medios\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_portada_idx\` ON \`posts\` (\`portada_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_titulo\` text,
  	\`version_slug\` text,
  	\`version_tipo\` text DEFAULT 'nota',
  	\`version_fecha\` text,
  	\`version_bajada\` text,
  	\`version_portada_id\` integer,
  	\`version_contenido\` text,
  	\`version_contenido_h_t_m_l\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_portada_id\`) REFERENCES \`medios\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_portada_idx\` ON \`_posts_v\` (\`version_portada_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`medios\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
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
  	\`focal_y\` numeric,
  	\`sizes_miniatura_url\` text,
  	\`sizes_miniatura_width\` numeric,
  	\`sizes_miniatura_height\` numeric,
  	\`sizes_miniatura_mime_type\` text,
  	\`sizes_miniatura_filesize\` numeric,
  	\`sizes_miniatura_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`medios_updated_at_idx\` ON \`medios\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`medios_created_at_idx\` ON \`medios\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`medios_filename_idx\` ON \`medios\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`medios_sizes_miniatura_sizes_miniatura_filename_idx\` ON \`medios\` (\`sizes_miniatura_filename\`);`)
  await db.run(sql`CREATE TABLE \`usuarios_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`usuarios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`usuarios_sessions_order_idx\` ON \`usuarios_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`usuarios_sessions_parent_id_idx\` ON \`usuarios_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`usuarios\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nombre\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`usuarios_updated_at_idx\` ON \`usuarios\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`usuarios_created_at_idx\` ON \`usuarios\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`usuarios_email_idx\` ON \`usuarios\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_productos_id_idx\` ON \`payload_locked_documents_rels\` (\`productos_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categorias_id_idx\` ON \`payload_locked_documents_rels\` (\`categorias_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_medios_id_idx\` ON \`payload_locked_documents_rels\` (\`medios_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_usuarios_id_idx\` ON \`payload_locked_documents_rels\` (\`usuarios_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`usuarios_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`usuarios_id\`) REFERENCES \`usuarios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_usuarios_id_idx\` ON \`payload_preferences_rels\` (\`usuarios_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ajustes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`whatsapp\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`direccion\` text NOT NULL,
  	\`horario\` text NOT NULL,
  	\`mapa\` text NOT NULL,
  	\`instagram\` text NOT NULL,
  	\`facebook\` text NOT NULL,
  	\`envios\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`productos\`;`)
  await db.run(sql`DROP TABLE \`productos_rels\`;`)
  await db.run(sql`DROP TABLE \`categorias\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`medios\`;`)
  await db.run(sql`DROP TABLE \`usuarios_sessions\`;`)
  await db.run(sql`DROP TABLE \`usuarios\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`ajustes\`;`)
}
