import { Card, CardContent } from "@/components/ui/card";

import { Link } from "react-router-dom";
import { IProduct } from "@/interface/product.interface";
import { setCategoryFilter } from "@/redux/features/ProductSlice/productSlice";
import { useAppDispatch } from "@/redux/hooks";

const ShopByCategory = ({
  products
}: {
  products: IProduct[]
}) => {
  const dispatch = useAppDispatch();

  console.log(products);
  
  return (
    <div>
     
      
      <div className="flex gap-5 flex-wrap justify-center">
        {products
          .reduce((acc, product) => {
            if (!acc.find((item) => item.category === product.category)) {
              acc.push({ category: product.category, image: product.image });
            }
            return acc;
          }, [] as { category: string; image: string  }[])
          ?.map((item, i) => (
            <Card
              key={i}
              className="w-44 h-60 flex items-center justify-center"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "  center",
              }}
            >
              <CardContent className="p-0 w-full h-full px-3  py-2 relative ">
                <div className="absolute  duration-300  bg-slate-950 opacity-15  hover:opacity-50  top-[50%]  translate-y-[-50%] translate-x-[-50%]   left-[50%]   w-full h-full"></div>
                <div
                  onClick={() => dispatch(setCategoryFilter(item.category))}
                  className=" absolute top-[90%]  translate-y-[-90%] translate-x-[-50%] text-nowrap drop-shadow-sm left-[50%] text-white text-xl bg-green-600 hover:text-green-600 hover:bg-white duration-300 flex items-center  px-2 rounded-lg pb-0.5 "
                >
                  {" "}
                  <Link to={`/products?category=${item.category as string}`}>
                    {item.category}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
