import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { ApiStatus, ILocation, SelectData } from "../interfaces/interfaces";
const requestUrl = "Location/";

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
  location: ILocation | null;
  locations: ILocation[];
  selectData: SelectData[];
  status: ApiStatus;
  error: string | null;
}

const initialState: State = {
  location: null,
  locations: [],
  selectData: [],
  status: ApiStatus.Idle,
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
      state.location = null;
    },
    clearLocations: (state) => {
      state.locations = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllLocations.fulfilled, (state, action) => {
      state.error = null;
      const newLocations = action.payload as ILocation[];
      state.locations = newLocations;
      state.selectData = newLocations.map((location) => {
        return {
          value: location.id,
          label: location.name,
        };
      });
    });
    builder.addCase(getAllLocations.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getAllLocations.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getLocationById.fulfilled, (state, action) => {
      state.location = action.payload as ILocation;
      state.error = null;
    });
    builder.addCase(getLocationById.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getLocationById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createLocation.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(createLocation.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(createLocation.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateLocation.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateLocation.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(updateLocation.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeLocation.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeLocation.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(removeLocation.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setLocation, setLocations, clearLocation, clearLocations } =
  locationSlice.actions;
export default locationSlice.reducer;
