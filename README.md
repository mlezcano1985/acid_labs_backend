# Demo API REST utilizando ExpressJS

# Descripción
Simple aplicación desarrollada en ExpressJS que expone 1 endpoint.
- GET: `api/weather/city`: Muestra información del clima asociada a una ciudad.

La información del clima es obtenida de la api [darksky.net](https://darksky.net/dev).

# Cómo empezar?
- Clonar o descargar el repositorio.
- Abrir un terminal en la raíz del proyecto.

# Ejecutar con Docker
- Instalar [Docker](https://docs.docker.com/compose/install/) en dependencia de su sistema operativo.
- Abrir un terminal en la raíz del proyecto.
- Ejecutar el comando `npm run start-docker` para que la se inicien los contenedores de node y redis. Aparecerá un log en la consola para indicar que la app y la bd están en ejecución.

# Ejecutar sin Docker
- Instalar versión estable de [NodeJS](https://nodejs.org/es/download/).
- Instalar versión estable de [Redis](https://redis.io/download).
- Instalar dependencias usando el comando `npm install`.
- Ejecutar el comando `npm start` para iniciar la API. Aparecerá un log en la consola para indicar que la app y la bd están en ejecución.

# Comandos disponibles
- `npm start`: Inicia la api.
- `npm run start-docker`: Inicia los contenedores de node y redis.
