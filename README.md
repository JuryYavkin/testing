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
