<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{
    public function searchProduct(Request $request)
    {
        $keyword = $request->input('query');
        if (empty($keyword)) {
            $products = Product::inRandomOrder()->limit(10)->get();
        } else {
            $products = Product::where('name', 'like', '%' . $keyword . '%')->get();
        }
        return response()->json(['data' => $products, 'code' => '200'], 200);
    }
}
