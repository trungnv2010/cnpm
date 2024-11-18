<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'quantity', 'category_id', 'image_path'];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_categories');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function wishlists()
    {
        return $this->belongsToMany(Wishlist::class, 'wishlist_product');
    }
    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'promotion_product');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tag');
    }
}
