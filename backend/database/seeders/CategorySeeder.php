<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Men', 'description' => 'Products for men'],
            ['name' => 'Women', 'description' => 'Products for women'],
            ['name' => 'Kid & Baby', 'description' => 'Products for kids and babies'],
            ['name' => 'Home', 'description' => 'Home products'],
            ['name' => 'Gift', 'description' => 'Gift products'],
            ['name' => 'Sale', 'description' => 'Products on sale'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
