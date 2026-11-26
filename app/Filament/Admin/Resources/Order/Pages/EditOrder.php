<?php

namespace App\Filament\Admin\Resources\Order\Pages;

use App\Filament\Admin\Resources\Order\OrderResource;
use Filament\Resources\Pages\EditRecord;

class EditOrder extends EditRecord
{
    protected static string $resource = OrderResource::class;

    protected function getCreatedNotificationTitle(): string
    {
        return 'Order updated successfully.';
    }
}
