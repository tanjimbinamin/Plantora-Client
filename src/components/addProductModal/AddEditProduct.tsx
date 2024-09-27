/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Rating } from "@smastrom/react-rating";

import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddEditProduct = ({
  actionText,
  id,
}: {
  id?: string;
  actionText: string;
}) => {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit = async (data: FieldValues) => {
    const { category, description, image, title, price, quantity, rating } =
      data;
    if (Object.keys(data).length == 7 && actionText == "post") {
      if (actionText == "post") {
        const productData = {
          title,
          category,
          description,
          image,
          price:Number(price),
          rating:String(rating),
          availability: { status: "Available", quantity: Number(quantity) },
        };

        const res = await createProduct(productData);
        if (res?.data?.success) {
          toast.success("Product has been added");
        } else {
          toast.error("Something wrong!");
        }
        console.log(res);
      }
    }
    if (Object.keys(data).length >= 7 && actionText == "update") {
      const productData: typeof data = {
        title,
        category,
        description,
        image,
        price:Number(price),
        rating:String(rating),
        availability: {
          quantity: Number(quantity),
        },
      };
      Object.keys(productData).forEach((key) => {
     if (
          productData[key] === undefined ||
          productData[key] === null ||
          productData[key] === "" ||
          (key === "availability" && productData[key].quantity === "")
        )
        {
          delete productData[key];
        }
      });    

      const res = await updateProduct({ productData, id });
      if (res?.error) {
        toast.error("Something wrong!");
      }
      if (res?.data) {
        toast.success("Product Updated Successfully");
      }
      console.log(res, "gg");
    }
    reset();
  };
  const deleteTheProduct = async (id: string) => {
    const res = await deleteProduct(id);
    console.log(res, "gg");
    if (res?.error) {
      toast.error("Something wrong!");
    }
    if (res?.data) {
      toast.success("Product Deleted");
    }
  };
  return (
    <Dialog>
      <DialogDescription></DialogDescription>
      {actionText == "post" && (
        <DialogTrigger asChild>
          <Button
            className="bg-[#105946] hover:bg-[#ffffff] hover:text-[#000000] "
            variant="outline"
          >
            Add Product
          </Button>
        </DialogTrigger>
      )}
      {actionText == "update" && (
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </Button>
        </DialogTrigger>
      )}
      {actionText == "delete" && (
        <DialogTrigger asChild>
          <Button className="bg-red-600 hover:bg-red-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-green-600">
            {actionText === "post" && "Add Product"}
            {actionText === "update" && "Update Product"}
          </DialogTitle>
        </DialogHeader>
        {["post", "update"].includes(actionText) && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex justify-center items-center gap-4">
              <Label htmlFor="title" className="w-24">
                Title:
              </Label>
              <Input
                id="title"
                {...register("title", { required: actionText == "post" ? true : false })}
                className="border"
              />
            </div>
            {errors.title && (
              <span className="text-red-600">This field is required</span>
            )}
            <div className="flex justify-center items-center gap-4">
              <Label htmlFor="category" className="w-24">
                Category:
              </Label>
              <Input
                id="category"
                {...register("category", { required: actionText == "post" ? true : false })}
                className="border"
              />
            </div>
            {errors.category && (
              <span className="text-red-600">This field is required</span>
            )}
            <div className="flex justify-center items-center gap-4">
              <Label htmlFor="description" className="w-24">
                Description:
              </Label>
              <Input
                id="description"
                {...register("description", { required: actionText == "post" ? true : false })}
                className="border"
              />
            </div>
            {errors.description && (
              <span className="text-red-600">This field is required</span>
            )}
            <div className="flex justify-center items-center gap-4">
              <Label htmlFor="quantity" className="w-24">
                Quantity:
              </Label>
              <Input
                type="number"
                id="quantity"
                {...register("quantity", {
                  required: actionText == "post" ? true : false,
                })}
                className="border"
              />
            </div>
            {errors.quantity && (
              <span className="text-red-600">This field is required</span>
            )}

            <div className="flex justify-center items-center gap-4">
              <Label htmlFor="price" className="w-24">
                Price:
              </Label>
              <Input
                type="number"
                id="price"
                {...register("price", { required: actionText == "post" ? true : false })}
                className="border"
              />
            </div>
            {errors.price && (
              <span className="text-red-600">This field is required</span>
            )}
            <div className="flex justify-center items-center gap-4">
              <Label htmlFor="rating" className="w-24">
                Rating:
              </Label>
              <Controller
                control={control}
                name="rating"
                rules={{
                  validate: (rating: number) => {
                    if (actionText == "post") {
                      return rating > 0 || "Rating is required";
                    }
                    return true;
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Rating
                    className="h-10"
                    value={value}
                    isRequired={actionText == "post"}
                    onChange={onChange}
                    visibleLabelId="rating_label"
                    onBlur={onBlur}
                  />
                )}
              />
            </div>
            {errors.rating && (
              <span className="text-red-600">This field is required</span>
            )}
            <div className="flex justify-center items-center gap-4">
              <Label htmlFor="image" className="w-24 text-nowrap">
                Image Link:
              </Label>
              <Input
                id="image"
                {...register("image", { required: actionText == "post" ? true : false })}
                className="border"
              />
            </div>
            {errors.image && (
              <span className="text-red-600">This field is required</span>
            )}
            
            <DialogFooter>
              {actionText === "post" && (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  type="submit"
                >
                  Add Product
                </Button>
              )}
              {actionText === "update" && (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  type="submit"
                >
                  Update Product
                </Button>
              )}
            </DialogFooter>
          </form>
        )}
        {actionText === "delete" && <div>Are you sure??</div>}
        {actionText === "delete" && (
          <DialogFooter>
            <DialogClose
              className="bg-red-600 w-full text-white p-2 rounded-md hover:bg-red-700"
              onClick={() => deleteTheProduct(id as string)}
              type="submit"
            >
              Delete
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProduct;