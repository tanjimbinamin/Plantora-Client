import {
  DataState,
  decreassItem,
  increassItem,
  ProductType,
} from "@/redux/features/ProductSlice/productSlice";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";
import { HiPlus, HiMinus } from "react-icons/hi"; // New modern icons

const ModalItem = ({
  item,
  editable = false,
  dataState,
}: {
  dataState: DataState;
  item: ProductType;
  editable?: boolean;
}) => {
  const dispatch = useAppDispatch();

  // Function to handle item quantity increase
  const handleIncrease = (title: string) => {
    const selectedItem = dataState.data.find((dataItem) => dataItem.title === title);
    if (selectedItem) {
      if (item.amount >= selectedItem.availability.quantity) {
        toast.error("Reached the maximum available quantity.");
      } else {
        dispatch(increassItem({ title }));
      }
    }
  };

  // Function to handle item quantity decrease
  const handleDecrease = (title: string) => {
    const selectedItem = dataState.data.find((dataItem) => dataItem.title === title);
    if (selectedItem && item.amount > 1) {
      dispatch(decreassItem({ title }));
    } else {
      toast.error("Cannot reduce quantity below 1.");
    }
  };

  // Get item data and image
  const itemData = dataState.data.find((dataItem) => dataItem.title === item.title);
  const itemImage = itemData?.image 

  return (
    <div className="flex items-center p-5 border rounded-md shadow-md bg-white">
      {/* Image Section */}
      <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden flex justify-center items-center mr-4">
        <img src={itemImage} alt={item.title} className="object-cover w-full h-full" />
      </div>

      {/* Details Section */}
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
        
      </div>

      {/* Quantity and Price Section */}
      <div className="text-right">
        <p className="text-sm text-gray-500">Qty: <span className="font-medium text-gray-800">{item.amount}</span></p>
        <p className="text-sm text-gray-500 mt-1">Price: <span className="font-medium text-gray-800">{item.price} tk</span></p>
      </div>

      {/* Edit Controls Section */}
      {editable && (
        <div className="ml-4">
          <div className="flex items-center">
            <Button
              onClick={() => handleIncrease(item.title)}
              className="bg-teal-500 text-white rounded-full p-2 shadow hover:bg-teal-600 transition"
            >
              <HiPlus size={16} />
            </Button>
            <Button
              onClick={() => handleDecrease(item.title)}
              className="bg-rose-500 text-white rounded-full p-2 shadow ml-2 hover:bg-rose-600 transition"
            >
              <HiMinus size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalItem;
