<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
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
            'title' => $this->faker->sentence(6), // Tiêu đề ngẫu nhiên
            'message' => $this->faker->paragraph(), // Nội dung thông báo ngẫu nhiên
            'is_read' => $this->faker->boolean(20), // 20% khả năng là đã đọc
        ];
    }
}
