import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getModels = (state: RootState) => state.model.models;

export const getModelsSelector = createSelector(
  getModels,
  (models) => models
);
