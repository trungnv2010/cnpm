<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function search(Request $request)
    {
        $keyword = $request->input('query');

        if (empty($keyword)) {
            $customers = User::with(['shippingAddresses:id,user_id,address,is_default'])
                ->where('role_id', 2)
                ->inRandomOrder()
                ->limit(10)
                ->get(['id', 'name', 'phone']);
        } else {
            $customers = User::with(['shippingAddresses:id,user_id,address,is_default'])
                ->where('role_id', 3)->where(function ($query) use ($keyword) {
                    $query->where('name', 'like', '%' . $keyword . '%')->orWhere('phone', 'like', '%' . $keyword . '%');
                })->get(['id', 'name', 'phone']);
        }

        return response()->json(['data' => $customers, 'code' => '200'], 200);
    }


}
