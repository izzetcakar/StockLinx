import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { ApiStatus, ICompany, SelectData } from "../interfaces/interfaces";
const requestUrl = "Company/";

export const getAllCompanies = createAsyncThunk(
  "companies/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ICompany>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getCompanyById = createAsyncThunk(
  "companies/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ICompany>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createCompany = createAsyncThunk(
  "companies/create",
  async (company: ICompany, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ICompany>({
      requestUrl: requestUrl,
      queryData: company,
      apiType: "post",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateCompany = createAsyncThunk(
  "companies/update",
  async (company: ICompany, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ICompany>({
      requestUrl: requestUrl,
      queryData: company,
      apiType: "put",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeCompany = createAsyncThunk(
  "companies/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ICompany>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (!response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  company: ICompany | null;
  companies: ICompany[];
  selectData: SelectData[];
  status: ApiStatus;
  error: string | null;
}

const initialState: State = {
  company: null,
  companies: [],
  selectData: [],
  status: ApiStatus.Idle,
  error: null,
};

const companieslice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<ICompany>) => {
      state.company = action.payload;
    },
    setCompanies: (state, action: PayloadAction<ICompany[]>) => {
      state.companies = action.payload;
    },
    clearCompany: (state) => {
      state.company = null;
    },
    clearCompanies: (state) => {
      state.companies = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCompanies.fulfilled, (state, action) => {
      state.error = null;
      const newCompanies = action.payload as ICompany[];
      state.companies = newCompanies;
      state.selectData = newCompanies.map((company) => {
        return {
          value: company.id,
          label: company.name,
        };
      });
    });
    builder.addCase(getAllCompanies.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getAllCompanies.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getCompanyById.fulfilled, (state, action) => {
      state.company = action.payload as ICompany;
      state.error = null;
    });
    builder.addCase(getCompanyById.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getCompanyById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createCompany.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(createCompany.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(createCompany.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateCompany.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateCompany.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(updateCompany.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeCompany.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeCompany.pending, (state) => {
      state.status = ApiStatus.Loading;
    });
    builder.addCase(removeCompany.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setCompany, setCompanies, clearCompany, clearCompanies } =
  companieslice.actions;
export default companieslice.reducer;
