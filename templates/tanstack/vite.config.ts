import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	resolve: {
		alias: {
			// cross-fetch bundles node-fetch which breaks Bun/Cloudflare Workers.
			// Redirect to the browser build which uses globalThis.fetch instead.
			"cross-fetch": "cross-fetch/dist/browser-ponyfill.js",
		},
	},
	plugins: [
		devtools(),
		// nitro({ rollupConfig: { external: [/^@sentry\//] } }),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		tanstackStart(),
		viteReact({
			babel: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
	],
});

export default config;
