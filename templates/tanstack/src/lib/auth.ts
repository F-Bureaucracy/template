import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
	baseURL: "http://127.0.0.1:3000",
	emailAndPassword: {
		enabled: true,
	},
	plugins: [tanstackStartCookies()],
});
