import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.department.pending;

const getDepartments = (state: RootState) => state.department.departments;

const getError = (state: RootState) => state.department.error;

export const getDepartmentsSelector = createSelector(
  getDepartments,
  (departments) => departments
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
