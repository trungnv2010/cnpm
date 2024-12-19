<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Discount;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

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

    public function getAllDiscountsActive(Request $request)
    {
        try {
            // Xử lý các tham số đầu vào
            $perPage = $request->input('per_page', 10); // Số item trên mỗi trang, mặc định là 10

            // Query builder với các điều kiện
            $query = Discount::query();




            // Thực hiện phân trang
            $discounts = $query->paginate($perPage);

            // Format dữ liệu trả về
            $data = [
                'data' => $discounts->items(),
                'pagination' => [
                    'current_page' => $discounts->currentPage(),
                    'last_page' => $discounts->lastPage(),
                    'per_page' => $discounts->perPage(),
                    'total' => $discounts->total()
                ],
                'code' => '200'
            ];

            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra khi lấy danh sách voucher',
                'error' => $e->getMessage(),
                'code' => '500'
            ], 500);
        }
    }
    public function updateMultiDiscount(Request $request)
    {
        try {
            // Validate request data
            $request->validate([
                'data' => 'required|array',
                'data.*.id' => 'required|exists:discounts,id',
                'data.*.is_active' => 'required|boolean'
            ]);

            DB::beginTransaction();

            foreach ($request->input('data') as $item) {
                $discount = Discount::findOrFail($item['id']);

                // Only update allowed fields
                $discount->update([
                    'is_active' => $item['is_active']
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Cập nhật trạng thái thành công',
                'code' => '200'
            ], 200);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ',
                'errors' => $e->errors(),
                'code' => '422'
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi xảy ra khi cập nhật',
                'error' => $e->getMessage(),
                'code' => '500'
            ], 500);
        }
    }
}
