import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/HomePage/Home";
import ProductPage from "@/pages/ProductPage/ProductPage";
import CheckoutPage from "@/pages/CheckoutPage/CheckoutPage";
import ItemManagemantPage from "@/pages/ItemManagementPage/ItemManagemantPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage/ProductDetailsPage";
import AllOrderPage from "@/pages/AllOrderPage/AllOrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <ProductPage></ProductPage>,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/dashboard",
        element: <ItemManagemantPage />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/allOrder",
        element: <AllOrderPage />,
      },
    ],
  },
]);

export default router;
