<?php

namespace App\Filament\Admin\Resources\Articles\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
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
                    ->relationship('category', 'name')
                    ->required(),
                TextInput::make('title')
                    ->label('Title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
                TextInput::make('level')
                    ->label('Level')
                    ->required()
                    ->numeric()
                    ->default(1),
                \Filament\Forms\Components\Textarea::make('content')
                    ->label('Content')
                    ->required()
                    ->rows(10)
                    ->columnSpanFull(),
                Toggle::make('is_published')
                    ->label('Is Published')
                    ->default(false),
            ]);
    }
}
