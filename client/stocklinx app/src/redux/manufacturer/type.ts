import { IManufacturer } from "../../interfaces/interfaces";
import { manufacturerConst } from "./constant";

export interface ManufacturerState {
  manufacturer: IManufacturer | null;
  manufacturers: IManufacturer[];
}
export interface ManufacturerRequestPayload {
  id: string;
}
export interface ManufacturerPayload {
  manufacturer: IManufacturer;
}
export interface ManufacturersPayload {
  manufacturers: IManufacturer[];
}
export interface ManufacturerRemoveRangePayload {
  ids: string[];
}
export interface ManufacturerRemovePayload {
  id: string;
}

//GET
export interface FetchManufacturersRequest {
  type: typeof manufacturerConst.FETCH_MANUFACTURERS_REQUEST;
}
export type FetchManufacturersSuccess = {
  type: typeof manufacturerConst.FETCH_MANUFACTURERS_SUCCESS;
  payload: ManufacturersPayload;
};
export type FetchManufacturersFailure = {
  type: typeof manufacturerConst.FETCH_MANUFACTURERS_FAILURE;
};
//GET:/ID
export interface FetchManufacturerRequest {
  type: typeof manufacturerConst.FETCH_MANUFACTURER_REQUEST;
  payload: ManufacturerRequestPayload;
}
export type FetchManufacturerSuccess = {
  type: typeof manufacturerConst.FETCH_MANUFACTURER_SUCCESS;
  payload: ManufacturerPayload;
};
export type FetchManufacturerFailure = {
  type: typeof manufacturerConst.FETCH_MANUFACTURER_FAILURE;
};
//POST
export interface CreateManufacturerRequest {
  type: typeof manufacturerConst.CREATE_MANUFACTURER_REQUEST;
  payload: ManufacturerPayload;
}
export type CreateManufacturerSuccess = {
  type: typeof manufacturerConst.CREATE_MANUFACTURER_SUCCESS;
  payload: ManufacturerPayload;
};
export type CreateManufacturerFailure = {
  type: typeof manufacturerConst.CREATE_MANUFACTURER_FAILURE;
};
//POST RANGE
export interface CreateRangeManufacturerRequest {
  type: typeof manufacturerConst.CREATE_RANGE_MANUFACTURER_REQUEST;
  payload: ManufacturersPayload;
}
export type CreateRangeManufacturerSuccess = {
  type: typeof manufacturerConst.CREATE_RANGE_MANUFACTURER_SUCCESS;
  payload: ManufacturersPayload;
};
export type CreateRangeManufacturerFailure = {
  type: typeof manufacturerConst.CREATE_RANGE_MANUFACTURER_FAILURE;
};
//PUT
export interface UpdateManufacturerRequest {
  type: typeof manufacturerConst.UPDATE_MANUFACTURER_REQUEST;
  payload: ManufacturerPayload;
}
export type UpdateManufacturerSuccess = {
  type: typeof manufacturerConst.UPDATE_MANUFACTURER_SUCCESS;
};
export type UpdateManufacturerFailure = {
  type: typeof manufacturerConst.UPDATE_MANUFACTURER_FAILURE;
};
//REMOVE
export interface RemoveManufacturerRequest {
  type: typeof manufacturerConst.REMOVE_MANUFACTURER_REQUEST;
  payload: ManufacturerRemovePayload;
}
export type RemoveManufacturerSuccess = {
  type: typeof manufacturerConst.REMOVE_MANUFACTURER_SUCCESS;
  payload: ManufacturerRemovePayload;
};
export type RemoveManufacturerFailure = {
  type: typeof manufacturerConst.REMOVE_MANUFACTURER_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeManufacturerRequest {
  type: typeof manufacturerConst.REMOVE_RANGE_MANUFACTURER_REQUEST;
  payload: ManufacturerRemoveRangePayload;
}
export type RemoveRangeManufacturerSuccess = {
  type: typeof manufacturerConst.REMOVE_RANGE_MANUFACTURER_SUCCESS;
  payload: ManufacturerRemoveRangePayload;
};
export type RemoveRangeManufacturerFailure = {
  type: typeof manufacturerConst.REMOVE_RANGE_MANUFACTURER_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetManufacturer {
  type: typeof manufacturerConst.SET_MANUFACTURER;
  payload: IManufacturer | null;
}
export interface SetManufacturers {
  type: typeof manufacturerConst.SET_MANUFACTURERS;
  payload: IManufacturer[];
}
export interface ClearManufacturer {
  type: typeof manufacturerConst.CLEAR_MANUFACTURER;
}
export interface ClearManufacturers {
  type: typeof manufacturerConst.CLEAR_MANUFACTURERS;
}

export type ManufacturerActions =
  | FetchManufacturersRequest
  | FetchManufacturersSuccess
  | FetchManufacturersFailure
  | FetchManufacturerRequest
  | FetchManufacturerSuccess
  | FetchManufacturerFailure
  | CreateManufacturerRequest
  | CreateManufacturerSuccess
  | CreateManufacturerFailure
  | CreateRangeManufacturerRequest
  | CreateRangeManufacturerSuccess
  | CreateRangeManufacturerFailure
  | UpdateManufacturerRequest
  | UpdateManufacturerSuccess
  | UpdateManufacturerFailure
  | RemoveManufacturerRequest
  | RemoveManufacturerSuccess
  | RemoveManufacturerFailure
  | RemoveRangeManufacturerRequest
  | RemoveRangeManufacturerSuccess
  | RemoveRangeManufacturerFailure
  | SetManufacturer
  | SetManufacturers
  | ClearManufacturer
  | ClearManufacturers;
