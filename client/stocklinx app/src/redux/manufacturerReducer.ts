import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { ApiStatus, IManufacturer, SelectData } from "../interfaces/interfaces";
const requestUrl = "Manufacturer/";

export const getAllManufacturers = createAsyncThunk(
  "manufacturers/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IManufacturer>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
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
    if (response.success) return fulfillWithValue(response.data);
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
    if (response.success) return fulfillWithValue(null);
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
    if (response.success) return fulfillWithValue(null);
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
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  manufacturer: IManufacturer | null;
  manufacturers: IManufacturer[];
  selectData: SelectData[];
  status: ApiStatus;
  error: string | null;
}

const initialState: State = {
  manufacturer: null,
  manufacturers: [],
  selectData: [],
  status: ApiStatus.Idle,
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
      state.manufacturer = null;
    },
    clearManufacturers: (state) => {
      state.manufacturers = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllManufacturers.fulfilled, (state, action) => {
      state.error = null;
      const newManufacturers = action.payload as IManufacturer[];
      state.manufacturers = newManufacturers;
      state.selectData = newManufacturers.map((manufacturer) => {
        return {
          value: manufacturer.id,
          label: manufacturer.name,
        };
      });
    });
    builder.addCase(getAllManufacturers.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getAllManufacturers.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getManufacturerById.fulfilled, (state, action) => {
      state.manufacturer = action.payload as IManufacturer;
      state.error = null;
    });
    builder.addCase(getManufacturerById.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getManufacturerById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createManufacturer.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(createManufacturer.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(createManufacturer.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateManufacturer.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateManufacturer.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(updateManufacturer.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeManufacturer.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeManufacturer.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(removeManufacturer.rejected, (state, action) => {
      state.error = action.payload as string;
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
