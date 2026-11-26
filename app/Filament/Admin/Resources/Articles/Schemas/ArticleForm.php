<?php

namespace App\Filament\Admin\Resources\Articles\Schemas;

use App\Models\Category;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('category_id')
                    ->label('Category')
                    ->required()
                    ->options(Category::all()->pluck('name', 'id')->toArray())
                    ->searchable(false)
                    ->preload(false),
                TextInput::make('title')
                    ->label('Title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
                Textarea::make('content')
                    ->label('Content')
                    ->required()
                    ->rows(12),
                Select::make('level')
                    ->label('Level')
                    ->options([
                        'A1' => 'A1',
                        'A2' => 'A2',
                        'B1' => 'B1',
                        'B2' => 'B2',
                        'C1' => 'C1',
                        'C2' => 'C2',
                    ])
                    ->placeholder('Select level')
                    ->nullable(),
                Toggle::make('is_published')
                    ->label('Is Published')
                    ->default(true),
            ]);
    }
}
