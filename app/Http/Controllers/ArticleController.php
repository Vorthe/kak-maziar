<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a paginated list of published articles.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 15);

        $articles = Article::where('is_published', true)
            ->with('category')
            ->latest('id')
            ->paginate($perPage);

        return response()->json($articles);
    }

    /**
     * Display the specified article by slug.
     */
    public function show(string $slug): JsonResponse
    {
        $article = Article::where('slug', $slug)
            ->where('is_published', true)
            ->with('category')
            ->first();

        if (! $article) {
            return response()->json(['message' => 'Article not found.'], 404);
        }

        return response()->json($article);
    }
}
