import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { generateId } from "../functions/generateId";
import { ICategory } from "../interfaces/interfaces";
const requestUrl = "Category/";

const baseCategory: ICategory = {
  id: generateId(),
  name: "",
  createdDate: null,
  updatedDate: null,
  deletedDate: null,
  imagePath: null,
};

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ICategory>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
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
    if (!response.success) return fulfillWithValue(response.data);
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
    if (!response.success) return fulfillWithValue(null);
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
    if (!response.success) return fulfillWithValue(null);
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
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  category: ICategory;
  categories: ICategory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  category: baseCategory,
  categories: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
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
      state.category = baseCategory;
    },
    clearCategories: (state) => {
      state.categories = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.error = null;
      state.categories = action.payload as ICategory[];
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.category = action.payload as ICategory;
      state.error = null;
    });
    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeCategory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeCategory.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const { setCategory, setCategories, clearCategory, clearCategories } =
  categorySlice.actions;
export default categorySlice.reducer;
