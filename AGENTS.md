# Project: kak-maziar

## Stack

- Backend: Laravel 12 (PHP 8.3) at ~/Desktop/kak-maziar, running on http://localhost:8000
- Frontend: React (Vite) at ~/Desktop/frontend, running on http://localhost:5173
- Database: SQLite (dev) at database/database.sqlite
- Auth: Sanctum (cookie SPA mode)
- Admin Panel: Filament v4 (route: /admin)

## Conventions

- Backend tests: Pest (vendor/bin/pest) or PHPUnit (php artisan test)
- Frontend: React 18 + react-router-dom + axios, inline styles only (no Tailwind yet)
- API routes: routes/api.php
- Auth logic: app/Http/Controllers/AuthController.php

## How to run

- Backend: cd ~/Desktop/kak-maziar && php artisan serve
- Frontend: cd ~/Desktop/frontend && npm run dev
