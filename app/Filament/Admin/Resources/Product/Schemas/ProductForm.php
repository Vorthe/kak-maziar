<?php

namespace App\Filament\Admin\Resources\Product\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Name')
                    ->required()
                    ->maxLength(255),

                TextInput::make('price')
                    ->label('Price (Toman)')
                    ->required()
                    ->numeric()
                    ->minValue(0),

                FileUpload::make('cover_image')
                    ->label('Cover Image')
                    ->image()
                    ->disk('local')
                    ->directory('private/products')
                    ->visibleOn('create', 'edit'),

                FileUpload::make('file_path')
                    ->label('Product File (PDF/ZIP)')
                    ->disk('local')
                    ->directory('private/products')
                    ->required(),

                Textarea::make('description')
                    ->label('Description')
                    ->maxLength(65535)
                    ->nullable(),
            ]);
    }
}
