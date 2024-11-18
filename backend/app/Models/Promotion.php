<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Promotion extends Model
{
    use HasFactory;

    // Các thuộc tính có thể gán giá trị
    protected $fillable = [
        'name',
        'description',
        'type',
        'start_date',
        'end_date',
    ];

    // Mối quan hệ với bảng Product (N:M)
    public function products()
    {
        return $this->belongsToMany(Product::class, 'promotion_product');
    }
}
