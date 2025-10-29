import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { sveltePhosphorOptimize } from "phosphor-svelte/vite";

export default defineConfig({
    plugins: [tailwindcss(), sveltekit(), sveltePhosphorOptimize()]
});
