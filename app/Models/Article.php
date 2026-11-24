<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
    protected $fillable = ['category_id', 'title', 'slug', 'content', 'level', 'is_published'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
