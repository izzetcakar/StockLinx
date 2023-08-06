import { IAccessory, SelectData } from "../../interfaces/interfaces";
import { accessoryConst } from "./constant";

export interface AccessoryState {
  accessory: IAccessory | null;
  accessories: IAccessory[];
  selectData: SelectData[];
  pending: boolean;
  error: string | null;
}

export interface AccessorySucccessPayload {
  accessory: IAccessory;
}
export interface AccessoriesSucccessPayload {
  accessories: IAccessory[];
}
export interface AccessoryFailurePayload {
  error: string;
}
export interface AccessoryRequestPayload {
  id: string;
}
export interface UpdateAccessoryRequestPayload {
  accessory: IAccessory;
}

//GET
export interface FetchAccessoriesRequest {
  type: typeof accessoryConst.FETCH_ACCESSORIES_REQUEST;
}
export type FetchAccessoriesSuccess = {
  type: typeof accessoryConst.FETCH_ACCESSORIES_SUCCESS;
  payload: AccessoriesSucccessPayload;
};
export type FetchAccessoriesFailure = {
  type: typeof accessoryConst.FETCH_ACCESSORIES_FAILURE;
  payload: AccessoryFailurePayload;
};
//GET:/ID
export interface FetchAccessoryRequest {
  type: typeof accessoryConst.FETCH_ACCESSORY_REQUEST;
  payload: AccessoryRequestPayload;
}
export type FetchAccessorySuccess = {
  type: typeof accessoryConst.FETCH_ACCESSORY_SUCCESS;
  payload: AccessorySucccessPayload;
};
export type FetchAccessoryFailure = {
  type: typeof accessoryConst.FETCH_ACCESSORY_FAILURE;
  payload: AccessoryFailurePayload;
};
//POST
export interface CreateAccessoryRequest {
  type: typeof accessoryConst.CREATE_ACCESSORY_REQUEST;
  payload: UpdateAccessoryRequestPayload;
}
export type CreateAccessorySuccess = {
  type: typeof accessoryConst.CREATE_ACCESSORY_SUCCESS;
};
export type CreateAccessoryFailure = {
  type: typeof accessoryConst.CREATE_ACCESSORY_FAILURE;
  payload: AccessoryFailurePayload;
};
//PUT
export interface UpdateAccessoryRequest {
  type: typeof accessoryConst.UPDATE_ACCESSORY_REQUEST;
  payload: UpdateAccessoryRequestPayload;
}
export type UpdateAccessorySuccess = {
  type: typeof accessoryConst.UPDATE_ACCESSORY_SUCCESS;
};
export type UpdateAccessoryFailure = {
  type: typeof accessoryConst.UPDATE_ACCESSORY_FAILURE;
  payload: AccessoryFailurePayload;
};
//REMOVE
export interface RemoveAccessoryRequest {
  type: typeof accessoryConst.REMOVE_ACCESSORY_REQUEST;
  payload: AccessoryRequestPayload;
}
export type RemoveAccessorySuccess = {
  type: typeof accessoryConst.REMOVE_ACCESSORY_SUCCESS;
};
export type RemoveAccessoryFailure = {
  type: typeof accessoryConst.REMOVE_ACCESSORY_FAILURE;
  payload: AccessoryFailurePayload;
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
  | UpdateAccessoryRequest
  | UpdateAccessorySuccess
  | UpdateAccessoryFailure
  | RemoveAccessoryRequest
  | RemoveAccessorySuccess
  | RemoveAccessoryFailure
  | SetAccessory
  | SetAccessories
  | ClearAccessory
  | ClearAccessories;
