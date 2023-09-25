import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getLoading = (state: RootState) => state.generic.loading;
const getError = (state: RootState) => state.generic.error;

export const getLoadingSelector = createSelector(
  getLoading,
  (loading) => loading
);
export const getErrorSelector = createSelector(getError, (error) => error);
