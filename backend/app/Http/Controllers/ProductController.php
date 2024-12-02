<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{
    public function searchProduct(Request $request)
    {
        $query = Product::select('id', 'name', 'quantity', 'price',  'created_at')
        ->get()
        ->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'quantity' => $product->quantity,
                'price' => $product->price,
                'created_at' => $product->created_at,
            ];
        });

        return response()->json([
            'message' => 'Lấy danh sách sản phẩm thành công',
            'data' => $query,
            'code' => 200
        ], 200);
    }
}
