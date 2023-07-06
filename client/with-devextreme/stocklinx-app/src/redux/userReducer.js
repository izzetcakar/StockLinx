import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "User/";

export const getAllUsers = createAsyncThunk("user/getAll", async () => {
  const response = await request({
    requestUrl: requestUrl,
    apiType: "get",
  });
  return response.data;
});
export const login = createAsyncThunk(
  "user/login",
  async (inputUser, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl + "login",
      queryData: inputUser,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return fulfillWithValue(null);
    }
  }
);
export const register = createAsyncThunk(
  "user/register",
  async (inputUser, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl + "register",
      queryData: inputUser,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return fulfillWithValue(null);
    }
  }
);
export const getUserWithToken = createAsyncThunk(
  "user/getWithToken",
  async () => {
    const response = await request({
      requestUrl: requestUrl + "getWithToken",
      apiType: "get",
    });
    return response.data;
  }
);

const userItemSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUserWithToken.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUserWithToken.rejected, (state, action) => {
      state.user = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {});
    builder.addCase(register.rejected, (state, action) => {
      state.user = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {});
  },
});

export const { clearUser } = userItemSlice.actions;
export default userItemSlice.reducer;
