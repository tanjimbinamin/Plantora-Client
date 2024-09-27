import AddEditProduct from "@/components/addProductModal/AddEditProduct";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks";
import { Oval } from "react-loader-spinner";

const ProductTable = () => {
  const { dataState } = useAppSelector((state) => state.productSlice);
  return (
    <div className="px -12 " >
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[130px]">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {dataState.isLoading ? (
            <>
              {" "}
            
                <div className="relative flex justify-center items-center w-full h-full ">
                  <div className="absolute inset-0 flex justify-center items-center">
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
                
                </div>
            
             
            </>
          ) : (
            <>
              {" "}
              {dataState?.data.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <img src={item.image} alt="" />
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.availability.quantity}</TableCell>
                  <TableCell className="">{item.price}tk</TableCell>
                  <TableCell className="">
                    <div className="flex justify-center gap-2">
                      <AddEditProduct id={item._id} actionText="update" />
                      <AddEditProduct id={item._id} actionText="delete" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </>
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
    </div>
  );
};

export default ProductTable;
