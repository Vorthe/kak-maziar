<?php

namespace App\Filament\Admin\Resources\Order\Pages;

use App\Filament\Admin\Resources\Order\OrderResource;
use Filament\Resources\Pages\CreateRecord;

class CreateOrder extends CreateRecord
{
    protected static string $resource = OrderResource::class;

    protected function getCreatedNotificationTitle(): string
    {
        return 'Order created successfully.';
    }
}
