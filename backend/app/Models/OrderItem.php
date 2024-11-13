<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price_at_purchase',
        'discount_id',
    ];

    /**
     * Thiết lập quan hệ với Order.
     * Một OrderItem thuộc về một Order.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Thiết lập quan hệ với Product.
     * Một OrderItem thuộc về một Product.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Thiết lập quan hệ với Discount.
     * Một OrderItem có thể liên kết với một Discount.
     */
    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }
}
