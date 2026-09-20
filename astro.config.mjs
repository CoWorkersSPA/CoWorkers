// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Necesario para el sitemap y las URLs canónicas/OG absolutas.
  site: 'https://coworkers.cl',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
