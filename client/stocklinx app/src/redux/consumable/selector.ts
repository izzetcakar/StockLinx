import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getConsumables = (state: RootState) => state.consumable.consumables;

export const getConsumablesSelector = createSelector(
  getConsumables,
  (consumables) => consumables
);
