# AGENTS.md

## Contexto del proyecto

Landing corporativa de **Coworkers.cl**, una empresa de software para pymes con sede en Concepción, Chile, construida con talento universitario. Tiene dos capas: **Coworkers.cl** (servicios: desarrollo a medida, automatizaciones, infraestructura; talento y reclutamiento) y **Mesón, de Coworkers.cl** (la línea de soluciones para pymes: Datos, Cobros, cotizaciones). El equipo son cinco socios de Ingeniería en Informática de la UTFSM y estudiantes de Concepción a los que forman, revisan y pagan por entrega.

Este repositorio contiene únicamente la landing pública: presenta las dos puertas, explica cómo trabajan e invita a agendar una reunión inicial sin costo. No es la plataforma del producto ni la página de Mesón.

**Fuente de verdad del contenido**: `docs/MENSAJES.md` (marco de mensajes), derivado de *Estrategia de marca - Coworkers.cl y Mesón* e *Investigación de mercado - Módulos y servicios Mesón* (ambos del 19 de septiembre de 2026). El mockup antiguo (`UI_mockups_para_Coworkers_cl.pdf`) queda deprecado para el copy; solo sirve como referencia visual. Cualquier cambio de copy debe respetar `docs/MENSAJES.md`, en especial la sección "Lo que no se dice".

## Stack

- **Astro** — generador de sitios estáticos
- **Docker** — entorno de desarrollo y build, el proyecto corre exclusivamente vía Docker (`docker compose up --build -d`)

## Arquitectura de componentes

```
src/components/
├── layout/       → Header, Footer (envuelven toda la página, se usan una sola vez)
├── sections/     → un componente por bloque de contenido de la landing, sin props,
│                   ensamblados en orden dentro de index.astro
└── ui/           → piezas reutilizables con props (Button, Eyebrow, Wordmark)
```

Cada sección lleva sus textos como arrays en el frontmatter y sus estilos en un `<style>` propio; los tokens (colores, tipografía, radios, contenedor) viven en `src/styles/global.css` y se consumen con `var(--…)`. No hardcodear un hex ni un font-family que ya exista como token.

Orden de secciones en `index.astro`, de arriba a abajo:

1. `Hero` — titular rotativo "Tu proyecto…" + el problema (cobrar, cumplir, ordenar), foto a la derecha
2. `PainFacts` — "Nos llaman cuando": 1 de diciembre y 40 días, con fuente, sobre la banda índigo
3. `TwoDoors` — servicios de Coworkers.cl (lista con reglas) + tarjeta de Mesón con foto
4. `HowWeWork` — "Cuatro pasos. Ningún manual.", cuatro pasos sobre una línea
5. `Guarantees` — "Lo que puedes exigirnos": los cuatro pilares en 2×2
6. `Team` — historia corta sobre foto a sangre (la puerta para estudiantes está comentada hasta que se abra el reclutamiento)
7. `FinalCta` — "Cuéntanos cómo funciona hoy tu operación"

## Dirección de diseño

Sistema **Nocturne** (`UI Palette Coworkers.cl.pdf`), tema oscuro fijo: es el tema de la marca corporativa según el brief de identidad (estrategia, sección 06). No hay modo claro ni toggle.

- Fondo `#161826`, texto `#e9e9ed`, un solo acento blurple `#9184d9` usado como línea, marca y resplandor, nunca como relleno grande. Rampas neutra y de acento 100–900 en `global.css`.
- Una sola banda saturada por página (`#262a60`, la de "Nos llaman cuando"). El resto de los fondos se mantiene desaturado.
- Inter, peso 500 en títulos; la jerarquía es por tamaño y espacio, no por peso.
- Botones de contorno (borde en acento), nunca rellenos. Radio 8px en botones, 14px en imágenes; nada más redondeado.
- Reglas que se desvanecen en los extremos (`.rule`) en vez de líneas que cortan.
- Layouts asimétricos y alineados a la izquierda. Nada centrado salvo por decisión explícita.
- Íconos: Phosphor (`ph ph-*`). No dibujar SVG a mano.
- Fotografías con `.lighten` (`mix-blend-mode: lighten`) sobre fondo oscuro. Las actuales son placeholders de picsum marcados con `<!-- TODO -->`.
- Movimiento: revelado al hacer scroll con `IntersectionObserver` (`.reveal` / `.in`), titular rotativo en el hero, hover en botones. Todo respeta `prefers-reduced-motion`.
- Máximo dos antetítulos (`Eyebrow`) en toda la página. Cero guiones largos. Cero puntos medios como separador en texto visible.

## Legibilidad para buscadores y asistentes de IA

- `public/robots.txt` permite todo y nombra explícitamente a ClaudeBot, GPTBot, Google-Extended, PerplexityBot y otros.
- `public/llms.txt` es el resumen en texto plano que leen los asistentes (convención llmstxt.org). Si cambia el copy de la página, cambia también este archivo: dicen lo mismo.
- `Layout.astro` emite canonical, `og:*`, `<link rel="sitemap">` y un JSON-LD `Organization` con las líneas de servicio. `@astrojs/sitemap` genera `sitemap-index.xml` en el build; requiere `site` en `astro.config.mjs`.

## Convenciones de código

- Un componente = una responsabilidad. Si un `.astro` empieza a mezclar layout de varias secciones, dividirlo.
- Los textos de cada sección (citas, listas, pasos) viven como arrays dentro del propio componente de `sections/`, salvo que el equipo decida moverlos a `src/content/` para iterar copy sin tocar código.
- Todo cambio visual relevante debe revisarse en `http://localhost:4322` (Docker) o `npm run dev` antes de dar por terminada la tarea. `npm run build` y `npx astro check` deben pasar limpios.

## Qué NO hacer

- No agregar apps móviles, dashboards ni nada fuera del alcance de "landing page pública".
- No inventar casos de éxito, testimonios de clientes ni métricas. La única cifra publicable es la que tiene fuente citada en `docs/MENSAJES.md`.
- No nombrar herramientas ni tecnologías (ERPNext, Frappe, Nextcloud, Authentik, n8n, Astro) en ningún texto visible. La pyme compra el problema resuelto, no el motor.
- No prometer Mesón Caja como disponible ni usar "Tuyo. Aunque nosotros no estemos." mientras no exista la cláusula contractual de entrega de código (estrategia, sección 07).
- No publicar lenguaje de estrategia interna ("lo que no somos", bancos de pruebas, cifras de madurez digital). Si el cliente no lo necesita para decidir, no va.
- No usar guiones largos (`—`) en texto visible.
- No usar `window.addEventListener("scroll")`: para reaccionar al scroll se usa `IntersectionObserver` (ver `Header.astro`).
