import {
  CheckInOutPayload,
  UserProductCheckInPayload,
  UserProductCheckOutPayload,
} from "@interfaces/clientInterfaces";
import { IConsumable } from "@interfaces/serverInterfaces";
import { consumableConst } from "./constant";
import {
  CreateConsumableFailure,
  CreateConsumableRequest,
  CreateConsumableSuccess,
  RemoveConsumableFailure,
  RemoveConsumableRequest,
  RemoveConsumableSuccess,
  FetchConsumablesFailure,
  FetchConsumablesRequest,
  FetchConsumablesSuccess,
  FetchConsumableFailure,
  FetchConsumableRequest,
  FetchConsumableSuccess,
  UpdateConsumableFailure,
  UpdateConsumableRequest,
  UpdateConsumableSuccess,
  ConsumableRequestPayload,
  SetConsumable,
  SetConsumables,
  ClearConsumable,
  ClearConsumables,
  ConsumablesPayload,
  ConsumablePayload,
  CreateRangeConsumableRequest,
  CreateRangeConsumableSuccess,
  CreateRangeConsumableFailure,
  RemoveRangeConsumableRequest,
  RemoveRangeConsumableSuccess,
  RemoveRangeConsumableFailure,
  ConsumableRemoveRangePayload,
  ConsumableRemovePayload,
  CheckInConsumableRequest,
  CheckInConsumableSuccess,
  CheckInConsumableFailure,
  CheckOutConsumableRequest,
  CheckOutConsumableSuccess,
  CheckOutConsumableFailure,
  FilterConsumablesRequest,
  FilterConsumablesSuccess,
  FilterConsumablesFailure,
} from "./type";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

//GET
const getAll = (): FetchConsumablesRequest => ({
  type: consumableConst.FETCH_CONSUMABLES_REQUEST,
});
const getAllSuccess = (
  payload: ConsumablesPayload
): FetchConsumablesSuccess => ({
  type: consumableConst.FETCH_CONSUMABLES_SUCCESS,
  payload,
});
const getAllFailure = (): FetchConsumablesFailure => ({
  type: consumableConst.FETCH_CONSUMABLES_FAILURE,
});

//GET:/ID
const get = (payload: ConsumableRequestPayload): FetchConsumableRequest => ({
  type: consumableConst.FETCH_CONSUMABLE_REQUEST,
  payload,
});
const getSuccess = (payload: ConsumablePayload): FetchConsumableSuccess => ({
  type: consumableConst.FETCH_CONSUMABLE_SUCCESS,
  payload,
});
const getFailure = (): FetchConsumableFailure => ({
  type: consumableConst.FETCH_CONSUMABLE_FAILURE,
});

//POST
const create = (payload: ConsumablePayload): CreateConsumableRequest => ({
  type: consumableConst.CREATE_CONSUMABLE_REQUEST,
  payload,
});
const createSuccess = (
  payload: ConsumablePayload
): CreateConsumableSuccess => ({
  type: consumableConst.CREATE_CONSUMABLE_SUCCESS,
  payload,
});
const createFailure = (): CreateConsumableFailure => ({
  type: consumableConst.CREATE_CONSUMABLE_FAILURE,
});

//POST RANGE
const createRange = (
  payload: ConsumablesPayload
): CreateRangeConsumableRequest => ({
  type: consumableConst.CREATE_RANGE_CONSUMABLE_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: ConsumablesPayload
): CreateRangeConsumableSuccess => ({
  type: consumableConst.CREATE_RANGE_CONSUMABLE_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeConsumableFailure => ({
  type: consumableConst.CREATE_RANGE_CONSUMABLE_FAILURE,
});

//PUT
const update = (payload: ConsumablePayload): UpdateConsumableRequest => ({
  type: consumableConst.UPDATE_CONSUMABLE_REQUEST,
  payload,
});
const updateSuccess = (
  payload: ConsumablePayload
): UpdateConsumableSuccess => ({
  type: consumableConst.UPDATE_CONSUMABLE_SUCCESS,
  payload,
});
const updateFailure = (): UpdateConsumableFailure => ({
  type: consumableConst.UPDATE_CONSUMABLE_FAILURE,
});

//REMOVE
const remove = (payload: ConsumableRemovePayload): RemoveConsumableRequest => ({
  type: consumableConst.REMOVE_CONSUMABLE_REQUEST,
  payload,
});
const removeSuccess = (
  payload: ConsumableRemovePayload
): RemoveConsumableSuccess => ({
  type: consumableConst.REMOVE_CONSUMABLE_SUCCESS,
  payload,
});
const removeFailure = (): RemoveConsumableFailure => ({
  type: consumableConst.REMOVE_CONSUMABLE_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: ConsumableRemoveRangePayload
): RemoveRangeConsumableRequest => ({
  type: consumableConst.REMOVE_RANGE_CONSUMABLE_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: ConsumableRemoveRangePayload
): RemoveRangeConsumableSuccess => ({
  type: consumableConst.REMOVE_RANGE_CONSUMABLE_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeConsumableFailure => ({
  type: consumableConst.REMOVE_RANGE_CONSUMABLE_FAILURE,
});

//CHECK IN
const checkIn = (
  payload: UserProductCheckInPayload
): CheckInConsumableRequest => ({
  type: consumableConst.CHECK_IN_CONSUMABLE_REQUEST,
  payload,
});
const checkInSuccess = (
  payload: CheckInOutPayload
): CheckInConsumableSuccess => ({
  type: consumableConst.CHECK_IN_CONSUMABLE_SUCCESS,
  payload,
});
const checkInFailure = (): CheckInConsumableFailure => ({
  type: consumableConst.CHECK_IN_CONSUMABLE_FAILURE,
});

//CHECK OUT
const checkOut = (
  payload: UserProductCheckOutPayload
): CheckOutConsumableRequest => ({
  type: consumableConst.CHECK_OUT_CONSUMABLE_REQUEST,
  payload,
});
const checkOutSuccess = (
  payload: CheckInOutPayload
): CheckOutConsumableSuccess => ({
  type: consumableConst.CHECK_OUT_CONSUMABLE_SUCCESS,
  payload,
});
const checkOutFailure = (): CheckOutConsumableFailure => ({
  type: consumableConst.CHECK_OUT_CONSUMABLE_FAILURE,
});

//FILTER
const filter = (payload: QueryFilter[]): FilterConsumablesRequest => ({
  type: consumableConst.FILTER_CONSUMABLES_REQUEST,
  payload,
});
const filterSuccess = (
  payload: ConsumablesPayload
): FilterConsumablesSuccess => ({
  type: consumableConst.FILTER_CONSUMABLES_SUCCESS,
  payload,
});
const filterFailure = (): FilterConsumablesFailure => ({
  type: consumableConst.FILTER_CONSUMABLES_FAILURE,
});

//CLIENT ACTIONS
const setConsumable = (payload: IConsumable | null): SetConsumable => ({
  type: consumableConst.SET_CONSUMABLE,
  payload,
});
const clearConsumable = (): ClearConsumable => ({
  type: consumableConst.CLEAR_CONSUMABLE,
});
const setConsumables = (payload: IConsumable[]): SetConsumables => ({
  type: consumableConst.SET_CONSUMABLES,
  payload,
});
const clearConsumables = (): ClearConsumables => ({
  type: consumableConst.CLEAR_CONSUMABLES,
});

export const consumableActions = {
  getAll,
  getAllSuccess,
  getAllFailure,
  get,
  getSuccess,
  getFailure,
  create,
  createSuccess,
  createFailure,
  createRange,
  createRangeSuccess,
  createRangeFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  removeRange,
  removeRangeSuccess,
  removeRangeFailure,
  checkIn,
  checkInSuccess,
  checkInFailure,
  checkOut,
  checkOutSuccess,
  checkOutFailure,
  filter,
  filterSuccess,
  filterFailure,
  setConsumable,
  clearConsumable,
  setConsumables,
  clearConsumables,
};
