// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // Necesario para el sitemap y las URLs canónicas/OG absolutas.
  site: "https://coworkers.cl",
  integrations: [
    // Fuera del sitemap: /terminos mientras su contenido sea provisional (al publicar el texto
    // definitivo, sacarlo de aquí y quitarle el noindex) y /gracias, que es un acuse de recibo.
    sitemap({ filter: (page) => !/\/(terminos|gracias)\/?$/.test(page) }),
  ],
  // El sitio sigue siendo estático. El adaptador existe solo por /api/contacto, que es la única
  // ruta con prerender = false; todo lo demás se sigue sirviendo como HTML generado en el build.
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
