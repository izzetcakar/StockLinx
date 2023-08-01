import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { IAccessory } from "../interfaces/interfaces";
const requestUrl = "Accessory/";

export const getAllAccessories = createAsyncThunk(
  "accessories/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IAccessory>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getAccessoryById = createAsyncThunk(
  "accessories/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IAccessory>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createAccessory = createAsyncThunk(
  "accessories/create",
  async (accessory: IAccessory, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IAccessory>({
      requestUrl: requestUrl,
      queryData: accessory,
      apiType: "post",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateAccessory = createAsyncThunk(
  "accessories/update",
  async (accessory: IAccessory, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IAccessory>({
      requestUrl: requestUrl,
      queryData: accessory,
      apiType: "put",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeAccessory = createAsyncThunk(
  "accessories/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IAccessory>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  accessory: IAccessory | null;
  accessories: IAccessory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  accessory: null,
  accessories: [],
  status: "idle",
  error: null,
};

const accessorySlice = createSlice({
  name: "accessory",
  initialState,
  reducers: {
    setAccessory: (state, action: PayloadAction<IAccessory>) => {
      state.accessory = action.payload;
    },
    setAccessories: (state, action: PayloadAction<IAccessory[]>) => {
      state.accessories = action.payload;
    },
    clearAccessory: (state) => {
      state.accessory = null;
    },
    clearAccessories: (state) => {
      state.accessories = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllAccessories.fulfilled, (state, action) => {
      state.error = null;
      state.accessories = action.payload as IAccessory[];
    });
    builder.addCase(getAllAccessories.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getAccessoryById.fulfilled, (state, action) => {
      state.accessory = action.payload as IAccessory;
      state.error = null;
    });
    builder.addCase(getAccessoryById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createAccessory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createAccessory.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateAccessory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateAccessory.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeAccessory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeAccessory.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const {
  setAccessory,
  setAccessories,
  clearAccessory,
  clearAccessories,
} = accessorySlice.actions;
export default accessorySlice.reducer;
