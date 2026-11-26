<?php

namespace App\Filament\Admin\Resources\Product;

use App\Filament\Admin\Resources\Product\Pages\CreateProduct;
use App\Filament\Admin\Resources\Product\Pages\EditProduct;
use App\Filament\Admin\Resources\Product\Pages\ListProducts;
use App\Filament\Admin\Resources\Product\Schemas\ProductForm;
use App\Filament\Admin\Resources\Product\Tables\ProductTable;
use App\Models\Product;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-cube';
    protected static ?string $navigationLabel = 'Products';
    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return ProductForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProductTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProducts::route('/'),
            'create' => CreateProduct::route('/create'),
            'edit' => EditProduct::route('/{record}/edit'),
        ];
    }

    public static function getModelLabel(): string
    {
        return 'Product';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Products';
    }
}
