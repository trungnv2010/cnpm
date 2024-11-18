<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\UserController;

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
});
