<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            ShippingAddressSeeder::class,
            OrderSeeder::class,
            OrderItemSeeder::class,
            DiscountSeeder::class,
            DiscountUsageSeeder::class,
            ReviewSeeder::class,
            NotificationSeeder::class,
            FeedbackSeeder::class,
            ReportSeeder::class,
            CustomerServiceSeeder::class,
            CartSeeder::class,
            CartItemSeeder::class,
        ]);
    }
}
