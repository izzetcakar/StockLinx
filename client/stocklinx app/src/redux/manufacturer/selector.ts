import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.manufacturer.pending;

const getManufacturers = (state: RootState) => state.manufacturer.manufacturers;

const getError = (state: RootState) => state.manufacturer.error;

export const getManufacturersSelector = createSelector(
  getManufacturers,
  (manufacturers) => manufacturers
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
