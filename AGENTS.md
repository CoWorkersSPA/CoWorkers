# AGENTS.md

## Contexto del proyecto

Landing corporativa de **Coworkers.cl**, una empresa de software para pymes con sede en Concepción, Chile, construida con talento universitario. Tiene dos capas: **Coworkers.cl** (servicios: desarrollo a medida, automatizaciones, infraestructura; talento y reclutamiento) y **Mesón, de Coworkers.cl** (la línea de soluciones para pymes: Datos, Cobros, cotizaciones). El equipo son cinco socios de Ingeniería en Informática de la UTFSM y estudiantes de Concepción a los que forman, revisan y pagan por entrega.

Este repositorio contiene únicamente la landing pública: presenta las dos puertas, explica cómo trabajan e invita a agendar una reunión inicial sin costo. No es la plataforma del producto ni la página de Mesón.

**Fuente de verdad del contenido**: `docs/MENSAJES.md` (marco de mensajes), derivado de _Estrategia de marca - Coworkers.cl y Mesón_ e _Investigación de mercado - Módulos y servicios Mesón_ (ambos del 19 de septiembre de 2026). El mockup antiguo (`UI_mockups_para_Coworkers_cl.pdf`) queda deprecado para el copy; solo sirve como referencia visual. Cualquier cambio de copy debe respetar `docs/MENSAJES.md`, en especial la sección "Lo que no se dice".

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

1. `Hero` — titular rotativo "Tu proyecto…" a gran escala + el problema (cobrar, cumplir, ordenar). Sin foto hasta que exista una propia (tablet en un mostrador); una de archivo aquí es una prueba falsa
2. `PainFacts` — "Nos llaman cuando": 1 de diciembre y 40 días, con fuente, sobre la banda índigo
3. `TwoDoors` — servicios de Coworkers.cl (lista con reglas) + tarjeta de Mesón con foto
4. `HowWeWork` — "Cuatro pasos. Ningún manual.", cuatro pasos sobre una línea
5. `Guarantees` — "Lo que puedes exigirnos": los cuatro pilares en 2×2
6. `Team` — historia corta sobre foto a sangre (la puerta para estudiantes está comentada hasta que se abra el reclutamiento)
7. `FinalCta` — "Cuéntanos cómo funciona hoy tu operación"

## Dirección de diseño

Sistema **Nocturne** (`UI Palette Coworkers.cl.pdf`). El **oscuro es el tema de marca y el predeterminado** (brief de identidad, estrategia sección 06). Desde el 23 de septiembre de 2026 existe además un **tema claro** como variante, por decisión del equipo; la estrategia todavía dice "sin modo claro", así que conviene actualizarla o revertir esto.

- El tema vive en `data-theme` sobre `<html>` (`dark` o `light`). Un script en línea de `Layout.astro` lo fija antes del primer pintado: primero la elección guardada (`localStorage` `cw-theme`), si no la del sistema. Sin JavaScript queda el oscuro.
- El cambio lo hace `ui/ThemeToggle.astro`, montado en el header. Si el visitante no ha elegido, sigue en vivo los cambios del sistema.
- **Las rampas (`--n-*`, `--a-*`, `--coral-*`) significan contraste contra el fondo, no claridad absoluta**: 100 es siempre lo más contrastado (texto) y 900 lo más cercano al fondo. El tema claro solo invierte sus valores, por eso los componentes no necesitan saber en qué tema están y casi nunca hace falta una regla `[data-theme="light"]`.
- Al agregar un color: token en los dos bloques de `:root`, nunca un hex suelto en un componente (el wordmark lo hacía y se corrigió).
- Lo que sí necesita regla propia por tema: mezclas que dependen de la dirección de la luz (`.lighten` pasa a `multiply`, el grano pasa a `multiply` con ruido oscuro, el baño de color de `Team` pasa a `multiply`).
- Contraste verificado en claro: cuerpo 9,9:1, secundario 6,6:1, pie 5,0:1, botones 7,4:1, banda 7,9:1. Los hairlines (`--n-700`) quedan en 2,2:1, la misma sutileza que en oscuro.

- Fondo `#161826`, texto `#e9e9ed`, un solo acento blurple `#9184d9` usado como línea, marca y resplandor, nunca como relleno grande. Rampas neutra y de acento 100–900 en `global.css`.
- Una sola banda saturada por página (`#262a60`, la de "Nos llaman cuando"). El resto de los fondos se mantiene desaturado.
- Paleta índigo + coral con el violeta como marca (proporción 60-30-10). El índigo (`--section`, `--section-ghost`) es la atmósfera: domina las luces de fondo. `--accent` violeta es marca y acción (nav, botones, íconos, palabras destacadas). `--coral` `#d1746a` es el único secundario y la luz cálida de la página: resplandores de cada sección, la línea y puntos de "Cómo trabajamos", la tarjeta de Mesón, el contador de la banda. Nunca en botones de contorno ni en títulos. Siempre plano, sin degradados ni halos.
- Inter, peso 500 en títulos; la jerarquía es por tamaño y espacio, no por peso.
- Botones de contorno (borde en acento), nunca rellenos. Radio 8px en botones, 14px en imágenes; nada más redondeado.
- Reglas que se desvanecen en los extremos (`.rule`) en vez de líneas que cortan.
- Layouts asimétricos y alineados a la izquierda. Nada centrado salvo por decisión explícita.
- Íconos: Phosphor (`ph ph-*`). No dibujar SVG a mano.
- Fotografías con `.lighten` (`mix-blend-mode: lighten`) sobre fondo oscuro. Las actuales (`public/img/`) son fotos de archivo de Unsplash bajadas vía Picsum, marcadas con `<!-- TODO -->` para reemplazarlas por fotos propias; llevan `alt=""` porque no muestran al equipo real.
- Profundidad: el fondo nunca es un plano. `body::before` pinta una aurora fija de dos tonos de la propia paleta (violeta `--accent` e índigo `--section-ghost`) y `body::after` un grano fino; cada sección suma su propio resplandor (`.glow`, `.orb`, `.aurora`) con `filter: blur`. Son luz, no relleno: opacidades bajas y siempre `pointer-events: none`.
- Sombras tintadas (`--shadow-tint`, `--shadow-lg`, `--shadow-glow`), nunca negro puro. Íconos dentro de `.icon-tile` (borde en degradado). Texto con degradado solo en la palabra que importa (`.text-glow`).
- La banda índigo se funde con el fondo por arriba y por abajo; no corta.
- Apertura (`ui/Intro.astro`): telón índigo con grano y partículas que muestra el wordmark y se levanta (2,3 s). Se activa con `data-intro` en `<html>`, que un script inline de `Layout.astro` pone solo una vez por sesión (`sessionStorage`) y nunca con `prefers-reduced-motion`. Mientras está arriba, el hero espera; al retirarse entra en cascada.
- Un solo momento cinematográfico: la banda "Fechas clave" (cifras fantasma en contorno que se desplazan con `animation-timeline: view()`, el 40 que cuenta al entrar y los días que faltan para el 1 de diciembre calculados en el navegador). No repetir el recurso en otras secciones.
- Movimiento: revelado al hacer scroll con `IntersectionObserver` (`.reveal` / `.in`, con desenfoque), titular rotativo en el hero, línea de pasos que se dibuja al aparecer, sección activa en el nav, spotlight que sigue al puntero en la tarjeta de Mesón (`pointermove`), hover con luz en botones, servicios y garantías, anillo que gira lento en el hero y una luz tenue que sigue al cursor en toda la página (`pointermove`, una actualización por frame). Todo respeta `prefers-reduced-motion` y se desactiva sin puntero fino (`hover: none`).
- Máximo dos antetítulos (`Eyebrow`) en toda la página. Cero guiones largos. Cero puntos medios como separador en texto visible.

## Legibilidad para buscadores y asistentes de IA

- `public/robots.txt` permite todo y nombra explícitamente a ClaudeBot, GPTBot, Google-Extended, PerplexityBot y otros.
- `public/llms.txt` es el resumen en texto plano que leen los asistentes (convención llmstxt.org). Si cambia el copy de la página, cambia también este archivo: dicen lo mismo.
- `Layout.astro` emite canonical, `og:*`, `<link rel="sitemap">` y un JSON-LD `Organization` con las líneas de servicio. `@astrojs/sitemap` genera `sitemap-index.xml` en el build; requiere `site` en `astro.config.mjs`.

## Convenciones de código

- Los comentarios del template van en `{/* ... */}`, no en `<!-- ... -->`: Astro renderiza los segundos al HTML final y viajan al visitante. `compressHTML` colapsa espacios pero no borra comentarios. Los del frontmatter (`//`) y los de `<style>` no salen nunca.
- Un componente = una responsabilidad. Si un `.astro` empieza a mezclar layout de varias secciones, dividirlo.
- Los textos de cada sección (citas, listas, pasos) viven como arrays dentro del propio componente de `sections/`, salvo que el equipo decida moverlos a `src/content/` para iterar copy sin tocar código.
- Todo cambio visual relevante debe revisarse en `http://localhost:4322` (Docker) o `npm run dev` antes de dar por terminada la tarea. Si Vite deja un módulo de estilos rancio en HMR (la página carga CSS viejo aunque `astro build` esté bien), `touch` del componente lo invalida. `npm run build` y `npx astro check` deben pasar limpios.

## Qué NO hacer

- No agregar apps móviles, dashboards ni nada fuera del alcance de "landing page pública".
- No inventar casos de éxito, testimonios de clientes ni métricas. La única cifra publicable es la que tiene fuente citada en `docs/MENSAJES.md`.
- No nombrar herramientas ni tecnologías (ERPNext, Frappe, Nextcloud, Authentik, n8n, Astro) en ningún texto visible. La pyme compra el problema resuelto, no el motor.
- No prometer Mesón Caja como disponible ni usar "Tuyo. Aunque nosotros no estemos." mientras no exista la cláusula contractual de entrega de código (estrategia, sección 07).
- No publicar lenguaje de estrategia interna ("lo que no somos", bancos de pruebas, cifras de madurez digital). Si el cliente no lo necesita para decidir, no va.
- No usar guiones largos (`—`) en texto visible.
- No usar `window.addEventListener("scroll")`: para reaccionar al scroll se usa `IntersectionObserver` (ver `Header.astro`).
