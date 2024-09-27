// import AddEditProduct from "@/components/addProductModal/AddEditProduct";
import Sidebar from "@/components/sidebar/sidebar";
import ProductTable from "@/components/table/ProductTable";
import { resetSearchFilterOption } from "@/redux/features/ProductSlice/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ItemManagemantPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetSearchFilterOption());
  }, [dispatch]);

  return (
    <div className="w-full  flex">
      
         <Sidebar ></Sidebar>
      
      
      <div className="w-full relative mx-20 pl-4">
            <p className="text-2xl text-[#105946] my-8 py-7 font-bold text-center">
              Inventories 
            </p>
           
            <ProductTable ></ProductTable>
            <Outlet></Outlet>
      </div>
      
      
    </div>
  );
};

export default ItemManagemantPage;
