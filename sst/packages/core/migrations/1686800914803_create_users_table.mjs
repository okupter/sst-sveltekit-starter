// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Kysely } from 'kysely';

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
	await db.schema
		.createTable('users')
		.addColumn('id', 'text', (col) => col.primaryKey())
		.addColumn('email', 'text', (col) => col.notNull())
		.addColumn('picture', 'text')
		.addColumn('first_name', 'text')
		.addColumn('last_name', 'text')
		.execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
	await db.schema.dropTable('users').execute();
}
