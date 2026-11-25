<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassRequest extends Model
{
    use HasFactory;

    /** @var list<string> */
    protected $fillable = [
        'user_id',
        'status',
        'proposed_time',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'proposed_time' => 'datetime',
    ];

    /** {@inheritDoc} */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
