<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    /**
     * Các thuộc tính có thể được gán hàng loạt.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Thiết lập quan hệ với User.
     * Một Role có thể có nhiều User.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
