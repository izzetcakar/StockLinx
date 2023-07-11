import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Department/";
interface Department {}

export const getAllDepartments = createAsyncThunk<Department[]>(
  "departments/getAll",
  async (): Promise<Department[]> => {
    const response = await request<Department[]>({
      requestUrl: "Department/",
      apiType: "get",
    });
    return response.data as Department[];
  }
);
export const getDepartmentById = createAsyncThunk(
  "departments/getById",
  async (Id): Promise<Department> => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data as Department;
  }
);
export const createDepartment = createAsyncThunk(
  "departments/create",
  async (department, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: department,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateDepartment = createAsyncThunk(
  "departments/update",
  async (department, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: department,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeDepartment = createAsyncThunk(
  "departments/remove",
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
  items: Department[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  items: [],
  status: "idle",
  error: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    clearDepartments: (state) => {
      state.items = [];
    },
    setDepartments: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getAllDepartments.fulfilled,
      (state, action: PayloadAction<Department[]>) => {
        state.items = action.payload;
      }
    );
  },
});

export const { setDepartments, clearDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;
