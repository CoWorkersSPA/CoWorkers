# CoWorkers

## coworkers.cl - Landing Page

Landing page de  **Coworkers** , Empresa de desarrollo Concepción, Chile.

### Sobre este repositorio

Este proyecto contiene el código fuente de la landing page pública de Coworkers: la página donde se presenta el servicio, se explica cómo trabajan, y se invita a agendar una reunión inicial sin costo.

### Stack

* **Astro**
* **Docker**

```text
CoWorkers/
├── docker/
│   ├── Dockerfile
│   └── Dockerfile.dev
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── PainQuotes.astro        # "Nos llaman cuando"
│   │   │   ├── ValueProps.astro        # "Lo que te queda"
│   │   │   ├── WhatWeBuild.astro       # "Qué construimos"
│   │   │   ├── HowWeWork.astro         # "Cómo lo hacemos"
│   │   │   ├── Guarantees.astro        # "Con qué te respaldamos"
│   │   │   ├── Team.astro              # "Quiénes lo escriben"
│   │   │   ├── WhatWeAreNot.astro      # "Lo que no somos"
│   │   │   └── FinalCta.astro
│   │   └── ui/
│   │       ├── Button.astro            # variantes: solid, outline
│   │       ├── Eyebrow.astro           # etiqueta pequeña tipo "LO QUE TE QUEDA"
│   │       ├── NumberedItem.astro      # número + título + descripción
│   │       ├── FeatureCard.astro       # card con borde
│   │       ├── TechTag.astro           # pill de tecnología
│   │       └── QuoteCard.astro         # citas de "Nos llaman cuando"
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── .dockerignore
├── .env
├── .gitignore
├── AGENTS.md
├── astro.config.mjs
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

### Arquitectura de componentes

Los componentes se dividen en tres carpetas según su responsabilidad:

* **`layout/`** — piezas que envuelven toda la página (header y footer), se usan una sola vez.
* **`sections/`** — un componente por cada bloque de contenido de la landing, ensamblados en orden dentro de `index.astro`. Cada uno arma sus propios datos y no recibe props.
* **`ui/`** — piezas reutilizables y genéricas (botones, cards, tags) que distintas secciones instancian con datos propios vía props.

## Cómo levantar el proyecto

Este proyecto está configurado para ejecutarse exclusivamente utilizando Docker.

1. Asegúrate de tener **Docker** y **Docker Compose** instalados en tu sistema.
2. Abre una terminal en la raíz del proyecto (`CoWorkers`).
3. Construye y levanta el contenedor ejecutando:

```bash
docker compose up --build -d
```

4. La aplicación estará disponible en [http://localhost:4321](http://localhost:4321). Gracias a la configuración de volumenes, cualquier cambio en los archivos de la carpeta `src/` se reflejará instantáneamente en el navegador.

Para detener el servidor en cualquier momento, ejecuta:

```bash
docker compose down
```