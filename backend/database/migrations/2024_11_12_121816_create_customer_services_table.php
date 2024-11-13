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
        Schema::create('customer_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Liên kết với bảng users
            $table->string('request_type'); // Loại yêu cầu hỗ trợ (ví dụ: complaint, inquiry, support)
            $table->text('content'); // Nội dung yêu cầu hỗ trợ
            $table->string('status')->default('pending'); // Trạng thái xử lý yêu cầu (pending, in_progress, resolved)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_services');
    }
};
