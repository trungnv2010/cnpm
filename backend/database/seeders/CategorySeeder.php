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
            'Men',
            'Women',
            'Kid & Baby',
            'Home',
            'Gift',
            'Sale',
        ];

        foreach ($categories as $categoryName) {
            Category::create([
                'name' => $categoryName,
                'description' => $categoryName . ' category description',
            ]);
        }

    }
}
