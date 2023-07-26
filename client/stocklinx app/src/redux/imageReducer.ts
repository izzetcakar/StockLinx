import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../server/api";
const requestUrl = "Image/";
interface Image {}

export const getAllImages = createAsyncThunk<Image[]>(
  "images/getAll",
  async (): Promise<Image[]> => {
    const response = await request<Image[]>({
      requestUrl: "Image/",
      apiType: "get",
    });
    return response.data as Image[];
  }
);
export const getImageById = createAsyncThunk(
  "images/getById",
  async (Id): Promise<Image> => {
    const response = await request({
      requestUrl: requestUrl + `${Id}`,
      apiType: "get",
    });
    return response.data as Image;
  }
);
export const createImage = createAsyncThunk(
  "images/create",
  async (image, { fulfillWithValue, rejectWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: image,
      apiType: "post",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const updateImage = createAsyncThunk(
  "images/update",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    const response = await request({
      requestUrl: requestUrl,
      queryData: image,
      apiType: "put",
    });
    if (!response.success) {
      return rejectWithValue(response.message);
    } else {
      return fulfillWithValue(null);
    }
  }
);
export const removeImage = createAsyncThunk(
  "images/remove",
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
  items: Image[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  items: [],
  status: "idle",
  error: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    clearImages: (state) => {
      state.items = [];
    },
    setImages: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getAllImages.fulfilled,
      (state, action: PayloadAction<Image[]>) => {
        state.items = action.payload;
      }
    );
  },
});

export const { setImages, clearImages } = imageSlice.actions;
export default imageSlice.reducer;
