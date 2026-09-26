# CoWorkers

## coworkers.cl - Landing Page

Landing corporativa de **Coworkers.cl**, empresa de software para pymes en Concepción, Chile.

### Sobre este repositorio

Este proyecto contiene el código fuente de la landing pública de Coworkers.cl: presenta las dos puertas (servicios y Mesón), explica cómo trabajan e invita a agendar una reunión inicial sin costo. El contenido sigue `docs/MENSAJES.md`.

### Stack

- **Astro**
- **Docker**

```text
CoWorkers/
 ├── .astro/
 ├── .dockerignore
 ├── .env
 ├── .env.schema
 ├── .gitignore
 ├── .prettierrc
 ├── .vscode/
 ├── AGENTS.md
 ├── README.md
 ├── astro.config.mjs
 ├── docker/
 │   ├── Dockerfile
 │   └── Dockerfile.dev
 ├── docker-compose.yml
 ├── docs/
 │   └── MENSAJES.md
 ├── package.json
 ├── public/
 │   ├── favicon-32.png
 │   ├── favicon-512.png
 │   ├── favicon.ico
 │   ├── llms.txt
 │   └── robots.txt
 ├── src/
 │   ├── components/
 │   │   ├── layout/
 │   │   │   ├── Footer.astro
 │   │   │   └── Header.astro
 │   │   ├── sections/
 │   │   │   ├── FinalCta.astro
 │   │   │   ├── Guarantees.astro
 │   │   │   ├── Hero.astro
 │   │   │   ├── HowWeWork.astro
 │   │   │   ├── PainFacts.astro
 │   │   │   ├── Team.astro
 │   │   │   └── TwoDoors.astro
 │   │   └── ui/
 │   │       ├── Button.astro
 │   │       ├── Eyebrow.astro
 │   │       └── Wordmark.astro
 │   ├── layouts/
 │   │   └── Layout.astro
 │   └── pages/
 │       └── index.astro
 └── tsconfig.json
```

### Arquitectura de componentes

Los componentes se dividen en tres carpetas según su responsabilidad:

- **`layout/`** — piezas que envuelven toda la página (header y footer), se usan una sola vez.
- **`sections/`** — un componente por cada bloque de contenido de la landing, ensamblados en orden dentro de `index.astro`. Cada uno arma sus propios datos y no recibe props.
- **`ui/`** — piezas reutilizables y genéricas (botones, cards, tags) que distintas secciones instancian con datos propios vía props.

## Cómo levantar el proyecto

Este proyecto está configurado para ejecutarse exclusivamente utilizando Docker.

1. Asegúrate de tener **Docker** y **Docker Compose** instalados en tu sistema.
2. Abre una terminal en la raíz del proyecto (`CoWorkers`).
3. Construye y levanta el contenedor ejecutando:

```bash
docker compose up --build -d
```

4. La aplicación estará disponible en [http://localhost:4322](http://localhost:4322). Gracias a la configuración de volumenes, cualquier cambio en los archivos de la carpeta `src/` se reflejará instantáneamente en el navegador.

Para detener el servidor en cualquier momento, ejecuta:

```bash
docker compose down
```
