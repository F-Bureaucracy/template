import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "#/db";
import { env } from "#/env";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite", // or "mysql", "pg"
	}),
	baseURL: env.BETTER_AUTH_URL,
	emailAndPassword: {
		enabled: true,
	},
	plugins: [tanstackStartCookies(), admin()],
});
