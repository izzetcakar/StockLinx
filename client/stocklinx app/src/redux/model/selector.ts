import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.model.pending;

const getModels = (state: RootState) => state.model.models;

const getError = (state: RootState) => state.model.error;

export const getModelsSelector = createSelector(getModels, (models) => models);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
