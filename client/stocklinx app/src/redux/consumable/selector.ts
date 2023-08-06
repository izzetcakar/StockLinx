import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.consumable.pending;

const getConsumables = (state: RootState) => state.consumable.consumables;

const getError = (state: RootState) => state.consumable.error;

export const getConsumablesSelector = createSelector(
  getConsumables,
  (consumables) => consumables
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
