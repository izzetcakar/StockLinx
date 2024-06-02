import { IManufacturer } from "@interfaces/serverInterfaces";
import { manufacturerConst } from "./constant";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

export type ManufacturerState = {
  manufacturer: IManufacturer | null;
  manufacturers: IManufacturer[];
};
export type ManufacturerRequestPayload = {
  id: string;
};
export type ManufacturerPayload = {
  manufacturer: IManufacturer;
};
export type ManufacturersPayload = {
  manufacturers: IManufacturer[];
};
export type ManufacturerRemoveRangePayload = {
  ids: string[];
};
export type ManufacturerRemovePayload = {
  id: string;
};

//GET
export type FetchManufacturersRequest = {
  type: typeof manufacturerConst.FETCH_MANUFACTURERS_REQUEST;
};
export type FetchManufacturersSuccess = {
  type: typeof manufacturerConst.FETCH_MANUFACTURERS_SUCCESS;
  payload: ManufacturersPayload;
};
export type FetchManufacturersFailure = {
  type: typeof manufacturerConst.FETCH_MANUFACTURERS_FAILURE;
};

//GET:/ID
export type FetchManufacturerRequest = {
  type: typeof manufacturerConst.FETCH_MANUFACTURER_REQUEST;
  payload: ManufacturerRequestPayload;
};
export type FetchManufacturerSuccess = {
  type: typeof manufacturerConst.FETCH_MANUFACTURER_SUCCESS;
  payload: ManufacturerPayload;
};
export type FetchManufacturerFailure = {
  type: typeof manufacturerConst.FETCH_MANUFACTURER_FAILURE;
};

//POST
export type CreateManufacturerRequest = {
  type: typeof manufacturerConst.CREATE_MANUFACTURER_REQUEST;
  payload: ManufacturerPayload;
};
export type CreateManufacturerSuccess = {
  type: typeof manufacturerConst.CREATE_MANUFACTURER_SUCCESS;
  payload: ManufacturerPayload;
};
export type CreateManufacturerFailure = {
  type: typeof manufacturerConst.CREATE_MANUFACTURER_FAILURE;
};

//POST RANGE
export type CreateRangeManufacturerRequest = {
  type: typeof manufacturerConst.CREATE_RANGE_MANUFACTURER_REQUEST;
  payload: ManufacturersPayload;
};
export type CreateRangeManufacturerSuccess = {
  type: typeof manufacturerConst.CREATE_RANGE_MANUFACTURER_SUCCESS;
  payload: ManufacturersPayload;
};
export type CreateRangeManufacturerFailure = {
  type: typeof manufacturerConst.CREATE_RANGE_MANUFACTURER_FAILURE;
};

//PUT
export type UpdateManufacturerRequest = {
  type: typeof manufacturerConst.UPDATE_MANUFACTURER_REQUEST;
  payload: ManufacturerPayload;
};
export type UpdateManufacturerSuccess = {
  type: typeof manufacturerConst.UPDATE_MANUFACTURER_SUCCESS;
  payload: ManufacturerPayload;
};
export type UpdateManufacturerFailure = {
  type: typeof manufacturerConst.UPDATE_MANUFACTURER_FAILURE;
};

//REMOVE
export type RemoveManufacturerRequest = {
  type: typeof manufacturerConst.REMOVE_MANUFACTURER_REQUEST;
  payload: ManufacturerRemovePayload;
};
export type RemoveManufacturerSuccess = {
  type: typeof manufacturerConst.REMOVE_MANUFACTURER_SUCCESS;
  payload: ManufacturerRemovePayload;
};
export type RemoveManufacturerFailure = {
  type: typeof manufacturerConst.REMOVE_MANUFACTURER_FAILURE;
};

//REMOVE RANGE
export type RemoveRangeManufacturerRequest = {
  type: typeof manufacturerConst.REMOVE_RANGE_MANUFACTURER_REQUEST;
  payload: ManufacturerRemoveRangePayload;
};
export type RemoveRangeManufacturerSuccess = {
  type: typeof manufacturerConst.REMOVE_RANGE_MANUFACTURER_SUCCESS;
  payload: ManufacturerRemoveRangePayload;
};
export type RemoveRangeManufacturerFailure = {
  type: typeof manufacturerConst.REMOVE_RANGE_MANUFACTURER_FAILURE;
};

//FILTER
export type FilterManufacturersRequest = {
  type: typeof manufacturerConst.FILTER_MANUFACTURERS_REQUEST;
  payload: QueryFilter[];
};
export type FilterManufacturersSuccess = {
  type: typeof manufacturerConst.FILTER_MANUFACTURERS_SUCCESS;
  payload: ManufacturersPayload;
};
export type FilterManufacturersFailure = {
  type: typeof manufacturerConst.FILTER_MANUFACTURERS_FAILURE;
};

//CLIENT ACTION TYPES
export type SetManufacturer = {
  type: typeof manufacturerConst.SET_MANUFACTURER;
  payload: IManufacturer | null;
};
export type SetManufacturers = {
  type: typeof manufacturerConst.SET_MANUFACTURERS;
  payload: IManufacturer[];
};
export type ClearManufacturer = {
  type: typeof manufacturerConst.CLEAR_MANUFACTURER;
};
export type ClearManufacturers = {
  type: typeof manufacturerConst.CLEAR_MANUFACTURERS;
};

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
  | FilterManufacturersRequest
  | FilterManufacturersSuccess
  | FilterManufacturersFailure
  | SetManufacturer
  | SetManufacturers
  | ClearManufacturer
  | ClearManufacturers;
