import { ILocation } from "../../interfaces/serverInterfaces";
import { locationConst } from "./constant";

export type LocationState = {
  location: ILocation | null;
  locations: ILocation[];
};
export type LocationRequestPayload = {
  id: string;
};
export type LocationPayload = {
  location: ILocation;
};
export type LocationsPayload = {
  locations: ILocation[];
};
export type LocationRemoveRangePayload = {
  ids: string[];
};
export type LocationRemovePayload = {
  id: string;
};

//GET
export type FetchLocationsRequest = {
  type: typeof locationConst.FETCH_LOCATIONS_REQUEST;
};
export type FetchLocationsSuccess = {
  type: typeof locationConst.FETCH_LOCATIONS_SUCCESS;
  payload: LocationsPayload;
};
export type FetchLocationsFailure = {
  type: typeof locationConst.FETCH_LOCATIONS_FAILURE;
};
//GET:/ID
export type FetchLocationRequest = {
  type: typeof locationConst.FETCH_LOCATION_REQUEST;
  payload: LocationRequestPayload;
};
export type FetchLocationSuccess = {
  type: typeof locationConst.FETCH_LOCATION_SUCCESS;
  payload: LocationPayload;
};
export type FetchLocationFailure = {
  type: typeof locationConst.FETCH_LOCATION_FAILURE;
};
//POST
export type CreateLocationRequest = {
  type: typeof locationConst.CREATE_LOCATION_REQUEST;
  payload: LocationPayload;
};
export type CreateLocationSuccess = {
  type: typeof locationConst.CREATE_LOCATION_SUCCESS;
  payload: LocationPayload;
};
export type CreateLocationFailure = {
  type: typeof locationConst.CREATE_LOCATION_FAILURE;
};
//POST RANGE
export type CreateRangeLocationRequest = {
  type: typeof locationConst.CREATE_RANGE_LOCATION_REQUEST;
  payload: LocationsPayload;
};
export type CreateRangeLocationSuccess = {
  type: typeof locationConst.CREATE_RANGE_LOCATION_SUCCESS;
  payload: LocationsPayload;
};
export type CreateRangeLocationFailure = {
  type: typeof locationConst.CREATE_RANGE_LOCATION_FAILURE;
};
//PUT
export type UpdateLocationRequest = {
  type: typeof locationConst.UPDATE_LOCATION_REQUEST;
  payload: LocationPayload;
};
export type UpdateLocationSuccess = {
  type: typeof locationConst.UPDATE_LOCATION_SUCCESS;
  payload: LocationPayload;
};
export type UpdateLocationFailure = {
  type: typeof locationConst.UPDATE_LOCATION_FAILURE;
};
//REMOVE
export type RemoveLocationRequest = {
  type: typeof locationConst.REMOVE_LOCATION_REQUEST;
  payload: LocationRemovePayload;
};
export type RemoveLocationSuccess = {
  type: typeof locationConst.REMOVE_LOCATION_SUCCESS;
  payload: LocationRemovePayload;
};
export type RemoveLocationFailure = {
  type: typeof locationConst.REMOVE_LOCATION_FAILURE;
};
//REMOVE RANGE
export type RemoveRangeLocationRequest = {
  type: typeof locationConst.REMOVE_RANGE_LOCATION_REQUEST;
  payload: LocationRemoveRangePayload;
};
export type RemoveRangeLocationSuccess = {
  type: typeof locationConst.REMOVE_RANGE_LOCATION_SUCCESS;
  payload: LocationRemoveRangePayload;
};
export type RemoveRangeLocationFailure = {
  type: typeof locationConst.REMOVE_RANGE_LOCATION_FAILURE;
};

//CLIENT ACTION TYPES
export type SetLocation = {
  type: typeof locationConst.SET_LOCATION;
  payload: ILocation | null;
};
export type SetLocations = {
  type: typeof locationConst.SET_LOCATIONS;
  payload: ILocation[];
};
export type ClearLocation = {
  type: typeof locationConst.CLEAR_LOCATION;
};
export type ClearLocations = {
  type: typeof locationConst.CLEAR_LOCATIONS;
};

export type LocationActions =
  | FetchLocationsRequest
  | FetchLocationsSuccess
  | FetchLocationsFailure
  | FetchLocationRequest
  | FetchLocationSuccess
  | FetchLocationFailure
  | CreateLocationRequest
  | CreateLocationSuccess
  | CreateLocationFailure
  | CreateRangeLocationRequest
  | CreateRangeLocationSuccess
  | CreateRangeLocationFailure
  | UpdateLocationRequest
  | UpdateLocationSuccess
  | UpdateLocationFailure
  | RemoveLocationRequest
  | RemoveLocationSuccess
  | RemoveLocationFailure
  | RemoveRangeLocationRequest
  | RemoveRangeLocationSuccess
  | RemoveRangeLocationFailure
  | SetLocation
  | SetLocations
  | ClearLocation
  | ClearLocations;
