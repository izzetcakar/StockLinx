import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getProductStatuses = (state: RootState) =>
  state.productStatus.productStatuses;

export const getProductStatusesSelector = createSelector(
  getProductStatuses,
  (productStatuses) => productStatuses
);
