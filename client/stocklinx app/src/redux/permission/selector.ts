import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPermissions = (state: RootState) => state.permission.permissions;

export const getPermissionsSelector = createSelector(
  getPermissions,
  (permissions) => permissions
);
