import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { ISupplier } from "../interfaces/interfaces";
const requestUrl = "Supplier/";

export const getAllSuppliers = createAsyncThunk(
  "suppliers/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ISupplier>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getSupplierById = createAsyncThunk(
  "suppliers/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ISupplier>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createSupplier = createAsyncThunk(
  "suppliers/create",
  async (supplier: ISupplier, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ISupplier>({
      requestUrl: requestUrl,
      queryData: supplier,
      apiType: "post",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateSupplier = createAsyncThunk(
  "suppliers/update",
  async (supplier: ISupplier, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ISupplier>({
      requestUrl: requestUrl,
      queryData: supplier,
      apiType: "put",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeSupplier = createAsyncThunk(
  "suppliers/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ISupplier>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  supplier: ISupplier | null;
  suppliers: ISupplier[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  supplier: null,
  suppliers: [],
  status: "idle",
  error: null,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    setSupplier: (state, action: PayloadAction<ISupplier>) => {
      state.supplier = action.payload;
    },
    setSuppliers: (state, action: PayloadAction<ISupplier[]>) => {
      state.suppliers = action.payload;
    },
    clearSupplier: (state) => {
      state.supplier = null;
    },
    clearSuppliers: (state) => {
      state.suppliers = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllSuppliers.fulfilled, (state, action) => {
      state.error = null;
      state.suppliers = action.payload as ISupplier[];
    });
    builder.addCase(getAllSuppliers.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getSupplierById.fulfilled, (state, action) => {
      state.supplier = action.payload as ISupplier;
      state.error = null;
    });
    builder.addCase(getSupplierById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createSupplier.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createSupplier.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateSupplier.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateSupplier.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeSupplier.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeSupplier.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const { setSupplier, setSuppliers, clearSupplier, clearSuppliers } =
  supplierSlice.actions;
export default supplierSlice.reducer;
