import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getSuppliers = (state: RootState) => state.supplier.suppliers;

export const getSuppliersSelector = createSelector(
  getSuppliers,
  (suppliers) => suppliers
);
