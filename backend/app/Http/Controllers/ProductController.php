<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    public function getAllProducts(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $page = $request->input('page', 1);

        $query = Product::select('id', 'name', 'quantity', 'price', 'created_at')
            ->paginate($perPage);

        return response()->json([
            'message' => 'Lấy danh sách sản phẩm thành công',
            'data' => [
                'items' => $query->items(),
                'total' => $query->total(),
                'current_page' => $query->currentPage(),
                'per_page' => $query->perPage(),
                'last_page' => $query->lastPage()
            ],
            'code' => 200
        ], 200);
    }

    public function searchProduct(Request $request)
    {
        if ($request->input('query') == '') {
            $query = Product::select('id', 'name', 'quantity', 'image_path', 'price', 'created_at')
                ->limit(10)->get();
        } else {
            $query = Product::select('id', 'name', 'quantity', 'image_path', 'price', 'created_at')
                ->where('name', 'like', '%' . $request->input('query') . '%')
                ->get();
        }
        return response()->json([
            'message' => 'Lấy danh sách sản phẩm thành công',
            'data' => $query,
            'code' => 200
        ], 200);
    }

    public function createProduct(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $validatedData['image_path'] = $imagePath;
        }

        $product = Product::create($validatedData);

        // Attach categories
        $product->categories()->attach($request->category_ids);

        return response()->json([
            'message' => 'Thêm sản phẩm thành công',
            'data' => $product,
            'code' => 201
        ], 201);
    }

    public function getProductById($id)
    {
        try {

            $product = Product::with('categories')->find($id);

            if (!$product) {
                return response()->json([
                    'message' => 'Không tìm thấy sản phẩm',
                    'code' => 404
                ], 404);
            }

            return response()->json([
                'message' => 'Lấy thông tin sản phẩm thành công',
                'data' => $product,
                'code' => 200
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra khi lấy thông tin sản phẩm',
                'error' => $e->getMessage(),
                'code' => 500
            ], 500);
        }
    }

    public function updateProduct(Request $request, $id)
    {
        $product = Product::find($id);
        $product->update($request->all());

        return response()->json([
            'message' => 'Cập nhật sản phẩm thành công',
            'data' => $product,
            'code' => 200
        ], 200);
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);
        $product->delete();

        return response()->json([
            'message' => 'Xóa sản phẩm thành công',
            'data' => $product,
            'code' => 200
        ], 200);
    }
    public function getRandomProducts()
    {
        try {
            $products = Product::inRandomOrder()->take(9)->with('categories')->get();

            return response()->json([
                'message' => 'Lấy danh sách sản phẩm ngẫu nhiên thành công',
                'data' => $products,
                'code' => 200
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra khi lấy danh sách sản phẩm',
                'error' => $e->getMessage(),
                'code' => 500
            ], 500);
        }
    }

    public function getProductsByCategory($categoryName)
    {
        try {
            $category = Category::where('name', $categoryName)->first();

            if (!$category) {
                return response()->json([
                    'message' => 'Không tìm thấy danh mục',
                    'code' => 404
                ], 404);
            }

            $products = Product::where('category_id', $category->id)
                ->get();

            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'Không tìm thấy sản phẩm',
                    'code' => 404
                ], 404);
            }

            return response()->json([
                'message' => 'Lấy danh sách sản phẩm theo danh mục thành công',
                'data' => $products,
                'code' => 200
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra khi lấy danh sách sản phẩm theo danh mục',
                'error' => $e->getMessage(),
                'code' => 500
            ], 500);
        }
    }
}
