import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.company.pending;

const getCompanies = (state: RootState) => state.company.companies;

const getError = (state: RootState) => state.company.error;

export const getCompaniesSelector = createSelector(
  getCompanies,
  (companies) => companies
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
