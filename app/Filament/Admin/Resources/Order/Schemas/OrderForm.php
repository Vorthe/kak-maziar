<?php

namespace App\Filament\Admin\Resources\Order\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('total')
                    ->label('Total (Toman)')
                    ->required()
                    ->numeric()
                    ->minValue(0),

                TextInput::make('status')
                    ->label('Status')
                    ->required()
                    ->default('pending')
                    ->maxLength(50),
            ]);
    }
}
