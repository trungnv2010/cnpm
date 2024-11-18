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
        Schema::create('product_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');  // Khóa ngoại liên kết với bảng products
            $table->foreignId('tag_id')->constrained()->onDelete('cascade');  // Khóa ngoại liên kết với bảng tags
            $table->timestamps();

            // Đảm bảo mỗi sản phẩm chỉ có thể liên kết một lần với mỗi thẻ
            $table->unique(['product_id', 'tag_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_tag');
    }
};
