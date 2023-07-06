import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { createStore } from "redux";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import companyReducer from "./companyReducer";
import departmentReducer from "./departmentReducer";
import imageReducer from "./imageReducer";
import locationReducer from "./locationReducer";
import manufacturerReducer from "./manufacturerReducer";
import modelReducer from "./modelReducer";
import productReducer from "./productReducer";
import supplierReducer from "./supplierReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    company: companyReducer,
    department: departmentReducer,
    image: imageReducer,
    location: locationReducer,
    manufacturer: manufacturerReducer,
    model: modelReducer,
    product: productReducer,
    supplier: supplierReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
//const store = createStore(combineReducers({ page: pageReducer }));
export default store;
