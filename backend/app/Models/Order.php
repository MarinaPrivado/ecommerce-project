<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'client_id',
        'total',
        'status',
        'items',
    ];

    protected function casts(): array
    {
        return [
            'total' => 'decimal:2',
            'items' => 'array',
        ];
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
