import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Company/";
interface Company {}

export const getAllCompanies = createAsyncThunk<Company[]>(
  "companies/getAll",
  async (): Promise<Company[]> => {
    const response = await request<Company[]>({
      requestUrl: "Company/",
      apiType: "get",
    });
    return response.data as Company[];
  }
);
export const getCompanyById = createAsyncThunk(
  "companies/getById",
  async (Id): Promise<Company> => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data as Company;
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
interface State {
  items: Company[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  items: [],
  status: "idle",
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearCompanies: (state) => {
      state.items = [];
    },
    setCompanies: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getAllCompanies.fulfilled,
      (state, action: PayloadAction<Company[]>) => {
        state.items = action.payload;
      }
    );
  },
});

export const { setCompanies, clearCompanies } = companySlice.actions;
export default companySlice.reducer;
