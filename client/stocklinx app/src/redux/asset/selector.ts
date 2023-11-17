import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getAssets = (state: RootState) => state.asset.assets;

export const getAssetsSelector = createSelector(
  getAssets,
  (assets) => assets
);
