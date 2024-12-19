<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\OrderController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/change-password', [AuthController::class, 'changePassword'])->middleware('auth:sanctum');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/check-email', [AuthController::class, 'checkEmail']);
Route::post('/check-phone', [AuthController::class, 'checkPhone']);

Route::get('/admin/settings', function () {
    return "admin";
})->middleware(CheckRole::class . ':admin');


Route::prefix('admin')->middleware(CheckRole::class . ':admin')->group(function () {
    Route::prefix('overview')->group(function () {
        Route::get('/daily-sales', [ReportController::class, 'dailySales']);
        Route::get('/revenue-statistics', [ReportController::class, 'revenueStatistics']);
        Route::get('/pending-orders', [ReportController::class, 'pendingOrders']);
        Route::get('/top-selling-products', [ReportController::class, 'topSellingProducts']);
    });
    Route::get('/users', [UserController::class, 'getUserByRole']);
    Route::get('/search', [AdminController::class, 'search']);
    Route::prefix('orders')->group(function () {
        Route::post('/create', [OrderController::class, 'createOrder']);
        Route::get('/search', [OrderController::class, 'searchOrder']);
    });
});

Route::prefix('products')->group(function () {
    Route::get('/category/{categoryName}', [ProductController::class, 'getProductsByCategory']);
    Route::get('/random', [ProductController::class, 'getRandomProducts']);
    Route::get('/search', [ProductController::class, 'searchProduct']);
    Route::get('/getAll', [ProductController::class, 'getAllProducts']);
    Route::get('/category', [UserController::class, 'getCategory']);
    Route::post('/create', [ProductController::class, 'createProduct']);
    Route::get('/{id}', [ProductController::class, 'getProductById']);
    Route::post('/update/{id}', [ProductController::class, 'updateProduct']);
    Route::delete('/delete/{id}', [ProductController::class, 'deleteProduct']);
});

Route::prefix('discounts')->group(function () {
    Route::get('/active', [DiscountController::class, 'getActiveDiscountsByOrderAndUser']);
    Route::get('/all', [DiscountController::class, 'getAllDiscountsActive']);
    Route::post('/update-multiple-status', [DiscountController::class, 'updateMultiDiscount']);
});
