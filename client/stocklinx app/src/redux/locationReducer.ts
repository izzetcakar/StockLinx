import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Location/";
interface Location {}

export const getAllLocations = createAsyncThunk<Location[]>(
  "locations/getAll",
  async (): Promise<Location[]> => {
    const response = await request<Location[]>({
      requestUrl: "Location/",
      apiType: "get",
    });
    return response.data as Location[];
  }
);
export const getLocationById = createAsyncThunk(
  "locations/getById",
  async (Id): Promise<Location> => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data as Location;
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
interface State {
  items: Location[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  items: [],
  status: "idle",
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearLocations: (state) => {
      state.items = [];
    },
    setLocations: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getAllLocations.fulfilled,
      (state, action: PayloadAction<Location[]>) => {
        state.items = action.payload;
      }
    );
  },
});

export const { setLocations, clearLocations } = locationSlice.actions;
export default locationSlice.reducer;
