import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Model/";

export const getAllModels = createAsyncThunk("models/getAll", async () => {
  const response = await request({
    requestUrl: requestUrl,
    apiType: "get",
  });
  return response.data;
});
export const getModelById = createAsyncThunk("models/getById", async (Id) => {
  const response = await request({
    requestUrl: requestUrl + `${Id}`,
    apiType: "get",
  });
  return response.data;
});
export const createModel = createAsyncThunk(
  "models/create",
  async (model, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: model,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateModel = createAsyncThunk(
  "models/update",
  async (model, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: model,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeModel = createAsyncThunk(
  "models/remove",
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

const modelSlice = createSlice({
  name: "model",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearModels: (state, action) => {
      state.models = {};
    },
    setModels: (state, action) => {
      state.models = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllModels.fulfilled, (state, action) => {
      state.models = action.payload;
    });
  },
});

export const { setModels, clearModels } = modelSlice.actions;
export default modelSlice.reducer;
