import { IPermission } from "@interfaces/serverInterfaces";
import { permissionConst } from "./constant";
import {
  CreatePermissionFailure,
  CreatePermissionRequest,
  CreatePermissionSuccess,
  RemovePermissionFailure,
  RemovePermissionRequest,
  RemovePermissionSuccess,
  FetchPermissionsFailure,
  FetchPermissionsRequest,
  FetchPermissionsSuccess,
  FetchPermissionFailure,
  FetchPermissionRequest,
  FetchPermissionSuccess,
  PermissionRequestPayload,
  SetPermission,
  SetPermissions,
  ClearPermission,
  ClearPermissions,
  PermissionsPayload,
  PermissionPayload,
  CreateRangePermissionRequest,
  CreateRangePermissionSuccess,
  CreateRangePermissionFailure,
  RemoveRangePermissionRequest,
  RemoveRangePermissionSuccess,
  RemoveRangePermissionFailure,
  PermissionRemoveRangePayload,
  PermissionRemovePayload,
  SyncPermissionRequest,
  SyncPermissionSuccess,
  SyncPermissionFailure,
  FilterPermissionsRequest,
  FilterPermissionsSuccess,
  FilterPermissionsFailure,
} from "./type";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

//GET
const getAll = (): FetchPermissionsRequest => ({
  type: permissionConst.FETCH_PERMISSIONS_REQUEST,
});
const getAllSuccess = (
  payload: PermissionsPayload
): FetchPermissionsSuccess => ({
  type: permissionConst.FETCH_PERMISSIONS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchPermissionsFailure => ({
  type: permissionConst.FETCH_PERMISSIONS_FAILURE,
});

//GET:/ID
const get = (payload: PermissionRequestPayload): FetchPermissionRequest => ({
  type: permissionConst.FETCH_PERMISSION_REQUEST,
  payload,
});
const getSuccess = (payload: PermissionPayload): FetchPermissionSuccess => ({
  type: permissionConst.FETCH_PERMISSION_SUCCESS,
  payload,
});
const getFailure = (): FetchPermissionFailure => ({
  type: permissionConst.FETCH_PERMISSION_FAILURE,
});

//POST
const create = (payload: PermissionPayload): CreatePermissionRequest => ({
  type: permissionConst.CREATE_PERMISSION_REQUEST,
  payload,
});
const createSuccess = (
  payload: PermissionsPayload
): CreatePermissionSuccess => ({
  type: permissionConst.CREATE_PERMISSION_SUCCESS,
  payload,
});
const createFailure = (): CreatePermissionFailure => ({
  type: permissionConst.CREATE_PERMISSION_FAILURE,
});

//POST RANGE
const createRange = (
  payload: PermissionsPayload
): CreateRangePermissionRequest => ({
  type: permissionConst.CREATE_RANGE_PERMISSION_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: PermissionsPayload
): CreateRangePermissionSuccess => ({
  type: permissionConst.CREATE_RANGE_PERMISSION_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangePermissionFailure => ({
  type: permissionConst.CREATE_RANGE_PERMISSION_FAILURE,
});

//REMOVE
const remove = (payload: PermissionRemovePayload): RemovePermissionRequest => ({
  type: permissionConst.REMOVE_PERMISSION_REQUEST,
  payload,
});
const removeSuccess = (
  payload: PermissionRemovePayload
): RemovePermissionSuccess => ({
  type: permissionConst.REMOVE_PERMISSION_SUCCESS,
  payload,
});
const removeFailure = (): RemovePermissionFailure => ({
  type: permissionConst.REMOVE_PERMISSION_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: PermissionRemoveRangePayload
): RemoveRangePermissionRequest => ({
  type: permissionConst.REMOVE_RANGE_PERMISSION_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: PermissionRemoveRangePayload
): RemoveRangePermissionSuccess => ({
  type: permissionConst.REMOVE_RANGE_PERMISSION_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangePermissionFailure => ({
  type: permissionConst.REMOVE_RANGE_PERMISSION_FAILURE,
});

//SYNC
const sync = (payload: PermissionsPayload): SyncPermissionRequest => ({
  type: permissionConst.SYNC_PERMISSION_REQUEST,
  payload,
});
const syncSuccess = (payload: PermissionsPayload): SyncPermissionSuccess => ({
  type: permissionConst.SYNC_PERMISSION_SUCCESS,
  payload,
});
const syncFailure = (): SyncPermissionFailure => ({
  type: permissionConst.SYNC_PERMISSION_FAILURE,
});

//FILTER
const filter = (payload: QueryFilter[]): FilterPermissionsRequest => ({
  type: permissionConst.FILTER_PERMISSIONS_REQUEST,
  payload,
});
const filterSuccess = (
  payload: PermissionsPayload
): FilterPermissionsSuccess => ({
  type: permissionConst.FILTER_PERMISSIONS_SUCCESS,
  payload,
});
const filterFailure = (): FilterPermissionsFailure => ({
  type: permissionConst.FILTER_PERMISSIONS_FAILURE,
});

//CLIENT ACTIONS
const setPermission = (payload: IPermission | null): SetPermission => ({
  type: permissionConst.SET_PERMISSION,
  payload,
});
const clearPermission = (): ClearPermission => ({
  type: permissionConst.CLEAR_PERMISSION,
});
const setPermissions = (payload: IPermission[]): SetPermissions => ({
  type: permissionConst.SET_PERMISSIONS,
  payload,
});
const clearPermissions = (): ClearPermissions => ({
  type: permissionConst.CLEAR_PERMISSIONS,
});

export const permissionActions = {
  getAll,
  getAllSuccess,
  getAllFailure,
  get,
  getSuccess,
  getFailure,
  create,
  createSuccess,
  createFailure,
  createRange,
  createRangeSuccess,
  createRangeFailure,
  remove,
  removeSuccess,
  removeFailure,
  removeRange,
  removeRangeSuccess,
  removeRangeFailure,
  sync,
  syncSuccess,
  syncFailure,
  filter,
  filterSuccess,
  filterFailure,
  setPermission,
  clearPermission,
  setPermissions,
  clearPermissions,
};
