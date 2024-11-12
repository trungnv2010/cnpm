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
            'user_id' => \App\Models\User::inRandomOrder()->first()->id, // Tạo người dùng giả nếu chưa có
            'status' => $this->faker->randomElement(['pending', 'completed', 'shipped', 'cancelled']),
            'total_amount' => $this->faker->randomFloat(2, 50, 1000), // Tổng số tiền ngẫu nhiên từ 50 đến 1000
            'payment_status' => $this->faker->randomElement(['unpaid', 'paid']),
        ];
    }
}
