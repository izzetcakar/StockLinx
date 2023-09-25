import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getAccessories = (state: RootState) => state.accessory.accessories;

export const getAccessoriesSelector = createSelector(
  getAccessories,
  (accessories) => accessories
);
