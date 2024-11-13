<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
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
            'shipping_address_id' => \App\Models\ShippingAddress::inRandomOrder()->first()->id, // Tạo một ShippingAddress mẫu
            'status' => $this->faker->randomElement(['pending', 'completed', 'canceled']),
            'total_amount' => $this->faker->randomFloat(2, 50, 1000), // Số tiền từ 50 đến 1000
            'payment_status' => $this->faker->randomElement(['unpaid', 'paid']),
            'completed_at' => $this->faker->optional()->dateTime(), // Ngày hoàn tất ngẫu nhiên, có thể null
        ];
    }
}
