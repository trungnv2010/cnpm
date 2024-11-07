<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (!$request->hasHeader('Authorization')) {
            return response()->json([
                'error' => 'Token does not exist in the request.',
            ], 401);
        }


        $token = $request->bearerToken();


        if (!Auth::guard('sanctum')->check()) {
            return response()->json([
                'error' => 'Token is invalid or has expired.',
            ], 401);
        }
        return $next($request);
    }
}
