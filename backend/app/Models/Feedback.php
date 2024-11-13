<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedbacks';

    protected $fillable = [
        'user_id',
        'content',
        'status',
    ];

    /**
     * Relationship to get the user who made the feedback.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
