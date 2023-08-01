import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { IAsset } from "../interfaces/interfaces";
const requestUrl = "Asset/";

export const getAllAssets = createAsyncThunk(
  "assets/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IAsset>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getAssetById = createAsyncThunk(
  "assets/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IAsset>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createAsset = createAsyncThunk(
  "assets/create",
  async (asset: IAsset, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IAsset>({
      requestUrl: requestUrl,
      queryData: asset,
      apiType: "post",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateAsset = createAsyncThunk(
  "assets/update",
  async (asset: IAsset, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IAsset>({
      requestUrl: requestUrl,
      queryData: asset,
      apiType: "put",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeAsset = createAsyncThunk(
  "assets/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IAsset>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  asset: IAsset | null;
  assets: IAsset[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  asset: null,
  assets: [],
  status: "idle",
  error: null,
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setAsset: (state, action: PayloadAction<IAsset>) => {
      state.asset = action.payload;
    },
    setAssets: (state, action: PayloadAction<IAsset[]>) => {
      state.assets = action.payload;
    },
    clearAsset: (state) => {
      state.asset = null;
    },
    clearAssets: (state) => {
      state.assets = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllAssets.fulfilled, (state, action) => {
      state.error = null;
      state.assets = action.payload as IAsset[];
    });
    builder.addCase(getAllAssets.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getAssetById.fulfilled, (state, action) => {
      state.asset = action.payload as IAsset;
      state.error = null;
    });
    builder.addCase(getAssetById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createAsset.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createAsset.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateAsset.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateAsset.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeAsset.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeAsset.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const { setAsset, setAssets, clearAsset, clearAssets } =
  assetSlice.actions;
export default assetSlice.reducer;
