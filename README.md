# MiniBlog API

API REST para gestionar authors y posts de un blog.

Permite operaciones CRUD completas sobre authors y posts, con relación uno a muchos entre ambas entidades (un author puede tener muchos posts).

Proyecto construido con Node.js, Express y PostgreSQL.

Desplegado en Railway.

## URL Base

```
https://proyectom2mateogiussano-production.up.railway.app
```

## Tecnologías

- Backend: Node.js con Express
- Base de datos: PostgreSQL
- Cliente DB: pg (node-postgres)
- Testing: Vitest + Supertest
- Documentación: OpenAPI 3.1 + Swagger UI
- Deployment: Railway

## Endpoints disponibles

### Authors

- GET /authors
- GET /authors/:id
- POST /authors
- PUT /authors/:id
- DELETE /authors/:id

### Posts

- GET /posts
- GET /posts/:id
- GET /posts/author/:authorId
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id

Los detalles completos de cada endpoint (parámetros, body, respuestas) están en la documentación interactiva (ver más abajo).

## Ejemplos de uso

### Obtener todos los authors

```bash
curl https://proyectom2mateogiussano-production.up.railway.app/authors
```

Respuesta:

```json
[
  {
    "id": 1,
    "name": "Mateo Giussano",
    "email": "mgiussano@example.com",
    "bio": "Desarrollador full-stack apasionado por Node.js",
    "created_at": "2026-06-24T01:35:05.017Z"
  }
]
```

### Obtener un author por id

```bash
curl https://proyectom2mateogiussano-production.up.railway.app/authors/1
```

### Crear un author

```bash
curl -X POST https://proyectom2mateogiussano-production.up.railway.app/authors \
  -H "Content-Type: application/json" \
  -d '{"name": "Santiago Giussano", "email": "sgiussano@example.com", "bio": "Desarrollador especializado en creacion de APIs"}'
```

Respuesta:

```json
{
  "id": 5,
  "name": "Santiago Giussano",
  "email": "sgiussano@example.com",
  "bio": "Desarrollador especializado en creacion de APIs",
  "created_at": "2026-06-29T22:08:36.492Z"
}
```

### Actualizar un author

```bash
curl -X PUT https://proyectom2mateogiussano-production.up.railway.app/authors/5 \
  -H "Content-Type: application/json" \
  -d '{"name": "Santiago Giussano", "email": "sgiussano@example.com", "bio": "Desarrollador backend senior"}'
```

Respuesta:

```json
{
  "id": 5,
  "name": "Santiago Giussano",
  "email": "sgiussano@example.com",
  "bio": "Desarrollador backend senior",
  "created_at": "2026-06-29T22:08:36.492Z"
}
```

### Eliminar un author

```bash
curl -X DELETE https://proyectom2mateogiussano-production.up.railway.app/authors/5
```

Respuesta: `204 No Content` (sin body).

### Crear un post

```bash
curl -X POST https://proyectom2mateogiussano-production.up.railway.app/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Mi primer post", "content": "Aguante Henry", "author_id": 1, "published": true}'
```

Respuesta:

```json
{
  "id": 6,
  "title": "Mi primer post",
  "content": "Aguante Henry",
  "author_id": 1,
  "published": true,
  "created_at": "2026-06-29T22:24:08.435Z"
}
```

### Obtener posts de un author específico

```bash
curl https://proyectom2mateogiussano-production.up.railway.app/posts/author/1
```

Respuesta:

```json
[
  {
    "id": 1,
    "title": "Introducción a Node.js",
    "content": "Node.js es un runtime de JavaScript...",
    "author_id": 1,
    "published": true,
    "created_at": "2026-06-24T01:35:05.323Z",
    "author_name": "Mateo Giussano",
    "author_email": "mgiussano@example.com"
  },
  {
    "id": 3,
    "title": "APIs RESTful",
    "content": "REST es un estilo arquitectónico...",
    "author_id": 1,
    "published": true,
    "created_at": "2026-06-24T01:35:05.323Z",
    "author_name": "Mateo Giussano",
    "author_email": "mgiussano@example.com"
  },
  {
    "id": 5,
    "title": "Async/Await explicado",
    "content": "Las promesas simplifican el código asíncrono...",
    "author_id": 1,
    "published": false,
    "created_at": "2026-06-24T01:35:05.323Z",
    "author_name": "Mateo Giussano",
    "author_email": "mgiussano@example.com"
  },
  {
    "id": 6,
    "title": "Mi primer post",
    "content": "Aguante Henry",
    "author_id": 1,
    "published": true,
    "created_at": "2026-06-29T22:24:08.435Z",
    "author_name": "Mateo Giussano",
    "author_email": "mgiussano@example.com"
  }
]
```

## Documentación interactiva

```
https://proyectom2mateogiussano-production.up.railway.app/api-docs
```

Permite navegar todos los endpoints, ver parámetros y respuestas, y probar requests directamente desde el navegador.

## Ejecutar localmente

### Prerrequisitos

```
Node.js 20+
PostgreSQL 14+
```

### Clonar repositorio

```bash
git clone https://github.com/MateoGiussano/ProyectoM2_MateoGiussano.git
cd ProyectoM2_MateoGiussano
```

### Instalar dependencias

```bash
npm install
```

### Crear archivo .env

Copiar `.env.example` como `.env` y completar con tus datos:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog
DB_USER=postgres
DB_PASSWORD=tu_password
```

### Crear base de datos

```bash
psql -U postgres -c "CREATE DATABASE miniblog;"
```

### Ejecutar script de setup (crea tablas y carga datos iniciales)

```bash
psql -U postgres -d miniblog -f src/db/setup.sql
```

### Levantar servidor

```bash
npm run dev
```

La aplicación queda disponible en:

```
http://localhost:3000
```

La documentación Swagger queda disponible en:

```
http://localhost:3000/api-docs
```

## Ejecutar tests

```bash
npm test
```

Los tests cubren los endpoints principales de authors y posts (casos de éxito, error 404 y validaciones con error 400), usando Vitest y Supertest.

## Deployment en Railway

### Variables de entorno necesarias

```
PORT
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
```

En Railway, estas variables se configuran en la pestaña **Variables** del servicio. Si el servicio de PostgreSQL también está en Railway, se pueden referenciar directamente sus credenciales en lugar de copiarlas a mano:

```
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_NAME=${{Postgres.PGDATABASE}}
DB_USER=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
```

### Internal URL

```
proyectom2mateogiussano.railway.internal
```

### Public URL

```
https://proyectom2mateogiussano-production.up.railway.app
```

## Autor

Mateo Giussano