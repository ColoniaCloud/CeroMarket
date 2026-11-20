import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`productos\` ADD \`venta\` text DEFAULT 'empaquetado' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`productos\` ADD \`unidad_granel\` text DEFAULT 'kilo';`)
  await db.run(sql`ALTER TABLE \`productos\` ADD \`codigo\` text;`)
  await db.run(sql`ALTER TABLE \`productos\` ADD \`publicado\` integer DEFAULT true;`)
  await db.run(sql`CREATE UNIQUE INDEX \`productos_codigo_idx\` ON \`productos\` (\`codigo\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`productos_codigo_idx\`;`)
  await db.run(sql`ALTER TABLE \`productos\` DROP COLUMN \`venta\`;`)
  await db.run(sql`ALTER TABLE \`productos\` DROP COLUMN \`unidad_granel\`;`)
  await db.run(sql`ALTER TABLE \`productos\` DROP COLUMN \`codigo\`;`)
  await db.run(sql`ALTER TABLE \`productos\` DROP COLUMN \`publicado\`;`)
}
