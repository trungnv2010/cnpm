import { useState } from "react";
import NavBarAdmin from "../NavbarAdmin";
import BarChart from "./BarChart";
import { useGetRevenueStatisticsQuery,useGetTopSellingProductsQuery } from '@/service';
import {
    format,
    subDays,
    subMonths,
    startOfMonth,
    startOfYear,
    endOfMonth,
    eachDayOfInterval,
    eachMonthOfInterval,
    subYears,
    endOfYear,
} from "date-fns";

const Dashboard = () => {
    const choice = "dashboard";


    //Thống kê
    const [periodStatistics, setPeriodStatistics] = useState('7_days');
    const { data: dataRevenueStatisticsRaw, isLoading, error } = useGetRevenueStatisticsQuery({ period: periodStatistics });
    const dataRevenue = dataRevenueStatisticsRaw?.revenue_data;
    const dataStatistics = dataRevenue?.map(item => item.total_revenue);
    const convertDataStatistics = dataStatistics?.map(item => Number(item));
    const handleChangePeriodStatistics = (e) => {
        switch (e.target.value) {
            case "7 ngày qua":
                setPeriodStatistics('7_days');
                break;
            case "Tháng này":
                setPeriodStatistics('this_month');
                break;
            case "Tháng trước":
                setPeriodStatistics('last_month');
                break;
            case "Năm trước":
                setPeriodStatistics('last_year');
                break;
            case "Năm nay":
                setPeriodStatistics('this_year');
                break;
        }
    };
    const getLabels = (period) => {
        switch (period) {
            case '7_days':
                // Tạo nhãn cho 7 ngày qua
                return eachDayOfInterval({ start: subDays(new Date(), 6), end: new Date() }).map(date =>
                    format(date, 'dd/MM')
                );

            case 'last_month':
                const startLastMonth = startOfMonth(subMonths(new Date(), 1));
                const endLastMonth = endOfMonth(subMonths(new Date(), 1));
                return eachDayOfInterval({
                    start: startLastMonth,
                    end: endLastMonth,
                }).map((date) => format(date, "dd/MM"));

            case "this_month":

                return eachDayOfInterval({
                    start: startOfMonth(new Date()),
                    end: new Date(),
                }).map((date) => format(date, "dd/MM"));

            case 'this_year':
                return eachMonthOfInterval({ start: new Date(new Date().getFullYear(), 0), end: new Date() }).map(date =>
                    format(date, 'MM/yyyy')
                );
            case 'last_year':
                const startLastYear = startOfYear(subYears(new Date(), 1));
                const endLastYear = endOfYear(subYears(new Date(), 1));
                return eachMonthOfInterval({
                    start: startLastYear,
                    end: endLastYear,
                }).map((date) => format(date, "MM/yyyy"));


            default:
                return [];
        }
    };
    const labelsStatistic = getLabels(periodStatistics);

    //Top sản phẩm
    const products = [
        { rank: 1, name: "Áo 3 lỗ thun kẻ chéo đen trắng - M", code: "A036-M", quantity: 1 },
        { rank: 2, name: "Áo phông croptop trắng mix hồng - S", code: "CROPTOP04-S", quantity: 1 },
        { rank: 3, name: "Quần jean xám mài đen mix rách - L", code: "DARIM F702-L", quantity: 1 },
        { rank: 4, name: "Quần HIPHOP umi đen mix túi hộp kèm - M", code: "LIMAN 2019-M", quantity: 1 },
        { rank: 5, name: "Quần jean be siêu loang - L", code: "FJIA02-L", quantity: 1 },
        { rank: 6, name: "Áo 3 lỗ thun kẻ chéo đen trắng - M", code: "A036-M", quantity: 1 },
        { rank: 7, name: "Áo phông croptop trắng mix hồng - S", code: "CROPTOP04-S", quantity: 1 },
        { rank: 8, name: "Quần jean xám mài đen mix rách - L", code: "DARIM F702-L", quantity: 1 },
        { rank: 9, name: "Quần HIPHOP umi đen mix túi hộp kèm - M", code: "LIMAN 2019-M", quantity: 1 },
        { rank: 10, name: "Quần jean be siêu loang - L", code: "FJIA02-L", quantity: 1 },
      ];
    
    const  { data : dataTopSellingProductsRaw,isLoading:isLoadingTopSelling } = useGetTopSellingProductsQuery({ period: 'this_year' });
    const [periodTopSelling,setPeriodTopSelling]=useState('this_year')
    // const dataTopSelling = dataTopSellingProductsRaw.top_selling_products;
    const dataTopSelling=dataTopSellingProductsRaw?.top_selling_products;
    



    return (
        <>
            <NavBarAdmin choice={choice}>
                <div className="max-w-[calc(100%-1rem)] grid grid-cols-5 gap-x-6 gap-y-6">

                    {/*két quả kinh doanh*/}
                    <div class=" mx-auto   p-4 border border-gray-200 rounded-md shadow-sm bg-white col-span-3 w-full">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-lg font-bold uppercase ">kết quả kinh doanh</h2>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-white border border-gray-300  py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500">
                                    <option>Tất cả chi nhánh</option>
                                    <option>Chi nhánh 1</option>
                                    <option>Chi nhánh 2</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="border-t-2 border-gray-400"></div>


                        <div class="flex flex-col items-center mt-3 justify-center text-center text-black">
                            <p>Main content</p>
                        </div>
                    </div>


                    {/* top sản phẩm */}
                    <div class=" mx-auto  p-4 border border-gray-200 rounded-md shadow-sm bg-white  w-full col-span-2  overflow-y-auto h-[18rem]">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-lg font-bold uppercase ">Top sản phẩm</h2>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-white border border-gray-300  py-2 pl-2 pr-8 rounded mr-3 leading-tight focus:outline-none focus:border-blue-500">
                                    <option>Theo số lượng</option>
                                    <option>Hôm nay</option>
                                    <option>Tháng này</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="border-t-2 border-gray-400"></div>
                        
                        {isLoadingTopSelling && <p>Đang tải dữ liệu...</p>}
                        {!isLoading&&(
                        <div class="flex flex-row items-center mt-3 text-black">
                            {/* <div className="p-4 bg-white rounded shadow-md"> */}
                                <ul>
                                    {dataTopSelling?.map((product,index) => (
                                        <li
                                            key={product.id}
                                            className="flex items-center justify-between py-2 border-b last:border-b-0"
                                        >
                                <div className="flex items-center">
                                    <span
                                        className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold mr-4  ${
                                        product.rank === 1
                                            ? "bg-blue-500"
                                            : product.rank === 2
                                            ? "bg-green-500"
                                            : product.rank === 3
                                            ? "bg-yellow-500"
                                            : product.rank === 4
                                            ? "bg-red-500"
                                            : "bg-gray-500"
                                        }`}
                                    >
                                    {(index+1).toString().padStart(2, "0")}
                                    </span>
                                    <div>
                                        <p className="w-64 text-sm font-medium">{product.name}</p>
                                        <p className="text-xs text-gray-500">{product.id}</p>
                                    </div>
                                </div>
                                <div className="ml-16 text-sm font-medium">{product.total_sold}</div>
                                            </li>
                                            ))}
                                        </ul>
                            
                        </div>)}
                    </div>

                    {/*thống kê */}
                    <div class="  p-4 border border-gray-200 rounded-md shadow-sm bg-white col-span-5">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-lg font-bold uppercase">doanh thu bán hàng</h2>
                            <div class="relative">
                                <select onChange={(e) => handleChangePeriodStatistics(e)} class="block appearance-none w-full bg-white border border-gray-300  py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500">
                                    <option>7 ngày qua</option>
                                    <option>Tháng trước</option>
                                    <option>Tháng này</option>
                                    <option>Năm nay</option>
                                    <option>Năm trước</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="border-t-2 border-gray-400"></div>

                        {!isLoading && !error && (
                            <BarChart labels={labelsStatistic} data={convertDataStatistics} />
                        )}
                        {isLoading && <p>Đang tải dữ liệu...</p>}
                        {error && <p>Có lỗi xảy ra: {error.message}</p>}
                    </div>

                    {/*đơn hàng chờ xử lý*/}
                    <div class=" mx-auto  mb-5 p-4 border border-gray-200 rounded-md shadow-sm bg-white col-span-5 w-full">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-lg font-bold uppercase ">Đơn hàng chờ xử lý</h2>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-white border border-gray-300  py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500">
                                    <option>Tất cả chi nhánh</option>
                                    <option>Chi nhánh 1</option>
                                    <option>Chi nhánh 2</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="border-t-2 border-gray-400"></div>


                        <div class="flex flex-col items-center mt-3 justify-center text-center text-black">
                            {/* <p>Main content</p> */}
                        </div>
                    </div>

                </div>
            </NavBarAdmin>

        </>
    );
};

export default Dashboard;
