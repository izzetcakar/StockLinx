import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Supplier/";
interface Supplier {}

export const getAllSuppliers = createAsyncThunk<Supplier[]>(
  "suppliers/getAll",
  async (): Promise<Supplier[]> => {
    const response = await request<Supplier[]>({
      requestUrl: "Supplier/",
      apiType: "get",
    });
    return response.data as Supplier[];
  }
);
export const getSupplierById = createAsyncThunk(
  "suppliers/getById",
  async (Id): Promise<Supplier> => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data as Supplier;
  }
);
export const createSupplier = createAsyncThunk(
  "suppliers/create",
  async (supplier, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: supplier,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateSupplier = createAsyncThunk(
  "suppliers/update",
  async (supplier, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: supplier,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeSupplier = createAsyncThunk(
  "suppliers/remove",
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
  items: Supplier[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  items: [],
  status: "idle",
  error: null,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    clearSuppliers: (state) => {
      state.items = [];
    },
    setSuppliers: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getAllSuppliers.fulfilled,
      (state, action: PayloadAction<Supplier[]>) => {
        state.items = action.payload;
      }
    );
  },
});

export const { setSuppliers, clearSuppliers } = supplierSlice.actions;
export default supplierSlice.reducer;
