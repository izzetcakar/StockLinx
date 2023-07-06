import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Location/";

export const getAllLocations = createAsyncThunk(
  "locations/getAll",
  async () => {
    const response = await request({
      requestUrl: requestUrl,
      apiType: "get",
    });
    return response.data;
  }
);
export const getLocationById = createAsyncThunk(
  "locations/getById",
  async (Id) => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data;
  }
);
export const createLocation = createAsyncThunk(
  "locations/create",
  async (location, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: location,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateLocation = createAsyncThunk(
  "locations/update",
  async (location, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: location,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeLocation = createAsyncThunk(
  "locations/remove",
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

const locationSlice = createSlice({
  name: "location",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearLocations: (state, action) => {
      state.locations = {};
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
    });
  },
});

export const { setLocations, clearLocations } = locationSlice.actions;
export default locationSlice.reducer;
