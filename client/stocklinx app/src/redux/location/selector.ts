import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.location.pending;

const getLocations = (state: RootState) => state.location.locations;

const getError = (state: RootState) => state.location.error;

export const getLocationsSelector = createSelector(
  getLocations,
  (locations) => locations
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
