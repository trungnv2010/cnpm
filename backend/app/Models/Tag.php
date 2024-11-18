<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends Model
{
    use HasFactory;

    // Các thuộc tính có thể gán giá trị
    protected $fillable = [
        'name',
    ];

    // Mối quan hệ N:M với bảng Product
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_tag');
    }
}
