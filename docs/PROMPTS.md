# AI Prompts Bank

## Prompt: Phase 3 (Booking System)

```text
Context: Laravel 12 API + React SPA + Filament v4. Auth and Test are working.
Goal: Build the Booking System.

Backend Tasks:
1. Migrations:
   - `class_requests`: id, user_id, status (enum: 'new', 'contacted', 'proposed', 'confirmed', 'cancelled'), proposed_time (datetime, nullable), timestamps.
2. Models: ClassRequest (belongsTo User).
3. API Routes:
   - POST `/api/classes/request` (User requests a class).
   - GET `/api/classes/my-requests` (User sees their requests).
   - POST `/api/classes/{id}/confirm` (User confirms the proposed time).
4. Filament:
   - Create `ClassRequestResource`.
   - Allow Teacher to edit `proposed_time` and change `status` to 'proposed'.
   - Add a custom Action button "Set Time" that prompts for a datetime.

Frontend Tasks:
1. Create `src/pages/StudentDashboard.jsx`.
2. Show user's test result and a button "Request a Class". POST to `/api/classes/request`.
3. List all requests. If status is 'proposed', show the `proposed_time` and a "Confirm" button (POST to `/api/classes/{id}/confirm`).
```

Prompt: Phase 4 (Shop)
Context: Laravel API + React SPA + Filament.
Goal: Digital Shop.

Backend Tasks:

1. Migrations: `products` (name, description, price, file_path), `orders` (user_id, total, status), `order_items` (order_id, product_id, price).
2. API: GET `/api/products`, POST `/api/orders` (creates order, returns signed download URL).
3. Filament: ProductResource, OrderResource.
4. Storage: Store files in `storage/app/private/products`, serve via `URL::temporarySignedRoute`.

Frontend Tasks:

1. `src/pages/Shop.jsx`: List products, "Buy" button.
2. `src/pages/MyOrders.jsx`: List orders and provide download links.
