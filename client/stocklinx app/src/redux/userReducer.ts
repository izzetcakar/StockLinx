import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import {
  ApiStatus,
  IToken,
  IUser,
  IUserLoginDto,
} from "../interfaces/interfaces";
const requestUrl = "User/";

export const getAllUsers = createAsyncThunk(
  "user/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IUser>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
export const signInUser = createAsyncThunk(
  "user/login",
  async (inputUser: IUserLoginDto, { rejectWithValue, fulfillWithValue }) => {
    const response = await request<IUserLoginDto>({
      requestUrl: requestUrl + "login",
      queryData: inputUser,
      apiType: "post",
    });
    if (response.success) {
      localStorage.setItem("token", JSON.stringify(response.data?.token));
      return fulfillWithValue(null);
    } else {
      return rejectWithValue(response.message);
    }
  }
);
// export const register = createAsyncThunk(
//   "user/register",
//   async (inputUser, { rejectWithValue, fulfillWithValue }) => {
//     const response = await request({
//       requestUrl: requestUrl + "register",
//       queryData: inputUser,
//       apiType: "post",
//     });
//     if (!response.success) {
//       return rejectWithValue(response.message);
//     } else {
//       localStorage.setItem("token", JSON.stringify(response.data.token));
//       return fulfillWithValue(null);
//     }
//   }
// );
export const getUserWithToken = createAsyncThunk(
  "user/getWithToken",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IUser>({
      requestUrl: requestUrl + "getWithToken",
      apiType: "get",
    });
    if (!response.success) return rejectWithValue(response.data);
    return fulfillWithValue(response.data);
  }
);

interface State {
  user: IUser | null;
  users: IUser[];
  status: ApiStatus;
  error: string | null;
}

const initialState: State = {
  user: null,
  users: [],
  status: ApiStatus.Idle,
  error: null,
};

const userItemSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload as IUser[];
      state.error = null;
    });
    builder.addCase(getUserWithToken.fulfilled, (state, action) => {
      state.user = action.payload as IUser;
      state.error = null;
    });
    builder.addCase(getUserWithToken.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload as string;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.status = ApiStatus.Success;
      state.error = null;
    });
    builder.addCase(signInUser.pending, (state, action) => {
      state.status = ApiStatus.Loading;
      state.error = null;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = ApiStatus.Idle;
    });
    // builder.addCase(register.rejected, (state, action) => {
    //   state.user = null;
    // });
    // builder.addCase(register.fulfilled, (state, action) => {});
  },
});

export const { clearUser } = userItemSlice.actions;
export default userItemSlice.reducer;
