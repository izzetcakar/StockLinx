import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Category/";

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async () => {
    const response = await request({
      requestUrl: requestUrl,
      apiType: "get",
    });
    return response.data;
  }
);
export const getCategoryById = createAsyncThunk(
  "categories/getById",
  async (Id) => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data;
  }
);
export const createCategory = createAsyncThunk(
  "categories/create",
  async (category, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: category,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "categories/update",
  async (category, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: category,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeCategory = createAsyncThunk(
  "categories/remove",
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

const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearCategories: (state, action) => {
      state.categories = {};
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { setCategories, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
