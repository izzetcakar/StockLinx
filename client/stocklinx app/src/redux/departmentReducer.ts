import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { generateId } from "../functions/generateId";
import { IDepartment } from "../interfaces/interfaces";
const requestUrl = "Department/";

const baseDepartment: IDepartment = {
  id: generateId(),
  name: "",
  createdDate: null,
  updatedDate: null,
  deletedDate: null,
  imagePath: null,
  companyId: null,
  locationId: null,
  managerId: null,
  notes: null,
};

export const getAllDepartments = createAsyncThunk(
  "departments/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IDepartment>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getDepartmentById = createAsyncThunk(
  "departments/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IDepartment>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createDepartment = createAsyncThunk(
  "departments/create",
  async (department: IDepartment, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IDepartment>({
      requestUrl: requestUrl,
      queryData: department,
      apiType: "post",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateDepartment = createAsyncThunk(
  "departments/update",
  async (department: IDepartment, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IDepartment>({
      requestUrl: requestUrl,
      queryData: department,
      apiType: "put",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeDepartment = createAsyncThunk(
  "departments/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IDepartment>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  department: IDepartment;
  departments: IDepartment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  department: baseDepartment,
  departments: [],
  status: "idle",
  error: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setDepartment: (state, action: PayloadAction<IDepartment>) => {
      state.department = action.payload;
    },
    setDepartments: (state, action: PayloadAction<IDepartment[]>) => {
      state.departments = action.payload;
    },
    clearDepartment: (state) => {
      state.department = baseDepartment;
    },
    clearDepartments: (state) => {
      state.departments = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllDepartments.fulfilled, (state, action) => {
      state.error = null;
      state.departments = action.payload as IDepartment[];
    });
    builder.addCase(getAllDepartments.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getDepartmentById.fulfilled, (state, action) => {
      state.department = action.payload as IDepartment;
      state.error = null;
    });
    builder.addCase(getDepartmentById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createDepartment.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createDepartment.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateDepartment.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateDepartment.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeDepartment.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeDepartment.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const {
  setDepartment,
  setDepartments,
  clearDepartment,
  clearDepartments,
} = departmentSlice.actions;
export default departmentSlice.reducer;
