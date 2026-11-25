<?php

namespace App\Http\Controllers;

use App\Models\ClassRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClassRequestController extends Controller
{
    /** Create a new class request for the authenticated user. */
    public function request(Request $request): JsonResponse
    {
        $request->validate([
            'status' => ['sometimes', 'string', 'in:new,proposed,confirmed'],
            'proposed_time' => ['nullable', 'date'],
        ]);

        $classRequest = ClassRequest::create([
            'user_id' => $request->user()->id,
            'status' => 'new',
        ]);

        return response()->json($classRequest, 201);
    }

    /** Return all class requests for the authenticated user. */
    public function myRequests(Request $request): JsonResponse
    {
        $classRequests = ClassRequest::where('user_id', $request->user()->id)
            ->latest('id')
            ->get();

        return response()->json($classRequests);
    }

    /** Confirm the given class request (ownership enforced). */
    public function confirm(Request $request, ClassRequest $classRequest): JsonResponse
    {
        if ($classRequest->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $classRequest->update([
            'status' => 'confirmed',
        ]);

        return response()->json($classRequest);
    }
}
