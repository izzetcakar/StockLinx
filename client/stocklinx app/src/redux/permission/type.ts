import { IPermission } from "@interfaces/serverInterfaces";
import { permissionConst } from "./constant";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

export type PermissionState = {
  permission: IPermission | null;
  permissions: IPermission[];
};
export type PermissionRequestPayload = {
  id: string;
};
export type PermissionPayload = {
  permission: IPermission;
};
export type PermissionsPayload = {
  permissions: IPermission[];
};
export type PermissionRemoveRangePayload = {
  ids: string[];
};
export type PermissionRemovePayload = {
  id: string;
};

//GET
export type FetchPermissionsRequest = {
  type: typeof permissionConst.FETCH_PERMISSIONS_REQUEST;
};
export type FetchPermissionsSuccess = {
  type: typeof permissionConst.FETCH_PERMISSIONS_SUCCESS;
  payload: PermissionsPayload;
};
export type FetchPermissionsFailure = {
  type: typeof permissionConst.FETCH_PERMISSIONS_FAILURE;
};

//GET:/ID
export type FetchPermissionRequest = {
  type: typeof permissionConst.FETCH_PERMISSION_REQUEST;
  payload: PermissionRequestPayload;
};
export type FetchPermissionSuccess = {
  type: typeof permissionConst.FETCH_PERMISSION_SUCCESS;
  payload: PermissionPayload;
};
export type FetchPermissionFailure = {
  type: typeof permissionConst.FETCH_PERMISSION_FAILURE;
};

//POST
export type CreatePermissionRequest = {
  type: typeof permissionConst.CREATE_PERMISSION_REQUEST;
  payload: PermissionPayload;
};
export type CreatePermissionSuccess = {
  type: typeof permissionConst.CREATE_PERMISSION_SUCCESS;
  payload: PermissionsPayload;
};
export type CreatePermissionFailure = {
  type: typeof permissionConst.CREATE_PERMISSION_FAILURE;
};

//POST RANGE
export type CreateRangePermissionRequest = {
  type: typeof permissionConst.CREATE_RANGE_PERMISSION_REQUEST;
  payload: PermissionsPayload;
};
export type CreateRangePermissionSuccess = {
  type: typeof permissionConst.CREATE_RANGE_PERMISSION_SUCCESS;
  payload: PermissionsPayload;
};
export type CreateRangePermissionFailure = {
  type: typeof permissionConst.CREATE_RANGE_PERMISSION_FAILURE;
};

//REMOVE
export type RemovePermissionRequest = {
  type: typeof permissionConst.REMOVE_PERMISSION_REQUEST;
  payload: PermissionRemovePayload;
};
export type RemovePermissionSuccess = {
  type: typeof permissionConst.REMOVE_PERMISSION_SUCCESS;
  payload: PermissionRemovePayload;
};
export type RemovePermissionFailure = {
  type: typeof permissionConst.REMOVE_PERMISSION_FAILURE;
};

//REMOVE RANGE
export type RemoveRangePermissionRequest = {
  type: typeof permissionConst.REMOVE_RANGE_PERMISSION_REQUEST;
  payload: PermissionRemoveRangePayload;
};
export type RemoveRangePermissionSuccess = {
  type: typeof permissionConst.REMOVE_RANGE_PERMISSION_SUCCESS;
  payload: PermissionRemoveRangePayload;
};
export type RemoveRangePermissionFailure = {
  type: typeof permissionConst.REMOVE_RANGE_PERMISSION_FAILURE;
};

//SYNC
export type SyncPermissionRequest = {
  type: typeof permissionConst.SYNC_PERMISSION_REQUEST;
  payload: PermissionsPayload;
};
export type SyncPermissionSuccess = {
  type: typeof permissionConst.SYNC_PERMISSION_SUCCESS;
  payload: PermissionsPayload;
};
export type SyncPermissionFailure = {
  type: typeof permissionConst.SYNC_PERMISSION_FAILURE;
};

//FILTER
export type FilterPermissionsRequest = {
  type: typeof permissionConst.FILTER_PERMISSIONS_REQUEST;
  payload: QueryFilter[];
};
export type FilterPermissionsSuccess = {
  type: typeof permissionConst.FILTER_PERMISSIONS_SUCCESS;
  payload: PermissionsPayload;
};
export type FilterPermissionsFailure = {
  type: typeof permissionConst.FILTER_PERMISSIONS_FAILURE;
};

//CLIENT ACTION TYPES
export type SetPermission = {
  type: typeof permissionConst.SET_PERMISSION;
  payload: IPermission | null;
};
export type SetPermissions = {
  type: typeof permissionConst.SET_PERMISSIONS;
  payload: IPermission[];
};
export type ClearPermission = {
  type: typeof permissionConst.CLEAR_PERMISSION;
};
export type ClearPermissions = {
  type: typeof permissionConst.CLEAR_PERMISSIONS;
};

export type PermissionActions =
  | FetchPermissionsRequest
  | FetchPermissionsSuccess
  | FetchPermissionsFailure
  | FetchPermissionRequest
  | FetchPermissionSuccess
  | FetchPermissionFailure
  | CreatePermissionRequest
  | CreatePermissionSuccess
  | CreatePermissionFailure
  | CreateRangePermissionRequest
  | CreateRangePermissionSuccess
  | CreateRangePermissionFailure
  | RemovePermissionRequest
  | RemovePermissionSuccess
  | RemovePermissionFailure
  | RemoveRangePermissionRequest
  | RemoveRangePermissionSuccess
  | RemoveRangePermissionFailure
  | SyncPermissionRequest
  | SyncPermissionSuccess
  | SyncPermissionFailure
  | FilterPermissionsRequest
  | FilterPermissionsSuccess
  | FilterPermissionsFailure
  | SetPermission
  | SetPermissions
  | ClearPermission
  | ClearPermissions;
