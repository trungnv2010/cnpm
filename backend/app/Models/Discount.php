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
}
