<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Store a newly created order in storage.
     * POST /api/orders
     * Creates an order with 'pending' status, attaches items.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'items' => ['required', 'array'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        // Check if products exist and calculate total
        $total = 0;
        $items = [];

        foreach ($data['items'] as $item) {
            $product = Product::find($item['product_id']);
            if (! $product) {
                return response()->json([
                    'message' => 'Product not found: ' . $item['product_id'],
                ], 422);
            }

            $items[] = [
                'product_id' => $product->id,
                'price' => $product->price,
            ];

            $total += $product->price * $item['quantity'] ?? 1;
        }

        // Create order
        $order = Order::create([
            'user_id' => $request->user()->id,
            'total' => $total,
            'status' => 'pending',
        ]);

        // Attach order items
        foreach ($items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'price' => $item['price'],
            ]);
        }

        return response()->json([
            'message' => 'Order created successfully.',
            'order' => $order->load('user', 'orderItems.product'),
        ], 201);
    }

    /**
     * Get the authenticated user's orders with items.
     * GET /api/orders/my
     */
    public function my(Request $request): JsonResponse
    {
        $orders = $request->user()
            ->orders()
            ->with('orderItems.product')
            ->latest('id')
            ->get();

        return response()->json($orders);
    }

    /**
     * Get a temporary signed URL for a product file.
     * GET /api/orders/{order}/download/{product}
     * Only accessible if order belongs to auth user and status is 'paid'.
     */
    public function download(Request $request, Order $order, Product $product): JsonResponse
    {
        // Check ownership and status
        if ($order->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'This order does not belong to you.',
            ], 403);
        }

        if ($order->status !== 'paid') {
            return response()->json([
                'message' => 'Order is not paid yet.',
            ], 403);
        }

        // Check product belongs to order
        $orderItem = OrderItem::where('order_id', $order->id)
            ->where('product_id', $product->id)
            ->first();

        if (! $orderItem) {
            return response()->json([
                'message' => 'Product not found in this order.',
            ], 404);
        }

        // Generate temporary signed URL (5 minutes)
        $signedUrl = URL::temporarySignedRoute(
            'download.file',
            now()->addMinutes(5),
            ['product' => $product->id]
        );

        return response()->json([
            'download_url' => $signedUrl,
            'expires_at' => now()->addMinutes(5)->toISOString(),
        ]);
    }
}
