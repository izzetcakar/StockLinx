import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Model/";
interface Model {}

export const getAllModels = createAsyncThunk<Model[]>(
  "models/getAll",
  async (): Promise<Model[]> => {
    const response = await request<Model[]>({
      requestUrl: "Model/",
      apiType: "get",
    });
    return response.data as Model[];
  }
);
export const getModelById = createAsyncThunk(
  "models/getById",
  async (Id): Promise<Model> => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data as Model;
  }
);
export const createModel = createAsyncThunk(
  "models/create",
  async (model, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: model,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateModel = createAsyncThunk(
  "models/update",
  async (model, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: model,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeModel = createAsyncThunk(
  "models/remove",
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
  items: Model[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  items: [],
  status: "idle",
  error: null,
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    clearModels: (state) => {
      state.items = [];
    },
    setModels: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getAllModels.fulfilled,
      (state, action: PayloadAction<Model[]>) => {
        state.items = action.payload;
      }
    );
  },
});

export const { setModels, clearModels } = modelSlice.actions;
export default modelSlice.reducer;
