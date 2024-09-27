import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import router from "./router/route.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="h-screen  w-full max-w-[1800px]  mx-auto ">
        <RouterProvider router={router} />
        <Toaster richColors />
      </div>
    </Provider>
  </React.StrictMode>
);
