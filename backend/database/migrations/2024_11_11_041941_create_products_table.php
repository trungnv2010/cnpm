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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2); // giá với độ chính xác 2 chữ số sau dấu thập phân
            $table->integer('quantity')->default(0); // số lượng mặc định là 0
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade'); // liên kết với bảng categories
            $table->string('image_path')->nullable(); // lưu đường dẫn ảnh của sản phẩm
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
