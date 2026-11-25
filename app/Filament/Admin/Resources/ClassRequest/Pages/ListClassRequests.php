<?php

namespace App\Filament\Admin\Resources\ClassRequest\Pages;

use App\Filament\Admin\Resources\ClassRequest\ClassRequestResource;
use Filament\Resources\Pages\ListRecords;

class ListClassRequests extends ListRecords
{
    protected static string $resource = ClassRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            //
        ];
    }
}
