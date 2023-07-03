import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Manufacturer/";

export const getAllManufacturers = createAsyncThunk(
  "manufacturers/getAll",
  async () => {
    const response = await request({
      requestUrl: requestUrl,
      apiType: "get",
    });
    return response.data;
  }
);
export const getManufacturerById = createAsyncThunk(
  "manufacturers/getById",
  async (Id) => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data;
  }
);
export const createManufacturer = createAsyncThunk(
  "manufacturers/create",
  async (manufacturer, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: manufacturer,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateManufacturer = createAsyncThunk(
  "manufacturers/update",
  async (manufacturer, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: manufacturer,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeManufacturer = createAsyncThunk(
  "manufacturers/remove",
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

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearManufacturers: (state, action) => {
      state.manufacturers = {};
    },
    setManufacturers: (state, action) => {
      state.manufacturers = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllManufacturers.fulfilled, (state, action) => {
      state.manufacturers = action.payload;
    });
  },
});

export const { setManufacturers, clearManufacturers } =
  manufacturerSlice.actions;
export default manufacturerSlice.reducer;
