import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.asset.pending;

const getAssets = (state: RootState) => state.asset.assets;

const getError = (state: RootState) => state.asset.error;

export const getAssetsSelector = createSelector(getAssets, (assets) => assets);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
