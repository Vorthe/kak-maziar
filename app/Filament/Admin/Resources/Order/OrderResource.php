<?php

namespace App\Filament\Admin\Resources\Order;

use App\Filament\Admin\Resources\Order\Pages\CreateOrder;
use App\Filament\Admin\Resources\Order\Pages\EditOrder;
use App\Filament\Admin\Resources\Order\Pages\ListOrders;
use App\Filament\Admin\Resources\Order\Schemas\OrderForm;
use App\Filament\Admin\Resources\Order\Tables\OrderTable;
use App\Models\Order;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Orders';
    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return OrderForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OrderTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOrders::route('/'),
            'create' => CreateOrder::route('/create'),
            'edit' => EditOrder::route('/{record}/edit'),
        ];
    }

    public static function getModelLabel(): string
    {
        return 'Order';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Orders';
    }
}
