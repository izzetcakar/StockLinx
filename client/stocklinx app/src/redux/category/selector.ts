import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getCategories = (state: RootState) => state.category.categories;

export const getCategoriesSelector = createSelector(
  getCategories,
  (categories) => categories
);
