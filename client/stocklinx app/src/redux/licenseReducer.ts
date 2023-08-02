import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { ApiStatus, ILicense, SelectData } from "../interfaces/interfaces";
const requestUrl = "License/";

export const getAllLicenses = createAsyncThunk(
  "licenses/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ILicense>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const getLicenseById = createAsyncThunk(
  "licenses/getById",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ILicense>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const createLicense = createAsyncThunk(
  "licenses/create",
  async (license: ILicense, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ILicense>({
      requestUrl: requestUrl,
      queryData: license,
      apiType: "post",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const updateLicense = createAsyncThunk(
  "licenses/update",
  async (license: ILicense, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ILicense>({
      requestUrl: requestUrl,
      queryData: license,
      apiType: "put",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
export const removeLicense = createAsyncThunk(
  "licenses/remove",
  async (Id: string, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<ILicense>({
      requestUrl: requestUrl + `${Id}`,
      apiType: "delete",
    });
    if (response.success) return fulfillWithValue(null);
    return rejectWithValue(response.message);
  }
);
interface State {
  license: ILicense | null;
  licenses: ILicense[];
  selectData: SelectData[];
  status: ApiStatus;
  error: string | null;
}

const initialState: State = {
  license: null,
  licenses: [],
  selectData: [],
  status: ApiStatus.Idle,
  error: null,
};

const licenseslice = createSlice({
  name: "license",
  initialState,
  reducers: {
    setLicense: (state, action: PayloadAction<ILicense>) => {
      state.license = action.payload;
    },
    setLicenses: (state, action: PayloadAction<ILicense[]>) => {
      state.licenses = action.payload;
    },
    clearLicense: (state) => {
      state.license = null;
    },
    clearLicenses: (state) => {
      state.licenses = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllLicenses.fulfilled, (state, action) => {
      const newLicenses = action.payload as ILicense[];
      state.licenses = newLicenses;
      state.selectData = newLicenses.map((license) => {
        return {
          value: license.id,
          label: license.name,
        };
      });
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(getAllLicenses.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getAllLicenses.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(getLicenseById.fulfilled, (state, action) => {
      state.license = action.payload as ILicense;
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(getLicenseById.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(getLicenseById.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(createLicense.fulfilled, (state) => {
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(createLicense.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(createLicense.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(updateLicense.fulfilled, (state) => {
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(updateLicense.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(updateLicense.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
    builder.addCase(removeLicense.fulfilled, (state) => {
      state.error = null;
      state.status = ApiStatus.Success;
    });
    builder.addCase(removeLicense.pending, (state) => {
      state.error = null;
      state.status = ApiStatus.Loading;
    });
    builder.addCase(removeLicense.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Failed;
    });
  },
});

export const { setLicense, setLicenses, clearLicense, clearLicenses } =
  licenseslice.actions;
export default licenseslice.reducer;
