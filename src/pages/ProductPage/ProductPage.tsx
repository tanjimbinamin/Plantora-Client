import ItemCard from "@/components/card/ItemCard";
import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import FilterComponent from "@/components/searchFilter/FilterComponent";
// import SearchFilter from "@/components/searchFilter/SearchFilter";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

const ProductPage = () => {
  const { dataState: products } = useAppSelector((state) => state.productSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(products.data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = products.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

 // Full URL




// Query Parameters
const params = new URLSearchParams(window.location.search);



// Get specific query parameter


// Iterate over all query parameters
params.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});




  return (
    <div className=" min-h-[80vh]">
      <div className="my-4">
        
        <FilterComponent></FilterComponent>
      </div>
      {products.isLoading ? (
        <div className="h-[80vh] text-2xl flex items-center justify-center text-black-600">
        <Oval
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
        />
      </div>
      ) : (
        <div className="flex flex-col justify-between min-h-[80vh] ">
          <div className="flex justify-center">
            <div className=" gap-5 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5  ">
              {currentData?.map((product, i) => {
                return <ItemCard key={i} product={product}></ItemCard>;
              })}
            </div>
          </div>
          <div className="">
            <PaginationCustom
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            ></PaginationCustom>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
