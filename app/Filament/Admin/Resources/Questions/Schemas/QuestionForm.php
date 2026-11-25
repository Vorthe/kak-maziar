<?php

namespace App\Filament\Admin\Resources\Questions\Schemas;

use Filament\Schemas\Schema;
use Filament\Widgets\Form;

class QuestionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Form\Textarea::make('text')
                    ->label('Question Text')
                    ->required()
                    ->rows(3),
                Form\Select::make('type')
                    ->label('Type')
                    ->options([
                        'grammar' => 'Grammar',
                        'vocabulary' => 'Vocabulary',
                    ])
                    ->required()
                    ->default('grammar'),
            ]);
    }
}
