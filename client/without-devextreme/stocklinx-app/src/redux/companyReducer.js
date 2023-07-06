import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Company/";

export const getAllCompanies = createAsyncThunk(
  "companies/getAll",
  async () => {
    const response = await request({
      requestUrl: requestUrl,
      apiType: "get",
    });
    return response.data;
  }
);
export const getCompanyById = createAsyncThunk(
  "companies/getById",
  async (Id) => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data;
  }
);
export const createCompany = createAsyncThunk(
  "companies/create",
  async (company, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: company,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateCompany = createAsyncThunk(
  "companies/update",
  async (company, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: company,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeCompany = createAsyncThunk(
  "companies/remove",
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

const companySlice = createSlice({
  name: "company",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearCompanies: (state, action) => {
      state.companies = {};
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
    });
  },
});

export const { setCompanies, clearCompanies } = companySlice.actions;
export default companySlice.reducer;
