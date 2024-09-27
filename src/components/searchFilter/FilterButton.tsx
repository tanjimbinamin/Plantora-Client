import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IProduct } from "@/interface/product.interface";
import { useGetAllCategoryQuery } from "@/redux/api/productApi";
import {
  setCategoryFilter,
  setSortFilter,
} from "@/redux/features/ProductSlice/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";
interface FilterButtonProps {
  actionText: string;
}

const FilterButton = ({ actionText }: FilterButtonProps) => {
  const { sortFilter, categoryFilter } = useAppSelector(
    (state) => state.productSlice
  );

  const { data } = useGetAllCategoryQuery("");
  const dispatch = useAppDispatch();
  const handleCategoryChange = (category: string) => {
    console.log("Category changed to:", category);
    dispatch(setCategoryFilter(category));
  };

  const handleSortChange = (sort: string) => {
    console.log("Category changed to:", sort);
    dispatch(setSortFilter(sort));
  };

  return (
    <DropdownMenu>
      {actionText == "category" && (
        <DropdownMenuTrigger asChild>
          <Button className=" hover:bg-[#243342] hover:text-white outline-none h-9 p-5  ">
            Filter 
          </Button>
        </DropdownMenuTrigger>
      )}
      {actionText == "other" && (
        <DropdownMenuTrigger asChild>
          <Button className=" hover:bg-[#243342] hover:text-white outline-none h-9 p-5 ">
            Sort 
          </Button>
        </DropdownMenuTrigger>
      )}

      {actionText == "category" && (
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={categoryFilter}
            onValueChange={handleCategoryChange}
          >
            <DropdownMenuRadioItem value="">None</DropdownMenuRadioItem>{" "}
            {[
              ...new Set(data?.data.map((data: IProduct) => data.category)),
            ].map((item, i) => (
              <div key={i}>
                {" "}
                <Link to={`/products?category=${item as string}`}>
                  <DropdownMenuRadioItem value={item as string}>
                    {item as string}
                  </DropdownMenuRadioItem>
                </Link>
              </div>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      )}
      {actionText == "other" && (
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={sortFilter}
            onValueChange={handleSortChange}
          >
            {" "}
            <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price">
              Price (Low To High)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="-price">
              Price (High To Low)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="-rating">
              Rating (High To Low)
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default FilterButton;
