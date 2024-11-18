<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{

    protected $model = \App\Models\Product::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(), // Tên sản phẩm giả
            'description' => $this->faker->sentence(), // Mô tả ngắn gọn
            'price' => $this->faker->randomFloat(2, 10, 500), // Giá sản phẩm từ 10 đến 500
            'quantity' => $this->faker->numberBetween(1, 100), // Số lượng ngẫu nhiên từ 1 đến 100
           'category_id' => Category::inRandomOrder()->first()->id, // tạo category giả nếu chưa có
            'image_path' => "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600", // Đường dẫn ảnh ngẫu nhiên
        ];
    }
}
