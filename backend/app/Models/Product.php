<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'brand',
        'category',
        'price',
        'old_price',
        'stock',
        'badge',
        'icon',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'old_price' => 'decimal:2',
            'stock' => 'integer',
        ];
    }
}
