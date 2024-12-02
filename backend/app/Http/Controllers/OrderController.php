<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use App\Models\Discount;
use App\Models\DiscountUsage;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        // Validate request data
        $validated = $request->validate([
            'order' => 'required|array',
            'user_id' => 'required|exists:users,id',
            'discount_id' => 'nullable|exists:discounts,id',
            'order_items' => 'required|array'
        ]);

        try {
            DB::beginTransaction();


            $order = Order::create($request->order);

            // Assuming order_items needs order_id
            $order_items = collect($request->order_items)->map(function ($item) use ($order) {
                $item['order_id'] = $order->id;
                return $item;
            })->toArray();



            OrderItem::insert($order_items);

            if ($request->discount_id) {
                DiscountUsage::create([
                    'user_id' => $request->user_id,
                    'discount_id' => $request->discount_id,
                ]);

                $discount = Discount::find($request->discount_id);
                
                if ($discount->usage_limit > 0) {
                    $discount->decrement('usage_limit', 1);
                }
            }


            DB::commit();
            return response()->json([
                'message' => 'Đơn hàng đã được tạo thành công',
                'code' => 200
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi xảy ra khi tạo đơn hàng',
                'error' => $e->getMessage(),
                'code' => 500
            ], 500);
        }
    }

    public function searchOrder(Request $request) {
        $keyword = $request->input('query');
        $filter = $request->input('filter');
        if ($filter == 'all'){
            
        }
        if (empty($keyword)) {
            $orders = Order::inRandomOrder()->limit(20)->get();
        } else {
            $orders = Order::where('name', 'like', '%' . $keyword . '%')->get();
        }
    }
}
