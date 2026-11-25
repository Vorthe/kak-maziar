<?php

namespace App\Filament\Admin\Resources\ClassRequest\Schemas;

use Filament\Schemas\Schema;
use Filament\Widgets\Form;

class ClassRequestForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Form\DateTimePicker::make('proposed_time')
                    ->label('Proposed Time')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
