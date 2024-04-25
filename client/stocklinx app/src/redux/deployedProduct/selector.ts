import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getDeployedProducts = (state: RootState) =>
  state.deployedProduct.deployedProducts;

export const getDeployedProductsSelector = createSelector(
  getDeployedProducts,
  (deployedProducts) => deployedProducts
);
