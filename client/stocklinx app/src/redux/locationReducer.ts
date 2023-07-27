import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { ILocation } from "../interfaces/interfaces";
const requestUrl = "Location/";

const baseLocation: ILocation = {
  id: "",
  name: "",
  createdDate: null,
  updatedDate: null,
  deletedDate: null,
  imagePath: null,
  address: null,
  city: null,
  state: null,
  address2: null,
  country: null,
  currency: null,
  notes: null,
  zipCode: null,
};

export const getAllLocations = createAsyncThunk(
  "locations/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ILocation>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getLocationById = createAsyncThunk(
  "locations/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ILocation>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createLocation = createAsyncThunk(
  "locations/create",
  async (location: ILocation, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ILocation>({
      requestUrl: requestUrl,
      queryData: location,
      apiType: "post",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateLocation = createAsyncThunk(
  "locations/update",
  async (location: ILocation, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ILocation>({
      requestUrl: requestUrl,
      queryData: location,
      apiType: "put",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeLocation = createAsyncThunk(
  "locations/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ILocation>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  location: ILocation;
  locations: ILocation[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  location: baseLocation,
  locations: [],
  status: "idle",
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<ILocation>) => {
      state.location = action.payload;
    },
    setLocations: (state, action: PayloadAction<ILocation[]>) => {
      state.locations = action.payload;
    },
    clearLocation: (state) => {
      state.location = baseLocation;
    },
    clearLocations: (state) => {
      state.locations = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllLocations.fulfilled, (state, action) => {
      state.error = null;
      state.locations = action.payload as ILocation[];
    });
    builder.addCase(getAllLocations.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getLocationById.fulfilled, (state, action) => {
      state.location = action.payload as ILocation;
      state.error = null;
    });
    builder.addCase(getLocationById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createLocation.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createLocation.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateLocation.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateLocation.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeLocation.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeLocation.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const { setLocation, setLocations, clearLocation, clearLocations } =
  locationSlice.actions;
export default locationSlice.reducer;
