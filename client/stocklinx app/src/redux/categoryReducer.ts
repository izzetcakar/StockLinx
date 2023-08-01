import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { ApiStatus, ICategory, SelectData } from "../interfaces/interfaces";
const requestUrl = "Category/";

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ICategory>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getCategoryById = createAsyncThunk(
  "categories/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ICategory>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createCategory = createAsyncThunk(
  "categories/create",
  async (category: ICategory, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ICategory>({
      requestUrl: requestUrl,
      queryData: category,
      apiType: "post",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateCategory = createAsyncThunk(
  "categories/update",
  async (category: ICategory, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ICategory>({
      requestUrl: requestUrl,
      queryData: category,
      apiType: "put",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeCategory = createAsyncThunk(
  "categories/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ICategory>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  category: ICategory | null;
  categories: ICategory[];
  selectData: SelectData[];
  status: ApiStatus;
  error: string | null;
}

const initialState: State = {
  category: null,
  categories: [],
  selectData: [],
  status: ApiStatus.Idle,
  error: null,
};

const categorieslice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<ICategory>) => {
      state.category = action.payload;
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    clearCategory: (state) => {
      state.category = null;
    },
    clearCategories: (state) => {
      state.categories = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.error = null;
      const newCategories = action.payload as ICategory[];
      state.categories = newCategories;
      state.selectData = newCategories.map((category) => {
        return {
          value: category.id,
          label: category.name,
        };
      });
    });
    builder.addCase(getAllCategories.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.category = action.payload as ICategory;
      state.error = null;
    });
    builder.addCase(getCategoryById.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeCategory.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeCategory.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(removeCategory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setCategory, setCategories, clearCategory, clearCategories } =
  categorieslice.actions;
export default categorieslice.reducer;
