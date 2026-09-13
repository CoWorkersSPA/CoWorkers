# AGENTS.md

## Contexto del proyecto

Landing page de **Coworkers**, un estudio de desarrollo web con sede en Concepción, Chile. Coworkers construye aplicaciones web para empresas (plataformas internas, portales de cliente, productos en tiempo real, sitios con lógica propia) y reparte el trabajo, por dentro, entre estudiantes universitarios a quienes forman y pagan por entrega.

Este repositorio contiene únicamente la landing pública: la página donde se presenta el servicio, se explica cómo trabajan, y se invita a agendar una reunión inicial sin costo. No es la plataforma del producto, es marketing/conversión.

**Fuente de verdad del contenido y layout**: el mockup original de la landing (`UI_mockups_para_Coworkers_cl.pdf`). Cualquier cambio de copy, orden de secciones o estructura debe respetar lo que ahí está definido, salvo que se indique explícitamente lo contrario.

## Stack

- **Astro** — generador de sitios estáticos
- **Docker** — entorno de desarrollo y build, el proyecto corre exclusivamente vía Docker (`docker compose up --build -d`)

## Arquitectura de componentes

```
src/components/
├── layout/       → Header, Footer (envuelven toda la página, se usan una sola vez)
├── sections/     → un componente por bloque de contenido de la landing, sin props,
│                   ensamblados en orden dentro de index.astro
└── ui/           → piezas reutilizables con props (Button, Eyebrow, NumberedItem,
                    FeatureCard, TechTag, QuoteCard)
```

**Regla de oro**: antes de escribir markup nuevo dentro de una sección, revisar si el patrón ya existe en `ui/`. Ejemplo: `ValueProps` y `HowWeWork` comparten el patrón "número + título + descripción" → usan el mismo `NumberedItem`. `WhatWeBuild` y `Guarantees` comparten el patrón de card con borde → usan el mismo `FeatureCard`. No duplicar estructura HTML entre secciones que visualmente son lo mismo.

Orden de secciones en `index.astro` (mapea 1:1 con el mockup, de arriba a abajo):

1. `Hero` — "Tu proyecto paga la carrera de alguien"
2. `PainQuotes` — "Nos llaman cuando..."
3. `ValueProps` — "Lo que te queda"
4. `WhatWeBuild` — "Qué construimos"
5. `HowWeWork` — "Cómo lo hacemos"
6. `Guarantees` — "Con qué te respaldamos"
7. `Team` — "Quiénes lo escriben"
8. `WhatWeAreNot` — "Lo que no somos"
9. `FinalCta` — "Cuéntanos cómo funciona hoy tu operación"

## Dirección de diseño

Basado en el mockup: fondo oscuro (azul-negro, no negro puro), acento morado sólido para CTAs y para la sección "Nos llaman cuando", tipografía con jerarquía clara (hero grande y liviano, headings de sección con más peso), cards con borde fino en vez de sombra decorativa, números (01, 02, 03...) como elemento estructural recurrente, espaciado generoso entre secciones.

### Reglas anti-patrón (vía skill Impeccable — `pbakaus/impeccable`)

Este proyecto usa [Impeccable](https://github.com/pbakaus/impeccable) como skill de diseño para evitar los "tells" genéricos de interfaces hechas por IA. Si la herramienta con la que estás trabajando (Claude Code, Cursor, Antigravity, etc.) tiene Impeccable instalado, usar sus comandos según corresponda:

- `/impeccable critique` — antes de dar por cerrada una sección nueva, revisar jerarquía visual y claridad
- `/impeccable audit` — antes de un PR, chequear accesibilidad, responsive y calidad técnica
- `/impeccable polish` — pasada final antes de mergear a `main`

**Nota**: el `DESIGN.md` del repo de Impeccable define la paleta "Neo Kinpaku" (dorado + lacado + verdigris), que es la identidad de marca propia de esa herramienta — **no se debe aplicar esa paleta a Coworkers**. Lo que sí aplica aquí es su sección "Do / Do Not" de anti-patrones generales:

**No hacer:**
- Degradados morado-azul genéricos tipo SaaS
- Cards anidadas dentro de cards
- Negro puro (`#000`) o blanco puro (`#fff`) — siempre con tinte
- Sombras decorativas por defecto en vez de bordes finos (hairline) de 1px
- Texto gris sobre fondos de color
- Fuente Inter o system-ui por defecto sin intención tipográfica
- Easing tipo "bounce"/elástico en hovers o transiciones
- Eyebrow (etiqueta pequeña en mayúsculas) en cada sección sin excepción — usar con criterio, no como scaffolding automático

**Sí hacer:**
- Bordes de 1px como primera opción para dar estructura a cards, antes que `box-shadow`
- Ancho de línea contenido en párrafos largos (65-75 caracteres) para lectura cómoda
- Radios de esquina pequeños y consistentes en todo el sitio
- Jerarquía tipográfica deliberada: el hero puede ser más liviano en peso que los headings de sección (no es un error, es una decisión de diseño válida si se aplica consistente)

## Convenciones de código

- Un componente = una responsabilidad. Si un `.astro` empieza a mezclar layout de varias secciones, dividirlo.
- Los textos de cada sección (citas, listas, pasos) viven como arrays dentro del propio componente de `sections/`, salvo que el equipo decida moverlos a `src/content/` para iterar copy sin tocar código.
- No usar `localStorage`/`sessionStorage` en ningún componente (no aplica en este proyecto de todas formas, es solo landing estática).
- Todo cambio visual relevante debe revisarse en `http://localhost:4321` levantado vía Docker antes de dar por terminada la tarea.

## Qué NO hacer

- No agregar apps móviles, dashboards, ni nada fuera del alcance de "landing page pública" — eso es explícitamente parte de "Lo que no somos" en el propio contenido del sitio.
- No inventar casos de éxito, testimonios de clientes o métricas — el mockup es explícito en que "no tenemos casos que mostrarte todavía, estamos partiendo, y no vamos a inventarlos".
- No cambiar el copy del mockup sin indicación explícita; es contenido validado por el negocio, no un placeholder.