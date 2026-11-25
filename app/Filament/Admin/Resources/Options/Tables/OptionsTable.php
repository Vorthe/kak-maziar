<?php

namespace App\Filament\Admin\Resources\Options\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;

class OptionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('question.text')
                    ->label('Question')
                    ->searchable()
                    ->limitList(30),
                TextColumn::make('text')
                    ->label('Option')
                    ->searchable()
                    ->limitList(30),
                IconColumn::make('is_correct')
                    ->label('Correct')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
