import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.productStatus.pending;

const getProductStatuses = (state: RootState) =>
  state.productStatus.productStatuses;

const getError = (state: RootState) => state.productStatus.error;

export const getProductStatusesSelector = createSelector(
  getProductStatuses,
  (productStatuses) => productStatuses
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
