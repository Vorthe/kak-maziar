<?php

namespace App\Filament\Admin\Resources\Product\Pages;

use App\Filament\Admin\Resources\Product\ProductResource;
use Filament\Resources\Pages\EditRecord;

class EditProduct extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected function getCreatedNotificationTitle(): string
    {
        return 'Product updated successfully.';
    }
}
