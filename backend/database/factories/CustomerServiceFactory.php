<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CustomerService>
 */
class CustomerServiceFactory extends Factory
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
            'request_type' => $this->faker->randomElement(['complaint', 'inquiry', 'support']), // Loại yêu cầu
            'content' => $this->faker->paragraph(), // Nội dung yêu cầu giả
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'resolved']), // Trạng thái ngẫu nhiên
        ];
    }
}
