<?php

namespace App\Filament\Admin\Resources\ClassRequest;

use App\Filament\Admin\Resources\ClassRequest\Schemas\ClassRequestForm;
use App\Filament\Admin\Resources\ClassRequest\Tables\ClassRequestsTable;
use App\Filament\Admin\Resources\ClassRequest\Pages\ListClassRequests;
use App\Models\ClassRequest;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ClassRequestResource extends Resource
{
    protected static ?string $model = ClassRequest::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCalendar;

    public static function form(Schema $schema): Schema
    {
        return ClassRequestForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ClassRequestsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListClassRequests::route('/'),
        ];
    }
}
