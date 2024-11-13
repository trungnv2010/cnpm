<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShippingAddress>
 */
class ShippingAddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::inRandomOrder()->first()->id, // Tạo một User mẫu nếu chưa có
            'address' => $this->faker->streetAddress, // Địa chỉ ngẫu nhiên
            'city' => $this->faker->city, // Thành phố ngẫu nhiên
            'postal_code' => $this->faker->postcode, // Mã bưu điện ngẫu nhiên
            'country' => $this->faker->country, // Quốc gia ngẫu nhiên
            'is_default' => $this->faker->boolean(20), // 20% khả năng là địa chỉ mặc định
        ];
    }
}
