<?php

namespace App\Filament\Admin\Resources\Questions\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;

class QuestionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Textarea::make('text')
                    ->label('Question Text')
                    ->required()
                    ->rows(3),
                Select::make('type')
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
