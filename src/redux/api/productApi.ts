import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: ({ sort, searchFilter, filters }) => {
        let queryString = "/product?";
        if (searchFilter !== "") {
          queryString += `&searchTerm=${encodeURIComponent(searchFilter)}`;
        }

        if (sort !== "") {
          queryString += `&sort=${sort}`;
        }

        if (filters) {
          Object.keys(filters).forEach((key) => {
            const value = filters[key];
            if (value !== null && value !== undefined && value.trim() !== "") {
              queryString += `&${key}=${encodeURIComponent(value)}`;
            }
          });
        }

        return { url: queryString, method: "GET" };
      },
      providesTags: ["Products"],
    }),

    getAllCategory: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getSingleItem: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products", "Category"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/product/${data.id}`,
        method: "PUT",
        body: data.productData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Category"],
    }),
  }),
});
export const {
  useGetSingleItemQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductQuery,
  useGetAllCategoryQuery,
} = authApi;
