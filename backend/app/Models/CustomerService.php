<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CustomerService extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'request_type',
        'content',
        'status',
    ];

    /**
     * Relationship to get the user who made the request.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
