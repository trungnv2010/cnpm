<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wishlist extends Model
{
    use HasFactory;

    // Đặt tên bảng nếu bảng không tuân theo chuẩn tên
    protected $table = 'wishlists';

    // Các thuộc tính có thể gán giá trị
    protected $fillable = [
        'user_id',
        'added_at',
    ];

    // Mối quan hệ N:M với Product thông qua bảng trung gian
    public function products()
    {
        return $this->belongsToMany(Product::class, 'wishlist_product');
    }

    // Mối quan hệ với bảng User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
