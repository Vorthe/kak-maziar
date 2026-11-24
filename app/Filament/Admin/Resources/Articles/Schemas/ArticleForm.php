<?php

namespace App\Filament\Admin\Resources\Articles\Schemas;

use App\Models\Category;
use Filament\Schemas\Schema;
use Filament\Widgets\Form;

class ArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Form\Select::make('category_id')
                    ->label('Category')
                    ->required()
                    ->options(Category::all()->mapWithKeys(function ($category) {
                        return [$category->id => $category->name];
                    })->toArray())
                    ->searchable()
                    ->preload(),
                Form\TextInput::make('title')
                    ->label('Title')
                    ->required()
                    ->maxLength(255),
                Form\TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
                Form\Textarea::make('content')
                    ->label('Content')
                    ->required()
                    ->rows(12),
                Form\Select::make('level')
                    ->label('Level')
                    ->options([
                        'A1' => 'A1',
                        'A2' => 'A2',
                        'B1' => 'B1',
                        'B2' => 'B2',
                        'C1' => 'C1',
                        'C2' => 'C2',
                    ])
                    ->placeholder('Select level'),
                Form\Toggle::make('is_published')
                    ->label('Is Published')
                    ->default(true),
            ]);
    }
}
