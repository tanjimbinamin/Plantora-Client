import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import FilterButton from "./FilterButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchFilter } from "@/redux/features/ProductSlice/productSlice";
import { useNavigate } from "react-router-dom";

const SearchFilter = ({ actionText }: { actionText?: string }) => {
  const { searchFilter } = useAppSelector((state) => state.productSlice);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    dispatch(setSearchFilter(data.searchTerm));
    navigate("/products");
  };

  return (
    <div className="grid flex md:grid-cols-6 gap-4 container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={actionText == "home" ? "md:col-span-6" : "md:col-span-4"}
      >
        <div className="flex items-center">
          <Input
            defaultValue={searchFilter || ""}
            {...register("searchTerm", { required: true })}
            className={`h-7  border ${
              errors.searchTerm ? "border-red-600" : "border-green-600"
            }`}
          />

          <Button
            type="submit"
            className="h-7 px-3 bg-transparent border hover:bg-gray-600 ml-2 "
          >
           Search
          </Button>
        </div>
      </form>
      {/* <div className="md:col-span-2 md:ms-auto  ">
        <div className="flex gap-10">
          <div className="">
            {actionText !== "home" && <FilterButton actionText="category" />}
          </div>
          <div className="">
            {actionText !== "home" && <FilterButton actionText="other" />}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SearchFilter;
