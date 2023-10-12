import {
  ILocation,
  ILocationCounts,
  SelectData,
} from "../../interfaces/interfaces";
import { locationConst } from "./constant";

export interface LocationState {
  location: ILocation | null;
  locations: ILocation[];
  selectData: SelectData[];
  counts: ILocationCounts[];
}

export interface LocationSucccessPayload {
  location: ILocation;
}
export interface LocationsSucccessPayload {
  locations: ILocation[];
}
export interface LocationRequestPayload {
  id: string;
}
export interface UpdateLocationRequestPayload {
  location: ILocation;
}
export interface LocationCountsSuccessPayload {
  counts: ILocationCounts[];
}

//GET
export interface FetchLocationsRequest {
  type: typeof locationConst.FETCH_LOCATIONS_REQUEST;
}
export type FetchLocationsSuccess = {
  type: typeof locationConst.FETCH_LOCATIONS_SUCCESS;
  payload: LocationsSucccessPayload;
};
export type FetchLocationsFailure = {
  type: typeof locationConst.FETCH_LOCATIONS_FAILURE;
};
//GET COUNTS
export interface FetchLocationCountsRequest {
  type: typeof locationConst.FETCH_COUNTS_REQUEST;
}
export type FetchLocationCountsSuccess = {
  type: typeof locationConst.FETCH_COUNTS_SUCCESS;
  payload: LocationCountsSuccessPayload;
};
export type FetchLocationCountsFailure = {
  type: typeof locationConst.FETCH_COUNTS_FAILURE;
};
//GET:/ID
export interface FetchLocationRequest {
  type: typeof locationConst.FETCH_LOCATION_REQUEST;
  payload: LocationRequestPayload;
}
export type FetchLocationSuccess = {
  type: typeof locationConst.FETCH_LOCATION_SUCCESS;
  payload: LocationSucccessPayload;
};
export type FetchLocationFailure = {
  type: typeof locationConst.FETCH_LOCATION_FAILURE;
};
//POST
export interface CreateLocationRequest {
  type: typeof locationConst.CREATE_LOCATION_REQUEST;
  payload: UpdateLocationRequestPayload;
}
export type CreateLocationSuccess = {
  type: typeof locationConst.CREATE_LOCATION_SUCCESS;
};
export type CreateLocationFailure = {
  type: typeof locationConst.CREATE_LOCATION_FAILURE;
};
//PUT
export interface UpdateLocationRequest {
  type: typeof locationConst.UPDATE_LOCATION_REQUEST;
  payload: UpdateLocationRequestPayload;
}
export type UpdateLocationSuccess = {
  type: typeof locationConst.UPDATE_LOCATION_SUCCESS;
};
export type UpdateLocationFailure = {
  type: typeof locationConst.UPDATE_LOCATION_FAILURE;
};
//REMOVE
export interface RemoveLocationRequest {
  type: typeof locationConst.REMOVE_LOCATION_REQUEST;
  payload: LocationRequestPayload;
}
export type RemoveLocationSuccess = {
  type: typeof locationConst.REMOVE_LOCATION_SUCCESS;
};
export type RemoveLocationFailure = {
  type: typeof locationConst.REMOVE_LOCATION_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetLocation {
  type: typeof locationConst.SET_LOCATION;
  payload: ILocation | null;
}
export interface SetLocations {
  type: typeof locationConst.SET_LOCATIONS;
  payload: ILocation[];
}
export interface ClearLocation {
  type: typeof locationConst.CLEAR_LOCATION;
}
export interface ClearLocations {
  type: typeof locationConst.CLEAR_LOCATIONS;
}

export type LocationActions =
  | FetchLocationsRequest
  | FetchLocationsSuccess
  | FetchLocationsFailure
  | FetchLocationRequest
  | FetchLocationSuccess
  | FetchLocationFailure
  | FetchLocationCountsRequest
  | FetchLocationCountsSuccess
  | FetchLocationCountsFailure
  | CreateLocationRequest
  | CreateLocationSuccess
  | CreateLocationFailure
  | UpdateLocationRequest
  | UpdateLocationSuccess
  | UpdateLocationFailure
  | RemoveLocationRequest
  | RemoveLocationSuccess
  | RemoveLocationFailure
  | SetLocation
  | SetLocations
  | ClearLocation
  | ClearLocations;
