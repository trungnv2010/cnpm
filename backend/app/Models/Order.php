<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'shipping_address_id',
        'status',
        'total_amount',
        'payment_status',
        'completed_at',
    ];

    /**
     * Thiết lập quan hệ với User.
     * Một Order thuộc về một User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Thiết lập quan hệ với ShippingAddress.
     * Một Order sử dụng một ShippingAddress.
     */
    public function shippingAddress()
    {
        return $this->belongsTo(ShippingAddress::class);
    }

    /**
     * Thiết lập quan hệ với OrderItem.
     * Một Order có thể có nhiều OrderItem.
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Thiết lập quan hệ với DiscountUsage.
     * Một Order có thể có nhiều DiscountUsage.
     */
    public function discountUsages()
    {
        return $this->hasMany(DiscountUsage::class);
    }
}
