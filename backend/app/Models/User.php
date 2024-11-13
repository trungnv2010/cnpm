<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'address',
        'role_id',
    ];

    /**
     * Thuộc tính sẽ bị ẩn trong mảng.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Thiết lập quan hệ với Role.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Thiết lập quan hệ với Order.
     * Một User có nhiều Order.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Thiết lập quan hệ với Review.
     * Một User có nhiều Review.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Thiết lập quan hệ với Notification.
     * Một User có nhiều Notification.
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    /**
     * Thiết lập quan hệ với Feedback.
     * Một User có nhiều Feedback.
     */
    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }

    /**
     * Thiết lập quan hệ với DiscountUsage.
     * Một User có nhiều DiscountUsage.
     */
    public function discountUsages()
    {
        return $this->hasMany(DiscountUsage::class);
    }

    /**
     * Thiết lập quan hệ với CustomerService.
     * Một User có thể có nhiều yêu cầu CustomerService.
     */
    public function customerServices()
    {
        return $this->hasMany(CustomerService::class);
    }

    /**
     * Thiết lập quan hệ với ShippingAddress.
     * Một User có nhiều ShippingAddress.
     */
    public function shippingAddresses()
    {
        return $this->hasMany(ShippingAddress::class);
    }
}
