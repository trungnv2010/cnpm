<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReturnOrder>
 */
class ReturnOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => \App\Models\Order::factory(), // Tạo Order mẫu
            'user_id' => \App\Models\User::factory(), // Tạo User mẫu
            'reason' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected', 'completed']),
            'refund_amount' => $this->faker->randomFloat(2, 10, 1000), // Hoàn tiền ngẫu nhiên
            'requested_at' => $this->faker->dateTimeThisYear(),
            'processed_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}
