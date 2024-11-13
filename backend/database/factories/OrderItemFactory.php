<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => \App\Models\Order::inRandomOrder()->first()->id,// Tạo order giả nếu chưa có
            'product_id' => \App\Models\Product::inRandomOrder()->first()->id, // Tạo product giả nếu chưa có
            'quantity' => $this->faker->numberBetween(1, 5), // Số lượng ngẫu nhiên từ 1 đến 5
            'price_at_purchase' => $this->faker->randomFloat(2, 10, 500), // Giá ngẫu nhiên từ 10 đến 500
            'discount_id' => $this->faker->boolean ? \App\Models\Discount::factory() : null,
        ];
    }
}
