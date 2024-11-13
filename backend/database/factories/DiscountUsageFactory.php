<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DiscountUsage>
 */
class DiscountUsageFactory extends Factory
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
            'discount_id' => \App\Models\Discount::inRandomOrder()->first()->id, // Tạo một Discount mẫu nếu chưa có
            'used_at' => $this->faker->optional()->dateTime(), // Ngày sử dụng ngẫu nhiên hoặc null
        ];
    }
}
