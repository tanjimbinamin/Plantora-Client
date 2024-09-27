import FilterButton from "./FilterButton";


const FilterComponent =  ({ actionText }: { actionText?: string })=> {
    return (
        <div>
            <div className="md:col-span-2 md:ms-auto  ">
        <div className=" flex gap-20 my-10 mx-10">
          <div className="">
            {actionText !== "home" && <FilterButton actionText="category" />}
          </div>
          <div className="">
            {actionText !== "home" && <FilterButton actionText="other" />}
          </div>
        </div>
      </div>
        </div>
    );
};

export default FilterComponent;