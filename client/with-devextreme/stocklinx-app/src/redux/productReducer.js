import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const allowedReq = ["Accessory", "Asset", "Component", "Consumable", "License"];

const checkReqValid = (requestUrl, rejectWithValue) => {
  if (!allowedReq.includes(requestUrl)) {
    rejectWithValue("Request Url is not valid");
  }
};

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (requestUrl, { fulfillWithValue, rejectWithValue }) => {
    checkReqValid(requestUrl, rejectWithValue);
    const response = await request({
      requestUrl: requestUrl + "/",
      apiType: "get",
    });
    return fulfillWithValue({ type: requestUrl, data: response.data });
  }
);
export const getProductById = createAsyncThunk(
  "products/getById",
  async (requestUrl, id, { fulfillWithValue, rejectWithValue }) => {
    checkReqValid(requestUrl, rejectWithValue);
    const response = await request({
      requestUrl: requestUrl + "/" + `${id}`,
      apiType: "get",
    });
    return fulfillWithValue(response.data);
  }
);
export const createProduct = createAsyncThunk(
  "products/create",
  async (requestUrl, product, { fulfillWithValue, rejectWithValue }) => {
    checkReqValid(requestUrl, rejectWithValue);
    const response = await request({
      requestUrl: requestUrl + "/",
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
  async (requestUrl, product, { rejectWithValue, fulfillWithValue }) => {
    checkReqValid(requestUrl, rejectWithValue);
    const response = await request({
      requestUrl: requestUrl + "/",
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
  async (requestUrl, id, { rejectWithValue, fulfillWithValue }) => {
    checkReqValid(requestUrl, rejectWithValue);
    const response = await request({
      requestUrl: requestUrl + "/" + `${id}`,
      apiType: "delete",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
const matchRequest = (requestUrl) => {
  switch (requestUrl) {
    case "Accessory":
      return "accessories";
    case "Asset":
      return "assets";
    case "Component":
      return "components";
    case "Consumable":
      return "consumables";
    case "License":
      return "licenses";
  }
};

const productSlice = createSlice({
  name: "product",
  initialState: {
    accessories: ["test acc"],
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
      const { type, data } = action.payload;
      state[matchRequest(type)] = data;
      state.status = "fulfilled";
      state.error = null;
    });
  },
});

export const { setProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;
