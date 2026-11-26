<?php

namespace App\Http\Controllers;

use App\Models\Attempt;
use App\Models\AttemptAnswer;
use App\Models\Option;
use App\Models\Question;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
{
    /**
     * Get all questions for the placement test (without correct answers).
     */
    public function questions(): JsonResponse
    {
        $questions = Question::with('options')
            ->get()
            ->map(function ($question) {
                return [
                    'id' => $question->id,
                    'text' => $question->text,
                    'type' => $question->type,
                    'options' => $question->options->map(function ($option) {
                        return [
                            'id' => $option->id,
                            'text' => $option->text,
                            'is_correct' => $option->is_correct,
                        ];
                    }),
                ];
            });

        return response()->json(['questions' => $questions]);
    }

    /**
     * Submit answers, calculate score, determine level, and save attempt.
     */
    public function submit(Request $request): JsonResponse
    {
        $answers = $request->validate([
            'answers' => ['required', 'array'],
            'answers.*.question_id' => ['required', 'integer'],
            'answers.*.option_id' => ['required', 'integer', 'exists:options,id'],
        ])['answers'];

        // Get the authenticated user
        $userId = auth()->id();

        // Count correct answers
        $score = 0;
        foreach ($answers as $answer) {
            $option = Option::find($answer['option_id']);
            if ($option && $option->is_correct) {
                $score++;
            }
        }

        // Determine level based on score
        if ($score >= 26) {
            $level = 'C1';
        } elseif ($score >= 20) {
            $level = 'B2';
        } elseif ($score >= 14) {
            $level = 'B1';
        } elseif ($score >= 8) {
            $level = 'A2';
        } else {
            $level = 'A1';
        }

        // Create Attempt record
        $attempt = Attempt::create([
            'user_id' => $userId,
            'score' => $score,
            'level' => $level,
        ]);

        // Save AttemptAnswer records
        foreach ($answers as $answer) {
            AttemptAnswer::create([
                'attempt_id' => $attempt->id,
                'question_id' => $answer['question_id'],
                'option_id' => $answer['option_id'],
            ]);
        }

        return response()->json(['score' => $score, 'level' => $level]);
    }

    /**
     * Map score to CEFR level.
     */
    private function calculateLevel(int $score, int $total): string
    {
        $percentage = $total > 0 ? ($score / $total) * 100 : 0;

        if ($percentage >= 90) {
            return 'C1';
        }
        if ($percentage >= 70) {
            return 'B2';
        }
        if ($percentage >= 50) {
            return 'B1';
        }
        if ($percentage >= 30) {
            return 'A2';
        }

        return 'A1';
    }
}
