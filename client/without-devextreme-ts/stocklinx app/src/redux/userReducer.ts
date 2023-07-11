import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "User/";

interface User {}

export const getAllUsers = createAsyncThunk(
  "user/getAll",
  async (): Promise<User[]> => {
    const response = await request<User[]>({
      requestUrl: requestUrl,
      apiType: "get",
    });
    return response.data as User[];
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
  async (): Promise<User> => {
    const response = await request<User>({
      requestUrl: requestUrl + "getWithToken",
      apiType: "get",
    });
    return response.data as User;
  }
);

interface State {
  user: User;
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  user: {},
  users: [],
  status: "idle",
  error: null,
};

const userItemSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
      localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getAllUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      }
    );
    builder.addCase(
      getUserWithToken.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    );
    builder.addCase(getUserWithToken.rejected, (state) => {
      state.user = {};
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
