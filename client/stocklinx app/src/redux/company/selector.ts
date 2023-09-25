import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getCompanies = (state: RootState) => state.company.companies;

export const getCompaniesSelector = createSelector(
  getCompanies,
  (companies) => companies
);
