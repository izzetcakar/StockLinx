import { permissionConst } from "./constant";
import { PermissionActions, PermissionState } from "./type";

const initialState: PermissionState = {
  permission: null,
  permissions: [],
};

export default (state = initialState, action: PermissionActions) => {
  switch (action.type) {
    case permissionConst.FETCH_PERMISSIONS_REQUEST:
      return {
        ...state,
      };
    case permissionConst.FETCH_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissions: action.payload.permissions,
      };
    case permissionConst.FETCH_PERMISSIONS_FAILURE:
      return {
        ...state,
        permissions: [],
      };
    case permissionConst.FETCH_PERMISSION_REQUEST:
      return {
        ...state,
      };
    case permissionConst.FETCH_PERMISSION_SUCCESS:
      return {
        ...state,
        permission: action.payload.permission,
      };
    case permissionConst.FETCH_PERMISSION_FAILURE:
      return {
        ...state,
        permission: null,
      };
    case permissionConst.CREATE_PERMISSION_REQUEST:
      return {
        ...state,
      };
    case permissionConst.CREATE_PERMISSION_SUCCESS:
      return {
        ...state,
        permissions: [...state.permissions, ...action.payload.permissions],
      };
    case permissionConst.CREATE_PERMISSION_FAILURE:
      return {
        ...state,
      };
    case permissionConst.CREATE_RANGE_PERMISSION_REQUEST:
      return {
        ...state,
      };
    case permissionConst.CREATE_RANGE_PERMISSION_SUCCESS:
      return {
        ...state,
        permissions: [...state.permissions, ...action.payload.permissions],
      };
    case permissionConst.CREATE_RANGE_PERMISSION_FAILURE:
      return {
        ...state,
      };
    case permissionConst.REMOVE_PERMISSION_REQUEST:
      return {
        ...state,
      };
    case permissionConst.REMOVE_PERMISSION_SUCCESS:
      return {
        ...state,
        permissions: state.permissions.filter(
          (permission) => permission.id !== action.payload.id
        ),
      };
    case permissionConst.REMOVE_PERMISSION_FAILURE:
      return {
        ...state,
      };
    case permissionConst.REMOVE_RANGE_PERMISSION_REQUEST:
      return {
        ...state,
      };
    case permissionConst.REMOVE_RANGE_PERMISSION_SUCCESS:
      return {
        ...state,
        permissions: state.permissions.filter(
          (permission) => !action.payload.ids.includes(permission.id)
        ),
      };
    case permissionConst.REMOVE_RANGE_PERMISSION_FAILURE:
      return {
        ...state,
      };
    case permissionConst.SYNC_PERMISSION_REQUEST:
      return {
        ...state,
      };
    case permissionConst.SYNC_PERMISSION_SUCCESS:
      return {
        ...state,
        permissions: action.payload.permissions,
      };
    case permissionConst.SYNC_PERMISSION_FAILURE:
      return {
        ...state,
      };
    case permissionConst.SET_PERMISSION:
      return {
        ...state,
        permission: action.payload,
      };
    case permissionConst.CLEAR_PERMISSION:
      return {
        ...state,
        permission: null,
      };
    case permissionConst.SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
      };
    case permissionConst.CLEAR_PERMISSIONS:
      return {
        ...state,
        permissions: [],
      };
    default:
      return { ...state };
  }
};
