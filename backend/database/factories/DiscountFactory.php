<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Discount>
 */
class DiscountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => strtoupper(Str::random(10)), // Mã giảm giá ngẫu nhiên
            'type' => $this->faker->randomElement(['percentage', 'fixed_amount']), // Loại mã giảm giá
            'amount' => $this->faker->randomFloat(2, 5, 50), // Giá trị giảm ngẫu nhiên từ 5 đến 50
            'expiry_date' => $this->faker->optional()->dateTimeBetween('+1 week', '+1 month'), // Ngày hết hạn ngẫu nhiên
            'usage_limit' => $this->faker->numberBetween(1, 10), // Giới hạn sử dụng ngẫu nhiên từ 1 đến 10
        ];
    }
}
