<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShippingAddress extends Model
{
    use HasFactory;

    /**
     * Các thuộc tính có thể được gán hàng loạt.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'address',
        'city',
        'postal_code',
        'country',
        'is_default',
    ];

    /**
     * Thiết lập quan hệ với User.
     * Một ShippingAddress thuộc về một User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
