import { combineReducers } from "redux";
import accessoryReducer from "./accessory/reducer";

const rootReducer = combineReducers({
  accessory: accessoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
