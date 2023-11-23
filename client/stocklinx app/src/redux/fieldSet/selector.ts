import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getFieldSets = (state: RootState) => state.fieldSet.fieldSets;

export const getFieldSetsSelector = createSelector(
  getFieldSets,
  (fieldSets) => fieldSets
);
