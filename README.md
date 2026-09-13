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
│   │   └── Welcome.astro
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