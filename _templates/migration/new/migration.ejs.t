---
to: sst/packages/core/migrations/<%= Date.now() %>_<%= name.replace(/\s/g, "_") %>.mjs
---
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
}
