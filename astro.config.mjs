// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Necesario para el sitemap y las URLs canónicas/OG absolutas.
  site: 'https://coworkers.cl',
  integrations: [
    // Las páginas legales quedan fuera del sitemap mientras su contenido sea provisional.
    // Al publicar el texto definitivo, borrar el filtro y el noindex de cada página.
    sitemap({ filter: (page) => !/\/(privacidad|terminos)\/?$/.test(page) }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
