import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Manufacturer/";
interface Manufacturer {}

export const getAllManufacturers = createAsyncThunk<Manufacturer[]>(
  "manufacturers/getAll",
  async (): Promise<Manufacturer[]> => {
    const response = await request<Manufacturer[]>({
      requestUrl: "Manufacturer/",
      apiType: "get",
    });
    return response.data as Manufacturer[];
  }
);
export const getManufacturerById = createAsyncThunk(
  "manufacturers/getById",
  async (Id): Promise<Manufacturer> => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data as Manufacturer;
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
interface State {
  items: Manufacturer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  items: [],
  status: "idle",
  error: null,
};

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    clearManufacturers: (state) => {
      state.items = [];
    },
    setManufacturers: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getAllManufacturers.fulfilled,
      (state, action: PayloadAction<Manufacturer[]>) => {
        state.items = action.payload;
      }
    );
  },
});

export const { setManufacturers, clearManufacturers } =
  manufacturerSlice.actions;
export default manufacturerSlice.reducer;
