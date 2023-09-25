import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getLicenses = (state: RootState) => state.license.licenses;

export const getLicensesSelector = createSelector(
  getLicenses,
  (licenses) => licenses
);
