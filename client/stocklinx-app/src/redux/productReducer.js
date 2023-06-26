import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Product/";

export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  const response = await request({
    requestUrl: requestUrl,
    apiType: "get",
  });
  return response.data;
});
export const getProductById = createAsyncThunk(
  "products/getById",
  async (Id) => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data;
  }
);
export const createProduct = createAsyncThunk(
  "products/create",
  async (product, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: product,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "products/update",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: product,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeProduct = createAsyncThunk(
  "products/remove",
  async (Id, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    accessories: [],
    assets: [],
    components: [],
    consumables: [],
    licenses: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearProducts: (state, action) => {
      state.products = {};
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { setProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;
