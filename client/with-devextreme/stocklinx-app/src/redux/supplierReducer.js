import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Supplier/";

export const getAllSuppliers = createAsyncThunk(
  "suppliers/getAll",
  async () => {
    const response = await request({
      requestUrl: requestUrl,
      apiType: "get",
    });
    return response.data;
  }
);
export const getSupplierById = createAsyncThunk(
  "suppliers/getById",
  async (Id) => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data;
  }
);
export const createSupplier = createAsyncThunk(
  "suppliers/create",
  async (supplier, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: supplier,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateSupplier = createAsyncThunk(
  "suppliers/update",
  async (supplier, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: supplier,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeSupplier = createAsyncThunk(
  "suppliers/remove",
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

const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearSuppliers: (state, action) => {
      state.suppliers = {};
    },
    setSuppliers: (state, action) => {
      state.suppliers = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllSuppliers.fulfilled, (state, action) => {
      state.suppliers = action.payload;
    });
  },
});

export const { setSuppliers, clearSuppliers } = supplierSlice.actions;
export default supplierSlice.reducer;
