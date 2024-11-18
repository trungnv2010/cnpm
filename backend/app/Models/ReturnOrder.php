<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ReturnOrder extends Model
{
    use HasFactory;
    protected $table = 'return_orders';

    // Các thuộc tính có thể gán giá trị
    protected $fillable = [
        'order_id',
        'user_id',
        'reason',
        'status',
        'refund_amount',
        'requested_at',
        'processed_at',
    ];

    // Các mối quan hệ (nếu có)
    
    // Liên kết với bảng Orders
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Liên kết với bảng Users
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
