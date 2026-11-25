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
        $data = $request->validate([
            'answers' => ['required', 'array'],
            'answers.*' => ['required', 'integer', 'exists:options,id'],
        ]);

        $answers = $data['answers'];
        $totalQuestions = Question::count();

        // Calculate score
        $score = 0;
        $attempt = Attempt::create([
            'user_id' => Auth::id(),
            'score' => 0,
            'level' => 'A1',
        ]);

        foreach ($answers as $questionId => $optionId) {
            $option = Option::find($optionId);
            if ($option && $option->question_id == $questionId && $option->is_correct) {
                $score++;
            }

            AttemptAnswer::create([
                'attempt_id' => $attempt->id,
                'question_id' => $questionId,
                'option_id' => $optionId,
            ]);
        }

        // Determine level based on score
        $level = $this->calculateLevel($score, $totalQuestions);
        $attempt->score = $score;
        $attempt->level = $level;
        $attempt->save();

        return response()->json([
            'attempt' => $attempt,
            'score' => $score,
            'total' => $totalQuestions,
            'percentage' => $totalQuestions > 0 ? round(($score / $totalQuestions) * 100, 1) : 0,
        ]);
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
