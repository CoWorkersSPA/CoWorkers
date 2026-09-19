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
└── ui/           → piezas reutilizables con props (Button, Eyebrow, NumberedItem,
                    FeatureCard, SectionSplit, ThemeToggle)
```

**Regla de oro**: antes de escribir markup nuevo dentro de una sección, revisar si el patrón ya existe en `ui/`. Ejemplo: `Services` y `Guarantees` comparten el patrón título + descripción → usan el mismo `FeatureCard`. No duplicar estructura HTML entre secciones que visualmente son lo mismo.

Orden de secciones en `index.astro`, de arriba a abajo:

1. `Hero` — titular rotativo "Tu proyecto…" + el problema (cobrar, cumplir, ordenar)
2. `PainFacts` — "Nos llaman cuando": 1 de diciembre y 40 días, con fuente
3. `Services` — las tres líneas de Coworkers.cl, el problema antes que la pieza
4. `Meson` — la puerta para la pyme: "Tu negocio, a la mano."
5. `HowWeWork` — "Cuatro pasos. Ningún manual."
6. `Guarantees` — "Lo que puedes exigirnos": los cuatro pilares
7. `Team` — "Quiénes lo hacen" + puerta para estudiantes
8. `FinalCta` — "Cuéntanos cómo funciona hoy tu operación"

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

- No agregar apps móviles, dashboards ni nada fuera del alcance de "landing page pública".
- No inventar casos de éxito, testimonios de clientes ni métricas. La única cifra publicable es la que tiene fuente citada en `docs/MENSAJES.md`.
- No nombrar herramientas ni tecnologías (ERPNext, Frappe, Nextcloud, Authentik, n8n, Astro) en ningún texto visible. La pyme compra el problema resuelto, no el motor.
- No prometer Mesón Caja como disponible ni usar "Tuyo. Aunque nosotros no estemos." mientras no exista la cláusula contractual de entrega de código (estrategia, sección 07).
- No publicar lenguaje de estrategia interna ("lo que no somos", bancos de pruebas, cifras de madurez digital). Si el cliente no lo necesita para decidir, no va.
- No usar guiones largos (`—`) en texto visible.
- No usar `window.addEventListener("scroll")`: para reaccionar al scroll se usa `IntersectionObserver` (ver `Header.astro`).
