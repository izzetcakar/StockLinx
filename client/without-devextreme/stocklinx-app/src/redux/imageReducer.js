import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Image/";

export const getAllImages = createAsyncThunk("images/getAll", async () => {
  const response = await request({
    requestUrl: requestUrl,
    apiType: "get",
  });
  return response.data;
});
export const getImageById = createAsyncThunk("images/getById", async (Id) => {
  const response = await request({
    requestUrl: requestUrl + `${Id}`,
    apiType: "get",
  });
  return response.data;
});
export const createImage = createAsyncThunk(
  "images/create",
  async (image, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: image,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateImage = createAsyncThunk(
  "images/update",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: image,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeImage = createAsyncThunk(
  "images/remove",
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

const imageSlice = createSlice({
  name: "image",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearImages: (state, action) => {
      state.images = {};
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllImages.fulfilled, (state, action) => {
      state.images = action.payload;
    });
  },
});

export const { setImages, clearImages } = imageSlice.actions;
export default imageSlice.reducer;
