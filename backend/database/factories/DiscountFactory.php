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
            

            'code' => strtoupper(Str::random(8)), // Mã giảm giá ngẫu nhiên với 8 ký tự
            'type' => $this->faker->randomElement(['percentage', 'fixed']),
            'amount' => $this->faker->randomFloat(2, 5, 50), // Giá trị giảm từ 5 đến 50
            'expiry_date' => $this->faker->optional()->date(), // Ngày hết hạn ngẫu nhiên hoặc null
            'min_purchase_amount' => $this->faker->optional()->randomFloat(2, 10, 100), // Số tiền tối thiểu ngẫu nhiên hoặc null
            'is_active' => $this->faker->boolean(chanceOfGettingTrue: 80), // 80% số lượng hoạt động
            'description' => $this->faker->optional()->sentence(), // Mô tả ngẫu nhiên hoặc null
            'usage_limit' => $this->faker->optional()->numberBetween(1, 100), // Giới hạn ngẫu nhiên hoặc null
        ];
    }
}
