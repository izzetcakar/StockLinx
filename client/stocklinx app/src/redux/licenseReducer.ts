import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { ILicense } from "../interfaces/interfaces";
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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  license: null,
  licenses: [],
  status: "idle",
  error: null,
};

const licenseSlice = createSlice({
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
      state.error = null;
      state.licenses = action.payload as ILicense[];
    });
    builder.addCase(getAllLicenses.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(getLicenseById.fulfilled, (state, action) => {
      state.license = action.payload as ILicense;
      state.error = null;
    });
    builder.addCase(getLicenseById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createLicense.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createLicense.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updateLicense.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateLicense.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(removeLicense.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(removeLicense.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const { setLicense, setLicenses, clearLicense, clearLicenses } =
  licenseSlice.actions;
export default licenseSlice.reducer;
