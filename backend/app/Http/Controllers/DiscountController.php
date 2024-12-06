<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Discount;

class DiscountController extends Controller
{
    public function index()
    {
        $discounts = Discount::all();
        return response()->json(['data' => $discounts, 'code' => '200'], 200);
    }

    public function create(Request $request)
    {
        $discount = Discount::create($request->all());
        if ($discount) {
            return response()->json(['data' => $discount, 'code' => '200'], 200);
        } else {
            return response()->json(['message' => 'Discount creation failed', 'code' => '400'], 400);
        }
    }

    public function update(Request $request, $id)
    {
        $discount = Discount::find($id);
        if ($discount) {
            $discount->update($request->all());
            return response()->json(['data' => $discount, 'code' => '200'], 200);
        } else {
            return response()->json(['message' => 'Discount not found', 'code' => '404'], 404);
        }
    }

    public function delete($id)
    {
        $discount = Discount::find($id);
        if ($discount) {
            $discount->delete();
            return response()->json(['message' => 'Discount deleted', 'code' => '200'], 200);
        } else {
            return response()->json(['message' => 'Discount not found', 'code' => '404'], 404);
        }
    }

    public function getActiveDiscountsByOrderAndUser(Request $request)
    {
        $totalAmount = $request->input('total_amount');
        $userId = $request->input('user_id');
        if ($userId == null || $totalAmount == null) {
            return response()->json(['message' => "Không có mã giảm giá nào", 'code' => '404'], 404);
        }
        $discounts = Discount::active()->where('min_purchase_amount', '<=', $totalAmount)
            ->where('usage_limit', '>', function ($query) use ($userId) {
                $query->selectRaw('COUNT(*)')
                    ->from('discount_usages')
                    ->where('discount_id', '=', 'discounts.id')
                    ->where('user_id', '=', $userId);
            })->get();

        if ($discounts->isEmpty()) {
            return response()->json(['message' => "Không có mã giảm giá nào", 'code' => '404'], 404);
        }

        return response()->json(['data' => $discounts, 'code' => '200'], 200);
    }
}
