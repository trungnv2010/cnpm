<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserByRole(Request $request)
    {
        $roleName = $request->input('role');
        if (!$roleName) {
            return response()->json(['error' => 'Role name is required', 'code' => '400'], 400);
        }

        $user = User::whereHas('role', function ($query) use ($roleName) {
            $query->where('name', $roleName);
        })->get();

        if ($user->isEmpty()){
            return response()->json(['message' => 'No users found for this role', 'code' => '404'], 404);
        }

        return response()->json(['data' => $user, 'code' => '200'], 200);
    }

    public function getCategory() 
    {
        $category = Category::select('id', 'name')->get();
        return response()->json(['data' => $category, 'code' => '200']);
    }
}
