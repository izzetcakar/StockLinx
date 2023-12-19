import { IPermission } from "../../interfaces/interfaces";
import { permissionConst } from "./constant";

export interface PermissionState {
  permission: IPermission | null;
  permissions: IPermission[];
}
export interface PermissionRequestPayload {
  id: string;
}
export interface PermissionPayload {
  permission: IPermission;
}
export interface PermissionsPayload {
  permissions: IPermission[];
}
export interface PermissionRemoveRangePayload {
  ids: string[];
}
export interface PermissionRemovePayload {
  id: string;
}

//GET
export interface FetchPermissionsRequest {
  type: typeof permissionConst.FETCH_PERMISSIONS_REQUEST;
}
export type FetchPermissionsSuccess = {
  type: typeof permissionConst.FETCH_PERMISSIONS_SUCCESS;
  payload: PermissionsPayload;
};
export type FetchPermissionsFailure = {
  type: typeof permissionConst.FETCH_PERMISSIONS_FAILURE;
};

//GET:/ID
export interface FetchPermissionRequest {
  type: typeof permissionConst.FETCH_PERMISSION_REQUEST;
  payload: PermissionRequestPayload;
}
export type FetchPermissionSuccess = {
  type: typeof permissionConst.FETCH_PERMISSION_SUCCESS;
  payload: PermissionPayload;
};
export type FetchPermissionFailure = {
  type: typeof permissionConst.FETCH_PERMISSION_FAILURE;
};

//POST
export interface CreatePermissionRequest {
  type: typeof permissionConst.CREATE_PERMISSION_REQUEST;
  payload: PermissionPayload;
}
export type CreatePermissionSuccess = {
  type: typeof permissionConst.CREATE_PERMISSION_SUCCESS;
  payload: PermissionsPayload;
};
export type CreatePermissionFailure = {
  type: typeof permissionConst.CREATE_PERMISSION_FAILURE;
};

//POST RANGE
export interface CreateRangePermissionRequest {
  type: typeof permissionConst.CREATE_RANGE_PERMISSION_REQUEST;
  payload: PermissionsPayload;
}
export type CreateRangePermissionSuccess = {
  type: typeof permissionConst.CREATE_RANGE_PERMISSION_SUCCESS;
  payload: PermissionsPayload;
};
export type CreateRangePermissionFailure = {
  type: typeof permissionConst.CREATE_RANGE_PERMISSION_FAILURE;
};

//REMOVE
export interface RemovePermissionRequest {
  type: typeof permissionConst.REMOVE_PERMISSION_REQUEST;
  payload: PermissionRemovePayload;
}
export type RemovePermissionSuccess = {
  type: typeof permissionConst.REMOVE_PERMISSION_SUCCESS;
  payload: PermissionRemovePayload;
};
export type RemovePermissionFailure = {
  type: typeof permissionConst.REMOVE_PERMISSION_FAILURE;
};

//REMOVE RANGE
export interface RemoveRangePermissionRequest {
  type: typeof permissionConst.REMOVE_RANGE_PERMISSION_REQUEST;
  payload: PermissionRemoveRangePayload;
}
export type RemoveRangePermissionSuccess = {
  type: typeof permissionConst.REMOVE_RANGE_PERMISSION_SUCCESS;
  payload: PermissionRemoveRangePayload;
};
export type RemoveRangePermissionFailure = {
  type: typeof permissionConst.REMOVE_RANGE_PERMISSION_FAILURE;
};

//SYNC
export interface SyncPermissionRequest {
  type: typeof permissionConst.SYNC_PERMISSION_REQUEST;
  payload: PermissionsPayload;
}
export type SyncPermissionSuccess = {
  type: typeof permissionConst.SYNC_PERMISSION_SUCCESS;
  payload: PermissionsPayload;
};
export type SyncPermissionFailure = {
  type: typeof permissionConst.SYNC_PERMISSION_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetPermission {
  type: typeof permissionConst.SET_PERMISSION;
  payload: IPermission | null;
}
export interface SetPermissions {
  type: typeof permissionConst.SET_PERMISSIONS;
  payload: IPermission[];
}
export interface ClearPermission {
  type: typeof permissionConst.CLEAR_PERMISSION;
}
export interface ClearPermissions {
  type: typeof permissionConst.CLEAR_PERMISSIONS;
}

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
  | SetPermission
  | SetPermissions
  | ClearPermission
  | ClearPermissions;
