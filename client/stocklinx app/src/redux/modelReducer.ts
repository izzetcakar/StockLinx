import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { ApiStatus, IModel, SelectData } from "../interfaces/interfaces";
const requestUrl = "Model/";

export const getAllModels = createAsyncThunk(
  "models/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IModel>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getModelById = createAsyncThunk(
  "models/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IModel>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createModel = createAsyncThunk(
  "models/create",
  async (model: IModel, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IModel>({
      requestUrl: requestUrl,
      queryData: model,
      apiType: "post",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateModel = createAsyncThunk(
  "models/update",
  async (model: IModel, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IModel>({
      requestUrl: requestUrl,
      queryData: model,
      apiType: "put",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeModel = createAsyncThunk(
  "models/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IModel>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  model: IModel | null;
  models: IModel[];
  selectData: SelectData[];
  status: ApiStatus;
  error: string | null;
}

const initialState: State = {
  model: null,
  models: [],
  selectData: [],
  status: ApiStatus.Idle,
  error: null,
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<IModel>) => {
      state.model = action.payload;
    },
    setModels: (state, action: PayloadAction<IModel[]>) => {
      state.models = action.payload;
    },
    clearModel: (state) => {
      state.model = null;
    },
    clearModels: (state) => {
      state.models = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllModels.fulfilled, (state, action) => {
      state.error = null;
      const newModels = action.payload as IModel[];
      state.models = newModels;
      state.selectData = newModels.map((model) => {
        return {
          value: model.id,
          label: model.name,
        };
      });
    });
    builder.addCase(getAllModels.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getAllModels.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getModelById.fulfilled, (state, action) => {
      state.model = action.payload as IModel;
      state.error = null;
    });
    builder.addCase(getModelById.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getModelById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createModel.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(createModel.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(createModel.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateModel.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateModel.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(updateModel.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeModel.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeModel.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(removeModel.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setModel, setModels, clearModel, clearModels } =
  modelSlice.actions;
export default modelSlice.reducer;
