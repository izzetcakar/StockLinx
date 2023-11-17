import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getBranches = (state: RootState) => state.branch.branches;

export const getBranchesSelector = createSelector(
  getBranches,
  (branches) => branches
);
