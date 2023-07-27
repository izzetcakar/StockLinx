import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { IConsumable } from "../interfaces/interfaces";
const requestUrl = "Consumable/";

export const getAllConsumables = createAsyncThunk(
  "consumables/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IConsumable>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getConsumableById = createAsyncThunk(
  "consumables/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IConsumable>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createConsumable = createAsyncThunk(
  "consumables/create",
  async (consumable: IConsumable, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IConsumable>({
      requestUrl: requestUrl,
      queryData: consumable,
      apiType: "post",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateConsumable = createAsyncThunk(
  "consumables/update",
  async (consumable: IConsumable, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IConsumable>({
      requestUrl: requestUrl,
      queryData: consumable,
      apiType: "put",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeConsumable = createAsyncThunk(
  "consumables/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IConsumable>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  consumable: IConsumable | null;
  consumables: IConsumable[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  consumable: null,
  consumables: [],
  status: "idle",
  error: null,
};

const consumableSlice = createSlice({
  name: "consumable",
  initialState,
  reducers: {
    setConsumable: (state, action: PayloadAction<IConsumable>) => {
      state.consumable = action.payload;
    },
    setConsumables: (state, action: PayloadAction<IConsumable[]>) => {
      state.consumables = action.payload;
    },
    clearConsumable: (state) => {
      state.consumable = null;
    },
    clearConsumables: (state) => {
      state.consumables = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllConsumables.fulfilled, (state, action) => {
      state.error = null;
      state.consumables = action.payload as IConsumable[];
    });
    builder.addCase(getAllConsumables.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getConsumableById.fulfilled, (state, action) => {
      state.consumable = action.payload as IConsumable;
      state.error = null;
    });
    builder.addCase(getConsumableById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createConsumable.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createConsumable.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateConsumable.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateConsumable.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeConsumable.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeConsumable.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const {
  setConsumable,
  setConsumables,
  clearConsumable,
  clearConsumables,
} = consumableSlice.actions;
export default consumableSlice.reducer;
