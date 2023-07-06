import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Department/";

export const getAllDepartments = createAsyncThunk(
  "departments/getAll",
  async () => {
    const response = await request({
      requestUrl: requestUrl,
      apiType: "get",
    });
    return response.data;
  }
);
export const getDepartmentById = createAsyncThunk(
  "departments/getById",
  async (Id) => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data;
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

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearDepartments: (state, action) => {
      state.departments = {};
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllDepartments.fulfilled, (state, action) => {
      state.departments = action.payload;
    });
  },
});

export const { setDepartments, clearDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;
