<?php

namespace App\Filament\Admin\Resources\Options\Schemas;

use Filament\Schemas\Schema;
use Filament\Widgets\Form;

class OptionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Form\TextInput::make('text')
                    ->label('Option Text')
                    ->required()
                    ->maxLength(255),
                Form\Toggle::make('is_correct')
                    ->label('Is Correct Answer')
                    ->helperText('Check this box if this is the correct answer.')
                    ->default(false),
            ]);
    }
}
