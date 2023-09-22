import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getLoading = (state: RootState) => state.generic.loading;

export const getLoadingSelector = createSelector(
  getLoading,
  (companies) => companies
);
