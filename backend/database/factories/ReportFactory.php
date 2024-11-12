<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'report_type' => $this->faker->randomElement(['sales', 'inventory', 'user_activity']), // Loại báo cáo ngẫu nhiên
            'data' => json_encode([
                'example_key' => $this->faker->word(),
                'value' => $this->faker->randomNumber(),
            ]), // Dữ liệu giả dưới dạng JSON
            'generated_at' => $this->faker->dateTimeBetween('-1 month', 'now'), // Thời gian tạo báo cáo ngẫu nhiên trong 1 tháng gần đây
        ];
    }
}
