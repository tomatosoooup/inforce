import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { selectComments } from "./commentsSlice";

interface Product {
  id?: string;
  imageUrl?: string;
  name: string;
  count: number;
  comments?: string[];
  size: {
    width: string | number;
    height: string | number;
  };
  weight: string | number;
}

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

const API_URL = "http://localhost:3000";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct: Product) => {
    const response = await axios.post<Product>(
      `${API_URL}/products`,
      newProduct
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string) => {
    await axios.delete(`${API_URL}/products/${productId}`);
    return productId;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.products = action.payload;
        }
      )
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
        }
      )
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
        }
      );
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;

export const selectProductById = createSelector(
  [
    selectProducts,
    selectComments,
    (_: RootState, productId: string) => productId,
  ],
  (products, comments, productId) => {
    const product = products.find((product) => product.id === productId);

    if (!product) {
      return null;
    }

    const productComments = comments.filter(
      (comment) => comment.productId === productId
    );

    return { ...product, comments: productComments };
  }
);

export default productsSlice.reducer;
