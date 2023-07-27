import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { IManufacturer } from "../interfaces/interfaces";
const requestUrl = "Manufacturer/";

const baseManufacturer: IManufacturer = {
  id: "",
  name: "",
  createdDate: null,
  updatedDate: null,
  deletedDate: null,
  imagePath: null,
  supportEmail: null,
  supportPhone: null,
  website: null,
};

export const getAllManufacturers = createAsyncThunk(
  "manufacturers/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IManufacturer>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getManufacturerById = createAsyncThunk(
  "manufacturers/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IManufacturer>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createManufacturer = createAsyncThunk(
  "manufacturers/create",
  async (
    manufacturer: IManufacturer,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const response = await request<IManufacturer>({
      requestUrl: requestUrl,
      queryData: manufacturer,
      apiType: "post",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateManufacturer = createAsyncThunk(
  "manufacturers/update",
  async (
    manufacturer: IManufacturer,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const response = await request<IManufacturer>({
      requestUrl: requestUrl,
      queryData: manufacturer,
      apiType: "put",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeManufacturer = createAsyncThunk(
  "manufacturers/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IManufacturer>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  manufacturer: IManufacturer;
  manufacturers: IManufacturer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  manufacturer: baseManufacturer,
  manufacturers: [],
  status: "idle",
  error: null,
};

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    setManufacturer: (state, action: PayloadAction<IManufacturer>) => {
      state.manufacturer = action.payload;
    },
    setManufacturers: (state, action: PayloadAction<IManufacturer[]>) => {
      state.manufacturers = action.payload;
    },
    clearManufacturer: (state) => {
      state.manufacturer = baseManufacturer;
    },
    clearManufacturers: (state) => {
      state.manufacturers = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllManufacturers.fulfilled, (state, action) => {
      state.error = null;
      state.manufacturers = action.payload as IManufacturer[];
    });
    builder.addCase(getAllManufacturers.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getManufacturerById.fulfilled, (state, action) => {
      state.manufacturer = action.payload as IManufacturer;
      state.error = null;
    });
    builder.addCase(getManufacturerById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createManufacturer.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createManufacturer.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateManufacturer.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateManufacturer.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeManufacturer.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeManufacturer.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const {
  setManufacturer,
  setManufacturers,
  clearManufacturer,
  clearManufacturers,
} = manufacturerSlice.actions;
export default manufacturerSlice.reducer;
