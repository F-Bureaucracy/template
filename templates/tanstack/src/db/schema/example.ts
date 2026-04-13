// import { sql } from "drizzle-orm";
// import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// export const todos = sqliteTable("todos", {
// 	// SQLite uses integer primary keys for auto-incrementing IDs
// 	id: integer("id").primaryKey({ autoIncrement: true }),
// 	title: text("title").notNull(),
// 	// SQLite handles timestamps usually as integers (unix) or strings
// 	createdAt: integer("created_at", { mode: "timestamp" }).default(
// 		sql`(unixepoch())`,
// 	),
// });
