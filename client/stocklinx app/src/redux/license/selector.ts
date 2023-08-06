import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.license.pending;

const getLicenses = (state: RootState) => state.license.licenses;

const getError = (state: RootState) => state.license.error;

export const getLicensesSelector = createSelector(
  getLicenses,
  (licenses) => licenses
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
