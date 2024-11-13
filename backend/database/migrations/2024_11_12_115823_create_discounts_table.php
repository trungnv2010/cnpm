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
            $table->string('code')->unique();
            $table->enum('type', ['percentage', 'fixed'])->default('fixed'); // Loại giảm giá
            $table->decimal('amount', 8, 2); // Giá trị giảm giá
            $table->date('expiry_date')->nullable(); // Ngày hết hạn, có thể null nếu không có ngày hết hạn
            $table->integer('usage_limit')->nullable(); // Giới hạn số lần sử dụng, có thể để trống
            $table->timestamps();
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
