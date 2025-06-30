# The Last of Guss

This repository contains a minimal setup for the game backend and frontend.

## Backend
- Nest.js with Sequelize
- Environment variables configure round duration and cooldown
- REST API for login, rounds listing/creation, tapping the goose and getting round info

## Frontend
- Vite + React
- Pages for login, round list and round play

## Running with Docker
```
docker-compose up --build
```
The backend will be available on `/api` and the frontend on port 80.

## Development with hot reload

Run the dev environment with:

```
docker-compose -f docker-compose.dev.yml up
```

The backend listens on port 3000 and reloads on changes. The Vite dev server is
available on port 5173. An Nginx proxy still exposes everything on port 80.
