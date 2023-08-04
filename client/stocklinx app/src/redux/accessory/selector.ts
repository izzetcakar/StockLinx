import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.accessory.pending;

const getAccessories = (state: RootState) => state.accessory.accessories;

const getError = (state: RootState) => state.accessory.error;

export const getAccessoriesSelector = createSelector(
  getAccessories,
  (accessories) => accessories
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
