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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Liên kết với bảng users
            $table->string('status')->default('pending'); // Trạng thái đơn hàng (ví dụ: pending, completed)
            $table->decimal('total_amount', 10, 2); // Tổng số tiền của đơn hàng
            $table->string('payment_status')->default('unpaid'); // Trạng thái thanh toán (ví dụ: unpaid, paid)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
