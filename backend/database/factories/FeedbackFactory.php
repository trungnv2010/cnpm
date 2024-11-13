<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feedback>
 */
class FeedbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id, // Tạo user giả nếu chưa có
            'content' => $this->faker->paragraph(), // Nội dung phản hồi ngẫu nhiên
            'status' => $this->faker->randomElement(['pending', 'reviewed', 'resolved']), // Trạng thái phản hồi
        ];
    }
}
