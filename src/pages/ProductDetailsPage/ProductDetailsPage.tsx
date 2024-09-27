import { Button } from "@/components/ui/button";
import { IProduct } from "@/interface/product.interface";
import { useGetSingleItemQuery } from "@/redux/api/productApi";
import { addItemToCart } from "@/redux/features/ProductSlice/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Rating } from "@smastrom/react-rating";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { product: productFromRedux } = useAppSelector(
    (state) => state.productSlice
  );
  const { data, isLoading } = useGetSingleItemQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  console.log(data);
  const dispatch = useAppDispatch();
  const addToCart = (item: IProduct) => {
    const { title, price, availability } = item;
    dispatch(
      addItemToCart({
        id: id as string,
        title,
        price,
        quantity: availability.quantity,
        availability: availability.status,
      })
    );
  };

  const addProductTocart = (product: IProduct) => {
    const isItemExist = productFromRedux.find(
      (item) => item.title == product.title
    );

    if (product.availability.quantity <= 0) {
      toast.error("Item Not Available");
    } else if (isItemExist) {
      if (isItemExist.amount >= product.availability.quantity) {
        toast.error("You can not add more.");
      } else {
        addToCart(product);
      }
    } else {
      addToCart(product);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="h-[80vh] text-2xl flex items-center justify-center text-[#243342]">
          Loading...
        </div>
      ) : (
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
          <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
            <img
              className="w-full"
              alt="img of a girl posing"
              src={data?.data.image}
            />
          </div>
          <div className="md:hidden">
            <img
              className="w-full"
              alt="img of a girl posing"
              src={data?.data.image}
            />
          </div>
          <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
            <div className="border-b border-gray-200 pb-6">
              <h1
                className="
                lg:text-2xl
                text-xl
                font-semibold
                lg:leading-6
                leading-7
                text-gray-800
                mt-2
            "
              >
                {data?.data.title}
              </h1>
            </div>
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-base leading-4 text-gray-800">Category</p>
              <div className="flex items-center justify-center">
                <p className="text-sm leading-none text-gray-600">
                  {data?.data.category}
                </p>
              </div>
            </div>
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-base leading-4 text-gray-800">Price</p>
              <div className="flex items-center justify-center">
                <p className="text-sm leading-none text-gray-600 mr-3">
                  {data?.data.price}tk
                </p>
              </div>
            </div>
            <Button
              onClick={() => addProductTocart(data?.data)}
              className=" mt-5 w-full bg-green-600 hover:bg-green-700"
            >
              Add Cart
            </Button>
            <div>
              <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
                {data?.data.description}
              </p>
              <p className="text-base flex items-center gap-3 leading-4 mt-7 text-gray-600">
                Rating:{" "}
                <Rating
                  style={{ maxWidth: 80 }}
                  value={parseFloat(data?.data.rating)}
                  readOnly
                />
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsPage;
