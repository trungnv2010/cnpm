<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SingleSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if ($user && $user->active_session && $user->active_session !== $request->session()->getId()) {
            Auth::logout();
            return response()->json(['error' => 'User is already logged in from another device.'], 403);
        }

        $user->active_session = $request->session()->getId();
        $user->save();
        return $next($request);
    }
}
