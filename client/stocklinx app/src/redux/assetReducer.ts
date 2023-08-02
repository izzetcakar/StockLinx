import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { ApiStatus, IAsset, SelectData } from "../interfaces/interfaces";
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
  selectData: SelectData[];
  status: ApiStatus;
  error: string | null;
}

const initialState: State = {
  asset: null,
  assets: [],
  selectData: [],
  status: ApiStatus.Idle,
  error: null,
};

const assetslice = createSlice({
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
      const newAssets = action.payload as IAsset[];
      state.assets = newAssets;
      state.selectData = newAssets.map((asset) => {
        return {
          value: asset.id,
          label: asset.name,
        };
      });
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(getAllAssets.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getAllAssets.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(getAssetById.fulfilled, (state, action) => {
      state.asset = action.payload as IAsset;
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(getAssetById.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getAssetById.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(createAsset.fulfilled, (state) => {
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(createAsset.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(createAsset.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(updateAsset.fulfilled, (state) => {
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(updateAsset.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(updateAsset.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(removeAsset.fulfilled, (state) => {
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(removeAsset.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(removeAsset.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
  },
});

export const { setAsset, setAssets, clearAsset, clearAssets } =
  assetslice.actions;
export default assetslice.reducer;
