<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Tên chương trình khuyến mãi
            $table->text('description')->nullable();  // Mô tả chi tiết về chương trình
            $table->enum('type', ['discount', 'buy_x_get_y', 'bundle', 'flash_sale']);  // Loại khuyến mãi
            $table->dateTime('start_date');  // Ngày bắt đầu khuyến mãi
            $table->dateTime('end_date');  // Ngày kết thúc khuyến mãi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
