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
            'user_id' => \App\Models\User::inRandomOrder()->first()->id, 
            'assigned_staff_id' => \App\Models\User::inRandomOrder()->first()->id,
            'status' => $this->faker->randomElement(['pending', 'completed', 'canceled']),
            'total_amount' => $this->faker->randomFloat(2, 10, 1000), 
            'payment_status' => $this->faker->randomElement(['unpaid', 'paid', 'refunded']),
            'delivery_status' => $this->faker->randomElement(['pending', 'shipped', 'delivered', 'returned', 'canceled']),
            'completed_at' => $this->faker->optional()->dateTimeThisYear(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
