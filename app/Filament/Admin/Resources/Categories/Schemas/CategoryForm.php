<?php

namespace App\Filament\Admin\Resources\Categories\Schemas;

use Filament\Schemas\Schema;
use Filament\Widgets\Form;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Form\TextInput::make('name')
                    ->label('Name')
                    ->required()
                    ->maxLength(255),
                Form\TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
            ]);
    }
}
