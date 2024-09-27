import ItemCard from "@/components/card/ItemCard";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import { IProduct } from "@/interface/product.interface";

const PopulerItem = ({ products }: { products: IProduct[] }) => {
  return (
    <div>
      <SectionTitle text="Inventories "></SectionTitle>
      <div className="flex gap-5  flex-wrap justify-center">
        {products
          .filter((item) => parseFloat(item.rating) > 4)
          .slice(0, 5)
          .map((product, i) => {
            return <ItemCard key={i} product={product}></ItemCard>;
          })}
      </div>
    </div>
  );
};

export default PopulerItem;
