import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateOrderMutation } from "@/redux/api/orderApi";

import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
const OrderDetailsForm = ({
  setSelectedOption,
  totalPrice,
  products,
}: {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  totalPrice: number;
  products: { id: string; quantity: number }[];
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createOrder] = useCreateOrderMutation();
  const onSubmit = async (data: FieldValues) => {
    const data2 = {
      ...data,
      quantity: parseInt(data?.quantity),
      totalPrice: parseFloat(data?.totalPrice),
      products,
      orderMethods: "COD",
    };
    console.log(data2);
    setSelectedOption("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await createOrder(data2);

    if (res?.error?.data?.message) {
      toast.error(res?.error?.data?.message);
    }

    console.log(res);
    if (res?.data?.success) {
      toast.success("Order Placed Successfully");
    }
  };
  return (
    <div className="grid gap-4 py-4 mx-auto max-w-[600px] border-2 border-green-600 p-5 mt-10 rounded-lg ">
      <p className="text-center font-bold">Cash On Delivery</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col gap-2"
      >
        <div className="flex justify-center items-center gap-4">
          <Label htmlFor="name" className="w-24">
            Name:
          </Label>
          <Input
            
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="flex justify-center items-center gap-4">
          <Label htmlFor="email" className="w-24">
            Email:
          </Label>
          <Input
            
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="flex justify-center items-center gap-4">
          <Label htmlFor="address" className="w-24">
            Address:
          </Label>
          <Input
            id="address"
            
            {...register("address", { required: true })}
          />
          {errors.address && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="flex justify-center items-center gap-4">
          <Label htmlFor="totalPrice" className="w-24">
            Amount:
          </Label>
          <Input
            readOnly
            defaultValue={totalPrice}
            id="totalPrice"
            {...register("totalPrice", { required: true })}
          />
          {errors.totalPrice && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <Button
          type="submit"
          className=" bg-green-600 mt-6 w-full hover:bg-green-700 text-white"
        >
          Order Now
        </Button>
      </form>
    </div>
  );
};

export default OrderDetailsForm;
