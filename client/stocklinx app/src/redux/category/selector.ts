import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.category.pending;

const getCategories = (state: RootState) => state.category.categories;

const getError = (state: RootState) => state.category.error;

export const getCategoriesSelector = createSelector(
  getCategories,
  (categories) => categories
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
