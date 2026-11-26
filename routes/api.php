<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassRequestController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register'])->middleware(['web']);
Route::post('/login', [AuthController::class, 'login'])->middleware(['web']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/test/questions', [TestController::class, 'questions']);
    Route::post('/test/submit', [TestController::class, 'submit']);
});

Route::apiResource('articles', ArticleController::class)->only(['index', 'show']);

Route::prefix('classes')->group(function () {
    Route::post('/request', [ClassRequestController::class, 'request']);
    Route::get('/my-requests', [ClassRequestController::class, 'myRequests']);
    Route::post('/{classRequest}/confirm', [ClassRequestController::class, 'confirm']);
});