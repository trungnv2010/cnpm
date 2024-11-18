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
        Schema::create('promotion_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('promotion_id')->constrained()->onDelete('cascade');  // Khóa ngoại liên kết với promotions
            $table->foreignId('product_id')->constrained()->onDelete('cascade');  // Khóa ngoại liên kết với products
            $table->timestamps();

            // Đảm bảo rằng mỗi sản phẩm chỉ xuất hiện một lần trong mỗi chương trình khuyến mãi
            $table->unique(['promotion_id', 'product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotion_product');
    }
};
