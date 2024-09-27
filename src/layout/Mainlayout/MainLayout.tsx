import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useGetAllProductQuery } from "@/redux/api/productApi";
import { useEffect } from "react";

import { setProductData } from "@/redux/features/ProductSlice/productSlice";
import { IProduct } from "@/interface/product.interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const { searchFilter, sortFilter, categoryFilter } = useAppSelector(
    (state) => state.productSlice
  );
  console.log(searchFilter);
  const { isLoading, data } = useGetAllProductQuery(
    {
      searchFilter: searchFilter,
      sort: sortFilter,
      filters: { category: categoryFilter },
    },
    { refetchOnMountOrArgChange: true }
  );
  const setData = (data: IProduct[], isLoading: boolean) => {
    dispatch(setProductData({ data: data || [], isLoading: isLoading }));
  };

  useEffect(() => {
    if (data) {
      setData(data?.data, isLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  console.log(data);
  return (
    <div className=" ">
      <div className=" h-20 shadow-md bg-[#105946] flex items-center px-1 sm:px-3">
        <NavBar></NavBar>
      </div>
      <div className="min-h-[80vh]">
        <Outlet></Outlet>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
