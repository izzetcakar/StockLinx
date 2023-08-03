import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { ApiStatus, IAccessory, SelectData } from "../interfaces/interfaces";
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
  selectData: SelectData[];
  status: ApiStatus;
  error: string | null;
}

const initialState: State = {
  accessory: null,
  accessories: [],
  selectData: [],
  status: ApiStatus.Idle,
  error: null,
};

const accessorieslice = createSlice({
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
      const newAccessories = action.payload as IAccessory[];
      state.accessories = newAccessories;
      state.selectData = newAccessories.map((accessory) => {
        return {
          value: accessory.id as string,
          label: accessory.name,
        };
      });
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(getAllAccessories.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getAllAccessories.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(getAccessoryById.fulfilled, (state, action) => {
      state.accessory = action.payload as IAccessory;
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(getAccessoryById.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getAccessoryById.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(createAccessory.fulfilled, (state) => {
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(createAccessory.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(createAccessory.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(updateAccessory.fulfilled, (state) => {
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(updateAccessory.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(updateAccessory.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(removeAccessory.fulfilled, (state) => {
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(removeAccessory.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(removeAccessory.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
  },
});

export const {
  setAccessory,
  setAccessories,
  clearAccessory,
  clearAccessories,
} = accessorieslice.actions;
export default accessorieslice.reducer;
