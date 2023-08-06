import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.component.pending;

const getComponents = (state: RootState) => state.component.components;

const getError = (state: RootState) => state.component.error;

export const getComponentsSelector = createSelector(
  getComponents,
  (components) => components
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
