<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function dailySales()
    {
        $today = Carbon::today();

        $sales = Order::whereDate('created_at', $today)
            ->where('status', 'completed')
            ->sum('total_amount');

        return response()->json(['sales_today' => $sales], 200);
    }

    /**
     * Thống kê doanh thu bán hàng.
     */
    public function revenueStatistics(Request $request)
    {
        $period = $request->input('period', '7_days');

        switch ($period) {
            case '7_days':
                // 7 ngày qua, biểu diễn theo ngày
                $startDate = Carbon::now()->subDays(6)->startOfDay();
                $endDate = Carbon::now()->endOfDay();
                $format = '%Y-%m-%d'; // Format theo ngày
                break;

            case 'this_month':
                // Tháng này, biểu diễn theo ngày
                $startDate = Carbon::now()->startOfMonth();
                $endDate = Carbon::now()->endOfMonth();
                $format = '%Y-%m-%d'; // Format theo ngày
                break;

            case 'last_month':
                // Tháng trước, biểu diễn theo ngày
                $startDate = Carbon::now()->subMonth()->startOfMonth();
                $endDate = Carbon::now()->subMonth()->endOfMonth();
                $format = '%Y-%m-%d'; // Format theo ngày
                break;

            case 'this_year':
                // Năm nay, biểu diễn theo tháng
                $startDate = Carbon::now()->startOfYear();
                $endDate = Carbon::now()->endOfYear();
                $format = '%Y-%m'; // Format theo tháng
                break;

            case 'last_year':
                // Năm ngoái, biểu diễn theo tháng
                $startDate = Carbon::now()->subYear()->startOfYear();
                $endDate = Carbon::now()->subYear()->endOfYear();
                $format = '%Y-%m'; // Format theo tháng
                break;

            default:
                return response()->json(['error' => 'Invalid period'], 400);
        }

        // Lấy dữ liệu doanh thu từ bảng orders
        $revenueData = Order::select(DB::raw("DATE_FORMAT(created_at, '$format') as period"), DB::raw('SUM(total_amount) as total_revenue'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->where('status', 'completed') // Lọc đơn hàng hoàn thành
            ->groupBy('period')
            ->orderBy('period')
            ->get();
        $totalRevenue = $revenueData->sum('total_revenue');

        return response()->json([
            'revenue_data' => $revenueData,
            'total_revenue' => $totalRevenue,
        ]);
    }

    /**
     * Đơn hàng chờ xử lý.
     */
    public function pendingOrders()
    {
        $pendingOrders = Order::where('status', 'pending')->get();

        return response()->json(['pending_orders' => $pendingOrders], 200);
    }

    /**
     * Top sản phẩm bán chạy.
     * 
     * @param string $period
     */
    public function topSellingProducts(Request $request)
    {
        $period = $request->input('period', 'today');
        $dateRange = $this->getDateRange($period);

        $topProducts = Product::select('products.id', 'products.name', DB::raw('SUM(order_items.quantity) as total_sold'))
            ->join('order_items', 'products.id', '=', 'order_items.product_id')
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->where('orders.status', 'completed')
            ->whereBetween('orders.created_at', [$dateRange['start'], $dateRange['end']])
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_sold')
            ->take(10)
            ->get();

        return response()->json(['top_selling_products' => $topProducts], 200);
    }

    /**
     * Lấy khoảng thời gian dựa trên tham số period.
     */
    private function getDateRange($period)
    {
        switch ($period) {
            case 'yesterday':
                $start = Carbon::yesterday();
                $end = Carbon::yesterday()->endOfDay();
                break;

            case 'today':
                $start = Carbon::today();
                $end = Carbon::now();
                break;

            case 'last_week':
                $start = Carbon::now()->subWeek()->startOfWeek();
                $end = Carbon::now()->subWeek()->endOfWeek();
                break;

            case 'this_week':
                $start = Carbon::now()->startOfWeek();
                $end = Carbon::now();
                break;

            case 'last_month':
                $start = Carbon::now()->subMonth()->startOfMonth();
                $end = Carbon::now()->subMonth()->endOfMonth();
                break;

            case 'this_month':
                $start = Carbon::now()->startOfMonth();
                $end = Carbon::now();
                break;

            case 'last_year':
                $start = Carbon::now()->subYear()->startOfYear();
                $end = Carbon::now()->subYear()->endOfYear();
                break;

            case 'this_year':
                $start = Carbon::now()->startOfYear();
                $end = Carbon::now();
                break;

            default:
                $start = Carbon::today();
                $end = Carbon::now();
                break;
        }

        return ['start' => $start, 'end' => $end];
    }
}
