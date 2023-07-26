import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Category/";
interface Category {}

export const getAllCategories = createAsyncThunk<Category[]>(
  "categories/getAll",
  async (): Promise<Category[]> => {
    const response = await request<Category[]>({
      requestUrl: "Category/",
      apiType: "get",
    });
    return response.data as Category[];
  }
);
export const getCategoryById = createAsyncThunk(
  "categories/getById",
  async (Id): Promise<Category> => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data as Category;
  }
);
export const createCategory = createAsyncThunk(
  "categories/create",
  async (category, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: category,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "categories/update",
  async (category, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: category,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeCategory = createAsyncThunk(
  "categories/remove",
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
  items: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  items: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.items = [];
    },
    setCategories: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getAllCategories.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.items = action.payload;
      }
    );
  },
});

export const { setCategories, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
