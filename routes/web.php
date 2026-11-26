<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Digital Shop - File download (signed URL)
Route::get('/download/{product}', function (\App\Models\Product $product) {
    $filePath = storage_path('app/private/products/' . $product->file_path);
    if (! file_exists($filePath)) {
        abort(404, 'File not found.');
    }

    return response()->download($filePath);
})->name('download.file');

// Digital Shop - Serve product cover image (inline display)
Route::get('/product-image/{product}', function (\App\Models\Product $product) {
    $filePath = storage_path('app/private/products/' . $product->file_path);
    if (! file_exists($filePath)) {
        abort(404, 'File not found.');
    }

    $mimeType = $product->cover_image ? mime_content_type($filePath) : 'image/jpeg';
    return response()->file($filePath, [
        'Content-Type' => $mimeType,
    ]);
})->name('product.image');
