import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category", "Products", "Order"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders/allOrders",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetAllOrdersQuery } = orderApi;
