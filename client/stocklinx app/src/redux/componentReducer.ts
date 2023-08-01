import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { IComponent } from "../interfaces/interfaces";
const requestUrl = "Component/";

export const getAllComponents = createAsyncThunk(
  "components/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IComponent>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getComponentById = createAsyncThunk(
  "components/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IComponent>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createComponent = createAsyncThunk(
  "components/create",
  async (component: IComponent, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IComponent>({
      requestUrl: requestUrl,
      queryData: component,
      apiType: "post",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateComponent = createAsyncThunk(
  "components/update",
  async (component: IComponent, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IComponent>({
      requestUrl: requestUrl,
      queryData: component,
      apiType: "put",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeComponent = createAsyncThunk(
  "components/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IComponent>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  component: IComponent | null;
  components: IComponent[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  component: null,
  components: [],
  status: "idle",
  error: null,
};

const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    setComponent: (state, action: PayloadAction<IComponent>) => {
      state.component = action.payload;
    },
    setComponents: (state, action: PayloadAction<IComponent[]>) => {
      state.components = action.payload;
    },
    clearComponent: (state) => {
      state.component = null;
    },
    clearComponents: (state) => {
      state.components = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllComponents.fulfilled, (state, action) => {
      state.error = null;
      state.components = action.payload as IComponent[];
    });
    builder.addCase(getAllComponents.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getComponentById.fulfilled, (state, action) => {
      state.component = action.payload as IComponent;
      state.error = null;
    });
    builder.addCase(getComponentById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createComponent.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createComponent.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateComponent.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateComponent.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeComponent.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeComponent.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const { setComponent, setComponents, clearComponent, clearComponents } =
  componentSlice.actions;
export default componentSlice.reducer;
