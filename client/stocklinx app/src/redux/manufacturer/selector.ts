import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getManufacturers = (state: RootState) => state.manufacturer.manufacturers;

export const getManufacturersSelector = createSelector(
  getManufacturers,
  (manufacturers) => manufacturers
);
