<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'type',
        'amount',
        'expiry_date',
        'usage_limit',
    ];

    /**
     * Relationship to get all orders that use this discount.
     */
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'discount_order');
    }
}
