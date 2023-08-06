import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.supplier.pending;

const getSuppliers = (state: RootState) => state.supplier.suppliers;

const getError = (state: RootState) => state.supplier.error;

export const getSuppliersSelector = createSelector(
  getSuppliers,
  (suppliers) => suppliers
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
