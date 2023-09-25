import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getDepartments = (state: RootState) => state.department.departments;

export const getDepartmentsSelector = createSelector(
  getDepartments,
  (departments) => departments
);
