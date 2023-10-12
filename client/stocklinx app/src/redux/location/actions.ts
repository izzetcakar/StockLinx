import { ILocation } from "../../interfaces/interfaces";
import { locationConst } from "./constant";
import {
  CreateLocationFailure,
  CreateLocationRequest,
  CreateLocationSuccess,
  RemoveLocationFailure,
  RemoveLocationRequest,
  RemoveLocationSuccess,
  FetchLocationsFailure,
  FetchLocationsRequest,
  LocationsSucccessPayload,
  FetchLocationsSuccess,
  FetchLocationFailure,
  FetchLocationRequest,
  FetchLocationSuccess,
  UpdateLocationFailure,
  UpdateLocationRequest,
  UpdateLocationSuccess,
  LocationRequestPayload,
  UpdateLocationRequestPayload,
  LocationSucccessPayload,
  SetLocation,
  SetLocations,
  ClearLocation,
  ClearLocations,
  LocationCountsSuccessPayload,
  FetchLocationCountsSuccess,
  FetchLocationCountsRequest,
  FetchLocationCountsFailure,
} from "./type";

//GET
const getAll = (): FetchLocationsRequest => ({
  type: locationConst.FETCH_LOCATIONS_REQUEST,
});
const getAllSuccess = (
  payload: LocationsSucccessPayload
): FetchLocationsSuccess => ({
  type: locationConst.FETCH_LOCATIONS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchLocationsFailure => ({
  type: locationConst.FETCH_LOCATIONS_FAILURE,
});

//GET:/ID
const get = (payload: LocationRequestPayload): FetchLocationRequest => ({
  type: locationConst.FETCH_LOCATION_REQUEST,
  payload,
});
const getSuccess = (
  payload: LocationSucccessPayload
): FetchLocationSuccess => ({
  type: locationConst.FETCH_LOCATION_SUCCESS,
  payload,
});
const getFailure = (): FetchLocationFailure => ({
  type: locationConst.FETCH_LOCATION_FAILURE,
});

//GET PRODUCT LOCATIONS
const getCounts = (): FetchLocationCountsRequest => ({
  type: locationConst.FETCH_COUNTS_REQUEST,
});
const getCountsSuccess = (
  payload: LocationCountsSuccessPayload
): FetchLocationCountsSuccess => ({
  type: locationConst.FETCH_COUNTS_SUCCESS,
  payload,
});
const getCountsFailure = (): FetchLocationCountsFailure => ({
  type: locationConst.FETCH_COUNTS_FAILURE,
});

//POST
const create = (
  payload: UpdateLocationRequestPayload
): CreateLocationRequest => ({
  type: locationConst.CREATE_LOCATION_REQUEST,
  payload,
});
const createSuccess = (): CreateLocationSuccess => ({
  type: locationConst.CREATE_LOCATION_SUCCESS,
});
const createFailure = (): CreateLocationFailure => ({
  type: locationConst.CREATE_LOCATION_FAILURE,
});

//PUT
const update = (
  payload: UpdateLocationRequestPayload
): UpdateLocationRequest => ({
  type: locationConst.UPDATE_LOCATION_REQUEST,
  payload,
});
const updateSuccess = (): UpdateLocationSuccess => ({
  type: locationConst.UPDATE_LOCATION_SUCCESS,
});
const updateFailure = (): UpdateLocationFailure => ({
  type: locationConst.UPDATE_LOCATION_FAILURE,
});

//REMOVE
const remove = (payload: LocationRequestPayload): RemoveLocationRequest => ({
  type: locationConst.REMOVE_LOCATION_REQUEST,
  payload,
});
const removeSuccess = (): RemoveLocationSuccess => ({
  type: locationConst.REMOVE_LOCATION_SUCCESS,
});
const removeFailure = (): RemoveLocationFailure => ({
  type: locationConst.REMOVE_LOCATION_FAILURE,
});

//CLIENT ACTIONS
const setLocation = (payload: ILocation | null): SetLocation => ({
  type: locationConst.SET_LOCATION,
  payload,
});
const clearLocation = (): ClearLocation => ({
  type: locationConst.CLEAR_LOCATION,
});
const setLocations = (payload: ILocation[]): SetLocations => ({
  type: locationConst.SET_LOCATIONS,
  payload,
});
const clearLocations = (): ClearLocations => ({
  type: locationConst.CLEAR_LOCATIONS,
});

export const locationActions = {
  getAll,
  getAllSuccess,
  getAllFailure,
  get,
  getSuccess,
  getFailure,
  create,
  createSuccess,
  createFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setLocation,
  clearLocation,
  setLocations,
  clearLocations,
  getCounts,
  getCountsSuccess,
  getCountsFailure,
};
