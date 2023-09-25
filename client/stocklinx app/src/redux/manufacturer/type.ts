import { IManufacturer, SelectData } from "../../interfaces/interfaces";
import { manufacturerConst } from "./constant";

export interface ManufacturerState {
  manufacturer: IManufacturer | null;
  manufacturers: IManufacturer[];
  selectData: SelectData[];
}

export interface ManufacturerSucccessPayload {
  manufacturer: IManufacturer;
}
export interface ManufacturersSucccessPayload {
  manufacturers: IManufacturer[];
}
export interface ManufacturerRequestPayload {
  id: string;
}
export interface UpdateManufacturerRequestPayload {
  manufacturer: IManufacturer;
}

//GET
export interface FetchManufacturersRequest {
  type: typeof manufacturerConst.FETCH_MANUFACTURERS_REQUEST;
}
export type FetchManufacturersSuccess = {
  type: typeof manufacturerConst.FETCH_MANUFACTURERS_SUCCESS;
  payload: ManufacturersSucccessPayload;
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
  payload: ManufacturerSucccessPayload;
};
export type FetchManufacturerFailure = {
  type: typeof manufacturerConst.FETCH_MANUFACTURER_FAILURE;
};
//POST
export interface CreateManufacturerRequest {
  type: typeof manufacturerConst.CREATE_MANUFACTURER_REQUEST;
  payload: UpdateManufacturerRequestPayload;
}
export type CreateManufacturerSuccess = {
  type: typeof manufacturerConst.CREATE_MANUFACTURER_SUCCESS;
};
export type CreateManufacturerFailure = {
  type: typeof manufacturerConst.CREATE_MANUFACTURER_FAILURE;
};
//PUT
export interface UpdateManufacturerRequest {
  type: typeof manufacturerConst.UPDATE_MANUFACTURER_REQUEST;
  payload: UpdateManufacturerRequestPayload;
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
  payload: ManufacturerRequestPayload;
}
export type RemoveManufacturerSuccess = {
  type: typeof manufacturerConst.REMOVE_MANUFACTURER_SUCCESS;
};
export type RemoveManufacturerFailure = {
  type: typeof manufacturerConst.REMOVE_MANUFACTURER_FAILURE;
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
  | UpdateManufacturerRequest
  | UpdateManufacturerSuccess
  | UpdateManufacturerFailure
  | RemoveManufacturerRequest
  | RemoveManufacturerSuccess
  | RemoveManufacturerFailure
  | SetManufacturer
  | SetManufacturers
  | ClearManufacturer
  | ClearManufacturers;
