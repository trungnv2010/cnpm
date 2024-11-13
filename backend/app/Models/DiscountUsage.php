<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class DiscountUsage extends Model
{
    use HasFactory;

    /**
     * Các thuộc tính có thể được gán hàng loạt.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'discount_id',
        'used_at',
    ];

    /**
     * Thiết lập quan hệ với User.
     * Một DiscountUsage thuộc về một User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Thiết lập quan hệ với Discount.
     * Một DiscountUsage thuộc về một Discount.
     */
    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }
}
