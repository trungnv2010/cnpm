<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Discount extends Model
{
    use HasFactory;

    /**
     * Các thuộc tính có thể được gán hàng loạt.
     *
     * @var array
     */
    protected $fillable = [
        'code',
        'type',
        'amount',
        'expiry_date',
        'usage_limit',
        'min_purchase_amount',
        'is_active',
        'description',
    ];

    /**
     * Thiết lập quan hệ với OrderItem.
     * Một Discount có thể được áp dụng cho nhiều OrderItem.
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Thiết lập quan hệ với DiscountUsage.
     * Một Discount có thể có nhiều DiscountUsage (nhiều lần sử dụng).
     */
    public function discountUsages()
    {
        return $this->hasMany(DiscountUsage::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('expiry_date')
                    ->orWhere('expiry_date', '>=', now());
            });
    }

    public function isValidForOrder($order)
    {
        return $this->active()
            ->where('min_purchase_amount', '<=', $order->total_amount)
            ->exists();
    }
}
