import ModalItem from "@/components/cartModal/ModalItem";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetailsForm from "./OrderDetailsForm";

const CheckoutPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { dataState, product, totalPrice } = useAppSelector(
    (state) => state.productSlice
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (product.length === 0) {
      navigate("/");
    }
  }, [product, navigate]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
      {/* Product List */}
      <div className="flex flex-col gap-4 max-h-80 overflow-auto mb-6">
        {product.map((item, i) => (
          <ModalItem
            dataState={dataState}
            editable={false}
            key={i}
            item={item}
          />
        ))}
      </div>

      {/* Summary Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total Price:</span>
          <span className="text-3xl text-green-600 font-bold">{totalPrice} tk</span>
        </div>
      </div>

      {/* Payment Options */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl text-green-600 font-bold mb-4">Select Payment Option</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setSelectedOption("stripe")}
            className={`bg-green-600 text-xl font-semibold text-white px-6 py-3 rounded-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              selectedOption === "stripe" ? "bg-green-700" : ""
            }`}
          >
            Stripe Payment
          </button>
          <button
            onClick={() => setSelectedOption("cod")}
            className={`bg-green-600 text-xl font-semibold text-white px-6 py-3 rounded-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              selectedOption === "cod" ? "bg-green-700" : ""
            }`}
          >
            Cash On Delivery
          </button>
        </div>
      </div>

      {/* Conditional Content */}
      {selectedOption === "cod" && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <OrderDetailsForm
            products={product.map((item) => ({
              id: item.id,
              quantity: item.amount,
            }))}
            totalPrice={totalPrice}
            setSelectedOption={setSelectedOption}
          />
        </div>
      )}
      {selectedOption === "stripe" && (
        <div className="text-center text-2xl mt-4 text-red-500">
          Stripe is not available yet !!!
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
