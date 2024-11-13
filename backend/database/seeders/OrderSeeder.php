<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Xác định khoảng thời gian từ đầu năm ngoái đến hiện tại
         $startDate = Carbon::now()->subYear()->startOfYear();
         $endDate = Carbon::now();
 
         // Tạo 1000 đơn hàng với các thời gian ngẫu nhiên
         Order::factory()->count(1000)->create([
             'created_at' => function() use ($startDate, $endDate) {
                 // Sinh ra ngày ngẫu nhiên giữa startDate và endDate
                 return Carbon::createFromTimestamp(rand($startDate->timestamp, $endDate->timestamp));
             },
             'updated_at' => function() use ($startDate, $endDate) {
                 // Sinh ra ngày cập nhật ngẫu nhiên giữa startDate và endDate
                 return Carbon::createFromTimestamp(rand($startDate->timestamp, $endDate->timestamp));
             }
         ]);
    }
}
