import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import {
  ApiStatus,
  IProductStatus,
  SelectData,
} from "../interfaces/interfaces";
const requestUrl = "ProductStatus/";

export const getAllProductStatuses = createAsyncThunk(
  "productStatuses/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IProductStatus>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getProductStatusById = createAsyncThunk(
  "productStatuses/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IProductStatus>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createProductStatus = createAsyncThunk(
  "productStatuses/create",
  async (
    productStatus: IProductStatus,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const response = await request<IProductStatus>({
      requestUrl: requestUrl,
      queryData: productStatus,
      apiType: "post",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateProductStatus = createAsyncThunk(
  "productStatuses/update",
  async (
    productStatus: IProductStatus,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const response = await request<IProductStatus>({
      requestUrl: requestUrl,
      queryData: productStatus,
      apiType: "put",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeProductStatus = createAsyncThunk(
  "productStatuses/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IProductStatus>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  productStatus: IProductStatus | null;
  productStatuses: IProductStatus[];
  selectData: SelectData[];
  status: ApiStatus;
  error: string | null;
}

const initialState: State = {
  productStatus: null,
  productStatuses: [],
  selectData: [],
  status: ApiStatus.Idle,
  error: null,
};

const productStatusesSlice = createSlice({
  name: "productStatus",
  initialState,
  reducers: {
    setProductStatus: (state, action: PayloadAction<IProductStatus>) => {
      state.productStatus = action.payload;
    },
    setProductStatuses: (state, action: PayloadAction<IProductStatus[]>) => {
      state.productStatuses = action.payload;
    },
    clearProductStatus: (state) => {
      state.productStatus = null;
    },
    clearProductStatuses: (state) => {
      state.productStatuses = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProductStatuses.fulfilled, (state, action) => {
      state.error = null;
      const newProductStatuses = action.payload as IProductStatus[];
      state.productStatuses = newProductStatuses;
      state.selectData = newProductStatuses.map((productStatus) => {
        return {
          value: productStatus.id,
          label: productStatus.name,
        };
      });
    });
    builder.addCase(getAllProductStatuses.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getAllProductStatuses.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getProductStatusById.fulfilled, (state, action) => {
      state.productStatus = action.payload as IProductStatus;
      state.error = null;
    });
    builder.addCase(getProductStatusById.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getProductStatusById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createProductStatus.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(createProductStatus.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(createProductStatus.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateProductStatus.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateProductStatus.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(updateProductStatus.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeProductStatus.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeProductStatus.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(removeProductStatus.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const {
  setProductStatus,
  setProductStatuses,
  clearProductStatus,
  clearProductStatuses,
} = productStatusesSlice.actions;
export default productStatusesSlice.reducer;
