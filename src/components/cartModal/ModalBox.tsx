/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModalItem from "./ModalItem";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ModalBox = () => {
  const { dataState, product, totalPrice } = useAppSelector(
    (state) => state.productSlice
  );

  useEffect(() => {
    if (product.length > 0) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.preventDefault();
        return message;
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [product]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-gray absolute right-20 flex justify-center items-center ">
          <Button className="flex justify-center  items-center border ml-3 px-3 py-2 rounded-md ">
            <span className="font-medium text-white">
              {product.reduce((total, product) => total + product.amount, 0)}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4fa94d"
              className="w-6 h-6 text-white ml-2"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            Your Cart
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-600">
            Review the items in your cart before proceeding to checkout.
          </DialogDescription>
        </DialogHeader>
        {product.length !== 0 ? (
          <div className="flex flex-col gap-4 max-h-80 overflow-auto customScroll">
            {product.map((item, i) => (
              <ModalItem
                key={i}
                dataState={dataState}
                item={item}
                editable={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4">

            <DialogClose asChild>
              <Link to="/products">
                  <Button className="text-lg font-semibold bg-gray-400 hover:bg-gray-600 hover:shadow-5 rounded border-5">
                    Choose any item from Products
                  </Button>
              </Link>
            </DialogClose>
           
            
          </div>
        )}
        <DialogFooter className="flex flex-col  mt-4">
          <div className="flex items-center gap-x-14">
            <div className="flex items-center ">
              <span className="font-bold text-gray-800 mr-2">Total:</span>
              <div className="bg-gradient-to-r from-green-400 to-green-600 px-3 py-1 rounded-lg shadow-md">
                <span className="font-semibold text-white text-lg ">{totalPrice} tk</span>
              </div>
            </div>
            <Button
              disabled={product.length === 0}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg shadow-md transition-all"
              type="submit"
            >
              <DialogClose asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </DialogClose>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBox;
