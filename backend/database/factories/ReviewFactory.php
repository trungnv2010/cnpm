<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::inRandomOrder()->first()->id, // Tạo user giả nếu chưa có
            'product_id' => \App\Models\Product::inRandomOrder()->first()->id, // Tạo product giả nếu chưa có
            'rating' => $this->faker->numberBetween(1, 5), // Đánh giá từ 1 đến 5
            'comment' => $this->faker->sentence(), // Bình luận ngẫu nhiên
        ];
    }
}
