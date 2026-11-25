<?php

namespace App\Filament\Admin\Resources\Questions\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class QuestionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('text')
                    ->label('Question')
                    ->searchable()
                    ->limitList(30),
                TextColumn::make('type')
                    ->label('Type')
                    ->formatStateUsing(fn($state) => ucfirst($state))
                    ->searchable(),
                TextColumn::make('options_count')
                    ->label('Options')
                    ->counts('options'),
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
