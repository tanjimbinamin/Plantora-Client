import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { IProduct } from "@/interface/product.interface";
import { addItemToCart } from "@/redux/features/ProductSlice/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ItemCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const { product: productFromRedux } = useAppSelector(
    (state) => state.productSlice
  );

  const addToCart = (item: IProduct) => {
    const { title, price, availability, _id } = item;
    dispatch(
      addItemToCart({
        id: _id,
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
        toast.success("Item added to cart.");
        addToCart(product);
      }
    } else {
      toast.success("Item added to cart.");
      addToCart(product);
    }
  };

  return (
    <Card className="max-w-72 min-w-60 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden relative group">
      <CardHeader className="p-4 bg-gray-50 relative shadow-lg">
        <img
          className="rounded-md object-cover h-48 w-full"
          src={product.image}
          alt=""
        />
        {
          (product.availability.status === "Available" ? 
            <div className="absolute top-2  bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
              Available
            </div>
            :
            <div className="absolute top-2  bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {product.availability.status}
            </div>
          )
          
        }
      </CardHeader>
      <CardContent className="p-4 bg-white space-y-4 relative">
        <CardTitle className="text-lg font-semibold text-gray-800 flex justify-between items-center">
          <Link to={`/product-details/${product._id}`} className="hover:text-green-600 transition-colors duration-300">
            {product.title}
          </Link>

          
              <div
              onClick={() =>  (product.availability.status==="stockOut" ?
                (toast.error("Sorry, the product is not available now. ")):
                 addProductTocart(product))}
              className="bg-gray-800 text-white p-2 rounded-full cursor-pointer bg-[#105946] hover:bg-black transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </div>
          
          
        </CardTitle>
        <div className="space-y-2">
          <p className="text-gray-600 flex justify-between items-center">
            <span className="font-bold">Category:</span>
            <span>{product.category}</span>
          </p>
          <p className="text-gray-600 flex justify-between items-center">
            <span className="font-semibold">Price:</span>
            <span className="text-[#243342] font-medium">
              {product.price}tk
            </span>
          </p>
          <p className="text-gray-600 flex justify-between items-center">
            <span className="font-semibold">Quantity:</span>
            <span className="text-[#243342] font-medium">
              {product.availability.quantity}
            </span>
          </p>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold">Rating: </span>
            </p>
            <Rating
              style={{ maxWidth: 80 }}
              value={parseFloat(product.rating)}
              readOnly
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
