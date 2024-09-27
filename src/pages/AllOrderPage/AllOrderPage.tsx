/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
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
import Sidebar from "@/components/sidebar/sidebar";
import { Oval } from "react-loader-spinner";
const AllOrderPage = () => {
  const { data, isLoading } = useGetAllOrdersQuery("");
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <div className="h-[80vh] text-2xl flex items-center justify-center text-black">
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
        <>
        <div  className="w-full min-h-[90vh] flex  ">
          <Sidebar></Sidebar>
          <div className="flex-grow flex-col justify-center items-center mx-20">
            <div className="text-center font-bold mb-4 mt-12 ">
              Orders
            </div>
            <Table>
              <TableCaption> </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Payment Methods</TableHead>
                  <TableHead>Product Details</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((order: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{order.name}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.orderMethods}</TableCell>
                    <TableCell>
                      {order.products.map((item: any) => (
                        
                        <p>
                          {item.id?.title} : {item.quantity},
                        </p>
                      ))}
                    </TableCell>
                    <TableCell >
                    {order.products.map((item: any) => (
                        
                        <div >
                          <img className="rounded-lg" src={item.id.image} height={90} width={70} />
                          
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="">{order.address}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>

          </div>
          
        </div>
          
        </>
      )}
    </div>
  );
};

export default AllOrderPage;
