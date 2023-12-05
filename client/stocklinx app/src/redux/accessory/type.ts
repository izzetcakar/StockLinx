import { IAccessory } from "../../interfaces/interfaces";
import { accessoryConst } from "./constant";

export interface AccessoryState {
  accessory: IAccessory | null;
  accessories: IAccessory[];
}
export interface AccessoryRequestPayload {
  id: string;
}
export interface AccessoryPayload {
  accessory: IAccessory;
}
export interface AccessoriesPayload {
  accessories: IAccessory[];
}
export interface AccessoryRemoveRangePayload {
  ids: string[];
}
export interface AccessoryRemovePayload {
  id: string;
}

//GET
export interface FetchAccessoriesRequest {
  type: typeof accessoryConst.FETCH_ACCESSORIES_REQUEST;
}
export type FetchAccessoriesSuccess = {
  type: typeof accessoryConst.FETCH_ACCESSORIES_SUCCESS;
  payload: AccessoriesPayload;
};
export type FetchAccessoriesFailure = {
  type: typeof accessoryConst.FETCH_ACCESSORIES_FAILURE;
};
//GET:/ID
export interface FetchAccessoryRequest {
  type: typeof accessoryConst.FETCH_ACCESSORY_REQUEST;
  payload: AccessoryRequestPayload;
}
export type FetchAccessorySuccess = {
  type: typeof accessoryConst.FETCH_ACCESSORY_SUCCESS;
  payload: AccessoryPayload;
};
export type FetchAccessoryFailure = {
  type: typeof accessoryConst.FETCH_ACCESSORY_FAILURE;
};
//POST
export interface CreateAccessoryRequest {
  type: typeof accessoryConst.CREATE_ACCESSORY_REQUEST;
  payload: AccessoryPayload;
}
export type CreateAccessorySuccess = {
  type: typeof accessoryConst.CREATE_ACCESSORY_SUCCESS;
  payload: AccessoryPayload;
};
export type CreateAccessoryFailure = {
  type: typeof accessoryConst.CREATE_ACCESSORY_FAILURE;
};
//POST RANGE
export interface CreateRangeAccessoryRequest {
  type: typeof accessoryConst.CREATE_RANGE_ACCESSORY_REQUEST;
  payload: AccessoriesPayload;
}
export type CreateRangeAccessorySuccess = {
  type: typeof accessoryConst.CREATE_RANGE_ACCESSORY_SUCCESS;
  payload: AccessoriesPayload;
};
export type CreateRangeAccessoryFailure = {
  type: typeof accessoryConst.CREATE_RANGE_ACCESSORY_FAILURE;
};
//PUT
export interface UpdateAccessoryRequest {
  type: typeof accessoryConst.UPDATE_ACCESSORY_REQUEST;
  payload: AccessoryPayload;
}
export type UpdateAccessorySuccess = {
  type: typeof accessoryConst.UPDATE_ACCESSORY_SUCCESS;
};
export type UpdateAccessoryFailure = {
  type: typeof accessoryConst.UPDATE_ACCESSORY_FAILURE;
};
//REMOVE
export interface RemoveAccessoryRequest {
  type: typeof accessoryConst.REMOVE_ACCESSORY_REQUEST;
  payload: AccessoryRemovePayload;
}
export type RemoveAccessorySuccess = {
  type: typeof accessoryConst.REMOVE_ACCESSORY_SUCCESS;
  payload: AccessoryRemovePayload;
};
export type RemoveAccessoryFailure = {
  type: typeof accessoryConst.REMOVE_ACCESSORY_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeAccessoryRequest {
  type: typeof accessoryConst.REMOVE_RANGE_ACCESSORY_REQUEST;
  payload: AccessoryRemoveRangePayload;
}
export type RemoveRangeAccessorySuccess = {
  type: typeof accessoryConst.REMOVE_RANGE_ACCESSORY_SUCCESS;
  payload: AccessoryRemoveRangePayload;
};
export type RemoveRangeAccessoryFailure = {
  type: typeof accessoryConst.REMOVE_RANGE_ACCESSORY_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetAccessory {
  type: typeof accessoryConst.SET_ACCESSORY;
  payload: IAccessory | null;
}
export interface SetAccessories {
  type: typeof accessoryConst.SET_ACCESSORIES;
  payload: IAccessory[];
}
export interface ClearAccessory {
  type: typeof accessoryConst.CLEAR_ACCESSORY;
}
export interface ClearAccessories {
  type: typeof accessoryConst.CLEAR_ACCESSORIES;
}

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
  | SetAccessory
  | SetAccessories
  | ClearAccessory
  | ClearAccessories;
