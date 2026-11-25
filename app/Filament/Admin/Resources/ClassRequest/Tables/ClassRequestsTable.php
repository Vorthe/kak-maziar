<?php

namespace App\Filament\Admin\Resources\ClassRequest\Tables;

use App\Filament\Admin\Resources\ClassRequest\Schemas\ClassRequestForm;
use Filament\Actions\Action;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ClassRequestsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('User Name')
                    ->searchable(),
                TextColumn::make('status')
                    ->label('Status')
                    ->formatStateUsing(function ($state) {
                        return ucfirst($state);
                    })
                    ->badge(),
                TextColumn::make('proposed_time')
                    ->label('Proposed Time')
                    ->dateTime()
                    ->placeholder('-'),
            ])
            ->recordActions([
                Action::make('set_time')
                    ->label('Set Time')
                    ->schema([
                        \Filament\Forms\Components\DateTimePicker::make('proposed_time')
                            ->label('Select Date and Time')
                            ->required(),
                    ])
                    ->action(function (array $data, $record) {
                        $record->update([
                            'proposed_time' => $data['proposed_time'],
                            'status' => 'proposed',
                        ]);
                    }),
            ])
            ->toolbarActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
