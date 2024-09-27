import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCategoryFilter } from "@/redux/features/ProductSlice/productSlice";
import { useEffect } from "react";
// import { useEffect } from "react";



const CategoryDropdown = () => {
  const dispatch = useAppDispatch();
  const { dataState } = useAppSelector((state) => state.productSlice);
  const data= dataState.data

  const [...dates]=data
  useEffect(()=>{
    console.log("chanced bruh");
  },[dates])

// console.log(dates);
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-semibold text-white hover:text-green-600 flex items-center">
        Categories <span className="ml-1">&#x25BC;</span> {/* Down Arrow */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white shadow-lg rounded-lg p-2 mt-2 w-56 border border-gray-200">
        {dates
          .reduce((acc, product) => {
            if (!acc.find((item) => item.category === product.category)) {
              acc.push({ category: product.category, image: product.image });
            }
            return acc;
          }, [] as { category: string; image: string  }[])
          ?.map((category, index) => (
          <DropdownMenuItem key={index} className="p-0">
            <Link
              onClick={() => dispatch(setCategoryFilter(category.category))}
              className="block px-4 py-2 text-gray-800 hover:bg-green-600 hover:text-white transition-colors duration-300 rounded-md"
              to={`/products?category=${category.category}`}
            >
              {category.category}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
