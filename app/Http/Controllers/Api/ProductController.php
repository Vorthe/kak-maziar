<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /**
     * Display a listing of all products (public).
     * GET /api/products
     */
    public function index(): JsonResponse
    {
        $products = Product::select('id', 'name', 'description', 'price', 'cover_image', 'file_path')
            ->latest('id')
            ->get();

        return response()->json($products);
    }
}
