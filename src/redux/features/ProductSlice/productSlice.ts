import { IProduct } from "@/interface/product.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductType {
  id: string;
  title: string;
  amount: number;
  price: number;
}

export interface DataState {
  isLoading: boolean;
  data: IProduct[];
}

export interface ProductArrayState {
  product: ProductType[];
  totalPrice: number;
  dataState: DataState;
  categoryFilter: string;
  sortFilter: string;
  searchFilter: string;
}

const initialState: ProductArrayState = {
  product: [],
  totalPrice: 0,
  categoryFilter: "",
  sortFilter: "",
  searchFilter: "",
  dataState: { isLoading: true, data: [] },
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        price: number;
        quantity: number;
        availability: string;
      }>
    ) => {
      const existingProduct = state.product.find(
        (item) => item.title === action.payload.title
      );
      if (existingProduct) {
        existingProduct.amount += 1;
      } else {
        const newProduct = {
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          amount: 1,
        };
        state.product.push(newProduct);
      }
      state.totalPrice = parseFloat(
        state.product
          .reduce((total, item) => {
            return total + item.amount * item.price;
          }, 0)
          .toFixed(2)
      );
    },

    increassItem: (
      state,
      action: PayloadAction<{
        title: string;
      }>
    ) => {
      const existingProduct = state.product.find(
        (item) => item.title === action.payload.title
      );
      if (existingProduct) {
        existingProduct.amount += 1;
      }
      state.totalPrice = parseFloat(
        state.product
          .reduce((total, item) => {
            return total + item.amount * item.price;
          }, 0)
          .toFixed(2)
      );
    },
    decreassItem: (
      state,
      action: PayloadAction<{
        title: string;
      }>
    ) => {
      const existingProduct = state.product.find(
        (item) => item.title === action.payload.title
      );
      if (existingProduct) {
        existingProduct.amount -= 1;

        if (existingProduct.amount == 0) {
          state.product = state.product.filter(
            (item) => item.title !== action.payload.title
          );
        }
      }

      state.totalPrice = parseFloat(
        state.product
          .reduce((total, item) => {
            return total + item.amount * item.price;
          }, 0)
          .toFixed(2)
      );
    },
    setProductData: (state, action: PayloadAction<DataState>) => {
      state.dataState = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
    setSortFilter: (state, action: PayloadAction<string>) => {
      state.sortFilter = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    resetSearchFilterOption: (state) => {
      state.searchFilter = "";
      state.categoryFilter = "";
      state.sortFilter = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addItemToCart,
  increassItem,
  decreassItem,
  setProductData,
  setSearchFilter,
  setCategoryFilter,
  setSortFilter,
  resetSearchFilterOption,
} = productSlice.actions;

export default productSlice.reducer;
