import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
import { IUser } from "../interfaces/interfaces";
const requestUrl = "User/";

export const getAllUsers = createAsyncThunk(
  "suppliers/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const response = await request<IUser>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    if (!response.success) return fulfillWithValue(response.data);
    return rejectWithValue(response.message);
  }
);
// export const login = createAsyncThunk(
//   "user/login",
//   async (inputUser, { rejectWithValue, fulfillWithValue }) => {
//     const response = await request({
//       requestUrl: requestUrl + "login",
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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  user: null,
  users: [],
  status: "idle",
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
    // builder.addCase(login.rejected, (state, action) => {
    //   state.user = {};
    // });
    // builder.addCase(login.fulfilled, (state, action) => {});
    // builder.addCase(register.rejected, (state, action) => {
    //   state.user = null;
    // });
    // builder.addCase(register.fulfilled, (state, action) => {});
  },
});

export const { clearUser } = userItemSlice.actions;
export default userItemSlice.reducer;
