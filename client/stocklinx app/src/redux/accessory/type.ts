import { IAccessory, SelectData } from "../../interfaces/interfaces";
import { accessoryConst } from "./constant";

export interface AccessoryState {
  accessory: IAccessory | null;
  accessories: IAccessory[];
  selectData: SelectData[];
  pending: boolean;
  error: string | null;
}

export interface FetchAccessorySucccessPayload {
  accessory: IAccessory;
}
export interface FetchAccessoriesSucccessPayload {
  accessories: IAccessory[];
}
export interface FetchAccessoryFailurePayload {
  error: string;
}

//GET
export interface FetchAccessoriesRequest {
  type: typeof accessoryConst.FETCH_ACCESSORIES_REQUEST;
}
export type FetchAccessoriesSuccess = {
  type: typeof accessoryConst.FETCH_ACCESSORIES_SUCCESS;
  payload: FetchAccessoriesSucccessPayload;
};
export type FetchAccessoriesFailure = {
  type: typeof accessoryConst.FETCH_ACCESSORIES_FAILURE;
  payload: FetchAccessoryFailurePayload;
};
//GET:/ID
export interface FetchAccessoryRequest {
  type: typeof accessoryConst.FETCH_ACCESSORY_REQUEST;
}
export type FetchAccessorySuccess = {
  type: typeof accessoryConst.FETCH_ACCESSORY_SUCCESS;
  payload: FetchAccessorySucccessPayload;
};
export type FetchAccessoryFailure = {
  type: typeof accessoryConst.FETCH_ACCESSORY_FAILURE;
  payload: FetchAccessoryFailurePayload;
};
//POST
export interface CreateAccessoryRequest {
  type: typeof accessoryConst.CREATE_ACCESSORY_REQUEST;
}
export type CreateAccessorySuccess = {
  type: typeof accessoryConst.CREATE_ACCESSORY_SUCCESS;
};
export type CreateAccessoryFailure = {
  type: typeof accessoryConst.CREATE_ACCESSORY_FAILURE;
  payload: FetchAccessoryFailurePayload;
};
//PUT
export interface UpdateAccessoryRequest {
  type: typeof accessoryConst.UPDATE_ACCESSORY_REQUEST;
}
export type UpdateAccessorySuccess = {
  type: typeof accessoryConst.UPDATE_ACCESSORY_SUCCESS;
};
export type UpdateAccessoryFailure = {
  type: typeof accessoryConst.UPDATE_ACCESSORY_FAILURE;
  payload: FetchAccessoryFailurePayload;
};
//REMOVE
export interface RemoveAccessoryRequest {
  type: typeof accessoryConst.REMOVE_ACCESSORY_REQUEST;
}
export type RemoveAccessorySuccess = {
  type: typeof accessoryConst.REMOVE_ACCESSORY_SUCCESS;
};
export type RemoveAccessoryFailure = {
  type: typeof accessoryConst.REMOVE_ACCESSORY_FAILURE;
  payload: FetchAccessoryFailurePayload;
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
  | UpdateAccessoryRequest
  | UpdateAccessorySuccess
  | UpdateAccessoryFailure
  | RemoveAccessoryRequest
  | RemoveAccessorySuccess
  | RemoveAccessoryFailure;
