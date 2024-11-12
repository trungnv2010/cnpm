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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // Mã giảm giá duy nhất
            $table->string('type'); // Loại giảm giá (ví dụ: percentage, fixed_amount)
            $table->decimal('amount', 10, 2); // Giá trị giảm giá
            $table->date('expiry_date')->nullable(); // Ngày hết hạn của mã giảm giá
            $table->integer('usage_limit')->default(1); // Giới hạn số lần sử dụng
            $table->timestamps();
        });
    
        // Tạo bảng trung gian cho quan hệ nhiều-nhiều với Order
        Schema::create('discount_order', function (Blueprint $table) {
            $table->id();
            $table->foreignId('discount_id')->constrained('discounts')->onDelete('cascade');
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
