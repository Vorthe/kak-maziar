<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;
use App\Models\Option;

class TestSeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
            [
                'text' => 'I ___ to work every day.',
                'type' => 'grammar',
                'options' => [
                    ['text' => 'go', 'correct' => true],
                    ['text' => 'goes', 'correct' => false],
                    ['text' => 'going', 'correct' => false],
                    ['text' => 'have gone', 'correct' => false],
                ],
            ],
            [
                'text' => 'She ___ a book right now.',
                'type' => 'grammar',
                'options' => [
                    ['text' => 'read', 'correct' => false],
                    ['text' => 'reads', 'correct' => false],
                    ['text' => 'is reading', 'correct' => true],
                    ['text' => 'has read', 'correct' => false],
                ],
            ],
            [
                'text' => '___ you like some coffee?',
                'type' => 'grammar',
                'options' => [
                    ['text' => 'Do', 'correct' => true],
                    ['text' => 'Does', 'correct' => false],
                    ['text' => 'Is', 'correct' => false],
                    ['text' => 'Are', 'correct' => false],
                ],
            ],
            [
                'text' => 'They have lived here ___ 2015.',
                'type' => 'grammar',
                'options' => [
                    ['text' => 'for', 'correct' => false],
                    ['text' => 'since', 'correct' => true],
                    ['text' => 'on', 'correct' => false],
                    ['text' => 'at', 'correct' => false],
                ],
            ],
            [
                'text' => 'If I ___ enough money, I would buy a car.',
                'type' => 'grammar',
                'options' => [
                    ['text' => 'have', 'correct' => false],
                    ['text' => 'had', 'correct' => true],
                    ['text' => 'will have', 'correct' => false],
                    ['text' => 'has had', 'correct' => false],
                ],
            ],
            [
                'text' => 'The meeting was moved to ___ 3 PM.',
                'type' => 'vocabulary',
                'options' => [
                    ['text' => 'at', 'correct' => false],
                    ['text' => 'in', 'correct' => false],
                    ['text' => 'on', 'correct' => false],
                    ['text' => 'at', 'correct' => false],
                ],
            ],
            [
                'text' => 'She is very ___ and always helps others.',
                'type' => 'vocabulary',
                'options' => [
                    ['text' => 'friendly', 'correct' => true],
                    ['text' => 'angry', 'correct' => false],
                    ['text' => 'lazy', 'correct' => false],
                    ['text' => 'boring', 'correct' => false],
                ],
            ],
            [
                'text' => 'The train arrived ___ time.',
                'type' => 'vocabulary',
                'options' => [
                    ['text' => 'late', 'correct' => false],
                    ['text' => 'on', 'correct' => false],
                    ['text' => 'in', 'correct' => false],
                    ['text' => 'at', 'correct' => false],
                ],
            ],
            [
                'text' => 'He ___ his homework before watching TV.',
                'type' => 'grammar',
                'options' => [
                    ['text' => 'finish', 'correct' => false],
                    ['text' => 'finishes', 'correct' => false],
                    ['text' => 'had finished', 'correct' => true],
                    ['text' => 'finished', 'correct' => false],
                ],
            ],
            [
                'text' => 'I ___ this movie before.',
                'type' => 'grammar',
                'options' => [
                    ['text' => 'have seen', 'correct' => true],
                    ['text' => 'has seen', 'correct' => false],
                    ['text' => 'had seen', 'correct' => false],
                    ['text' => 'saw', 'correct' => false],
                ],
            ],
            [
                'text' => 'The weather is ___ today. It is raining heavily.',
                'type' => 'vocabulary',
                'options' => [
                    ['text' => 'excellent', 'correct' => false],
                    ['text' => 'terrible', 'correct' => true],
                    ['text' => 'beautiful', 'correct' => false],
                    ['text' => 'amazing', 'correct' => false],
                ],
            ],
            [
                'text' => 'She ___ three languages, including English and French.',
                'type' => 'vocabulary',
                'options' => [
                    ['text' => 'speak', 'correct' => false],
                    ['text' => 'speaks', 'correct' => false],
                    ['text' => 'speaks', 'correct' => false],
                    ['text' => 'speak', 'correct' => false],
                ],
            ],
            [
                'text' => 'I ___ to the gym twice a week.',
                'type' => 'grammar',
                'options' => [
                    ['text' => 'go', 'correct' => true],
                    ['text' => 'goes', 'correct' => false],
                    ['text' => 'going', 'correct' => false],
                    ['text' => 'have gone', 'correct' => false],
                ],
            ],
            [
                'text' => 'The meeting was ___ to Friday.',
                'type' => 'vocabulary',
                'options' => [
                    ['text' => 'postponed', 'correct' => true],
                    ['text' => 'finished', 'correct' => false],
                    ['text' => 'completed', 'correct' => false],
                    ['text' => 'ended', 'correct' => false],
                ],
            ],
            [
                'text' => '___ he comes, we will still start the class.',
                'type' => 'grammar',
                'options' => [
                    ['text' => 'Although', 'correct' => true],
                    ['text' => 'Because', 'correct' => false],
                    ['text' => 'If', 'correct' => false],
                    ['text' => 'So', 'correct' => false],
                ],
            ],
        ];

        foreach ($questions as $q) {
            $question = Question::create(['text' => $q['text'], 'type' => $q['type']]);

            foreach ($q['options'] as $option) {
                Option::create([
                    'question_id' => $question->id,
                    'text' => $option['text'],
                    'is_correct' => $option['correct'],
                ]);
            }
        }
    }
}
