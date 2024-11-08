<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckApiKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = $request->header('X-API-KEY');

        // Kiểm tra API key với giá trị trong file .env
        if (!$apiKey || $apiKey !== config('app.key')) {
            return response()->json(['error' => 'Unauthorized: API key không hợp lệ'], 401);
        }
        return $next($request);
    }
}
