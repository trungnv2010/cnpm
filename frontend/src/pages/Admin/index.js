import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthWrapper } from "@/components";
import { useGetDailySalesQuery, useGetRevenueStatisticsQuery, useGetPendingOrdersQuery, useGetTopSellingProductsQuery } from "@/service";

import HomePageAdmin from "./HomePageAdmin";

const Admin = () => {
  // const { data, isSuccess, isError, isLoading, error } =
  //   useGetDailySalesQuery();
  // const { data, isSuccess, isError, isLoading, error } =
  //   useGetRevenueStatisticsQuery({period: 'this_year'});
  // const {  data : dataPendingOrder } =
  //   useGetPendingOrdersQuery();
  // const  { data : dataTopSellingProducts } = useGetTopSellingProductsQuery({ period: 'this_year' });
  // console.log(dataPendingOrder);
  // console.log(dataTopSellingProducts)

  return (
    <>
      <AuthWrapper requiredRole="admin" >
        <div className="bg-gray-200">
          <HomePageAdmin />
        </div>
      </AuthWrapper>
    </>
  );
};

export default Admin;
