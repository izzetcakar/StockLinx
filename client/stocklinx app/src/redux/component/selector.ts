import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getComponents = (state: RootState) => state.component.components;

export const getComponentsSelector = createSelector(
  getComponents,
  (components) => components
);
