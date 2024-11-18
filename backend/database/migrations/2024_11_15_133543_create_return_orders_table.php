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
        Schema::create('return_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade'); 
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            $table->string('reason'); // Lý do trả hàng
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending'); // Trạng thái trả hàng
            $table->decimal('refund_amount', 10, 2); // Số tiền hoàn lại
            $table->timestamp('requested_at')->nullable(); // Thời gian yêu cầu trả hàng
            $table->timestamp('processed_at')->nullable(); // Thời gian xử lý trả hàng
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('return_orders');
    }
};
