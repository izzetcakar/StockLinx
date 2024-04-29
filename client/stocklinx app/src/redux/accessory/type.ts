import {
  CheckInOutPayload,
  UserProductCheckInPayload,
} from "../../interfaces/clientInterfaces";
import { IAccessory, IUserProduct } from "../../interfaces/serverInterfaces";
import { accessoryConst } from "./constant";

export type AccessoryState = {
  accessory: IAccessory | null;
  accessories: IAccessory[];
};
export type AccessoryRequestPayload = {
  id: string;
};
export type AccessoryPayload = {
  accessory: IAccessory;
};
export type AccessoriesPayload = {
  accessories: IAccessory[];
};
export type AccessoryRemoveRangePayload = {
  ids: string[];
};
export type AccessoryRemovePayload = {
  id: string;
};

//GET
export type FetchAccessoriesRequest = {
  type: typeof accessoryConst.FETCH_ACCESSORIES_REQUEST;
};
export type FetchAccessoriesSuccess = {
  type: typeof accessoryConst.FETCH_ACCESSORIES_SUCCESS;
  payload: AccessoriesPayload;
};
export type FetchAccessoriesFailure = {
  type: typeof accessoryConst.FETCH_ACCESSORIES_FAILURE;
};
//GET:/ID
export type FetchAccessoryRequest = {
  type: typeof accessoryConst.FETCH_ACCESSORY_REQUEST;
  payload: AccessoryRequestPayload;
};
export type FetchAccessorySuccess = {
  type: typeof accessoryConst.FETCH_ACCESSORY_SUCCESS;
  payload: AccessoryPayload;
};
export type FetchAccessoryFailure = {
  type: typeof accessoryConst.FETCH_ACCESSORY_FAILURE;
};
//POST
export type CreateAccessoryRequest = {
  type: typeof accessoryConst.CREATE_ACCESSORY_REQUEST;
  payload: AccessoryPayload;
};
export type CreateAccessorySuccess = {
  type: typeof accessoryConst.CREATE_ACCESSORY_SUCCESS;
  payload: AccessoryPayload;
};
export type CreateAccessoryFailure = {
  type: typeof accessoryConst.CREATE_ACCESSORY_FAILURE;
};
//POST RANGE
export type CreateRangeAccessoryRequest = {
  type: typeof accessoryConst.CREATE_RANGE_ACCESSORY_REQUEST;
  payload: AccessoriesPayload;
};
export type CreateRangeAccessorySuccess = {
  type: typeof accessoryConst.CREATE_RANGE_ACCESSORY_SUCCESS;
  payload: AccessoriesPayload;
};
export type CreateRangeAccessoryFailure = {
  type: typeof accessoryConst.CREATE_RANGE_ACCESSORY_FAILURE;
};
//PUT
export type UpdateAccessoryRequest = {
  type: typeof accessoryConst.UPDATE_ACCESSORY_REQUEST;
  payload: AccessoryPayload;
};
export type UpdateAccessorySuccess = {
  type: typeof accessoryConst.UPDATE_ACCESSORY_SUCCESS;
  payload: AccessoryPayload;
};
export type UpdateAccessoryFailure = {
  type: typeof accessoryConst.UPDATE_ACCESSORY_FAILURE;
};
//REMOVE
export type RemoveAccessoryRequest = {
  type: typeof accessoryConst.REMOVE_ACCESSORY_REQUEST;
  payload: AccessoryRemovePayload;
};
export type RemoveAccessorySuccess = {
  type: typeof accessoryConst.REMOVE_ACCESSORY_SUCCESS;
  payload: AccessoryRemovePayload;
};
export type RemoveAccessoryFailure = {
  type: typeof accessoryConst.REMOVE_ACCESSORY_FAILURE;
};
//REMOVE RANGE
export type RemoveRangeAccessoryRequest = {
  type: typeof accessoryConst.REMOVE_RANGE_ACCESSORY_REQUEST;
  payload: AccessoryRemoveRangePayload;
};
export type RemoveRangeAccessorySuccess = {
  type: typeof accessoryConst.REMOVE_RANGE_ACCESSORY_SUCCESS;
  payload: AccessoryRemoveRangePayload;
};
export type RemoveRangeAccessoryFailure = {
  type: typeof accessoryConst.REMOVE_RANGE_ACCESSORY_FAILURE;
};
//CHECKIN
export type CheckInAccessoryRequest = {
  type: typeof accessoryConst.CHECK_IN_ACCESSORY_REQUEST;
  payload: UserProductCheckInPayload;
};
export type CheckInAccessorySuccess = {
  type: typeof accessoryConst.CHECK_IN_ACCESSORY_SUCCESS;
  payload: CheckInOutPayload;
};
export type CheckInAccessoryFailure = {
  type: typeof accessoryConst.CHECK_IN_ACCESSORY_FAILURE;
};
//CHECKOUT
export type CheckOutAccessoryRequest = {
  type: typeof accessoryConst.CHECK_OUT_ACCESSORY_REQUEST;
  payload: IUserProduct;
};
export type CheckOutAccessorySuccess = {
  type: typeof accessoryConst.CHECK_OUT_ACCESSORY_SUCCESS;
  payload: CheckInOutPayload;
};
export type CheckOutAccessoryFailure = {
  type: typeof accessoryConst.CHECK_OUT_ACCESSORY_FAILURE;
};

//CLIENT ACTION TYPES
export type SetAccessory = {
  type: typeof accessoryConst.SET_ACCESSORY;
  payload: IAccessory | null;
};
export type SetAccessories = {
  type: typeof accessoryConst.SET_ACCESSORIES;
  payload: IAccessory[];
};
export type ClearAccessory = {
  type: typeof accessoryConst.CLEAR_ACCESSORY;
};
export type ClearAccessories = {
  type: typeof accessoryConst.CLEAR_ACCESSORIES;
};

export type AccessoryActions =
  | FetchAccessoriesRequest
  | FetchAccessoriesSuccess
  | FetchAccessoriesFailure
  | FetchAccessoryRequest
  | FetchAccessorySuccess
  | FetchAccessoryFailure
  | CreateAccessoryRequest
  | CreateAccessorySuccess
  | CreateAccessoryFailure
  | CreateRangeAccessoryRequest
  | CreateRangeAccessorySuccess
  | CreateRangeAccessoryFailure
  | UpdateAccessoryRequest
  | UpdateAccessorySuccess
  | UpdateAccessoryFailure
  | RemoveAccessoryRequest
  | RemoveAccessorySuccess
  | RemoveAccessoryFailure
  | RemoveRangeAccessoryRequest
  | RemoveRangeAccessorySuccess
  | RemoveRangeAccessoryFailure
  | CheckInAccessoryRequest
  | CheckInAccessorySuccess
  | CheckInAccessoryFailure
  | CheckOutAccessoryRequest
  | CheckOutAccessorySuccess
  | CheckOutAccessoryFailure
  | SetAccessory
  | SetAccessories
  | ClearAccessory
  | ClearAccessories;
