<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'rating',
        'comment',
    ];

    /**
     * Relationship to get the user who made the review.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship to get the product being reviewed.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
