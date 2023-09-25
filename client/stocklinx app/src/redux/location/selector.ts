import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getLocations = (state: RootState) => state.location.locations;

export const getLocationsSelector = createSelector(
  getLocations,
  (locations) => locations
);
