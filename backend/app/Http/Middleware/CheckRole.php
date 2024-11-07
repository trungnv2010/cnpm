<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json([
                'error' => 'Unauthorized: Token is invalid or has expired.',
            ], 401);
        }

        // Kiểm tra vai trò của người dùng
        if ($user->role !== $role) {
            return response()->json([
                'error' => 'Forbidden: Bạn không có quyền truy cập.',
            ], 403);
        }

        return $next($request);
    }
}
