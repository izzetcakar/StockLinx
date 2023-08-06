import { IConsumable } from "../../interfaces/interfaces";
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
  ConsumablesSucccessPayload,
  FetchConsumablesSuccess,
  FetchConsumableFailure,
  ConsumableFailurePayload,
  FetchConsumableRequest,
  FetchConsumableSuccess,
  UpdateConsumableFailure,
  UpdateConsumableRequest,
  UpdateConsumableSuccess,
  ConsumableRequestPayload,
  UpdateConsumableRequestPayload,
  ConsumableSucccessPayload,
  SetConsumable,
  SetConsumables,
  ClearConsumable,
  ClearConsumables,
} from "./type";

//GET
const getAll = (): FetchConsumablesRequest => ({
  type: consumableConst.FETCH_CONSUMABLES_REQUEST,
});
const getAllSuccess = (
  payload: ConsumablesSucccessPayload
): FetchConsumablesSuccess => ({
  type: consumableConst.FETCH_CONSUMABLES_SUCCESS,
  payload,
});
const getAllFailure = (
  payload: ConsumableFailurePayload
): FetchConsumablesFailure => ({
  type: consumableConst.FETCH_CONSUMABLES_FAILURE,
  payload,
});

//GET:/ID
const get = (payload: ConsumableRequestPayload): FetchConsumableRequest => ({
  type: consumableConst.FETCH_CONSUMABLE_REQUEST,
  payload,
});
const getSuccess = (
  payload: ConsumableSucccessPayload
): FetchConsumableSuccess => ({
  type: consumableConst.FETCH_CONSUMABLE_SUCCESS,
  payload,
});
const getFailure = (
  payload: ConsumableFailurePayload
): FetchConsumableFailure => ({
  type: consumableConst.FETCH_CONSUMABLE_FAILURE,
  payload,
});

//POST
const create = (
  payload: UpdateConsumableRequestPayload
): CreateConsumableRequest => ({
  type: consumableConst.CREATE_CONSUMABLE_REQUEST,
  payload,
});
const createSuccess = (): CreateConsumableSuccess => ({
  type: consumableConst.CREATE_CONSUMABLE_SUCCESS,
});
const createFailure = (
  payload: ConsumableFailurePayload
): CreateConsumableFailure => ({
  type: consumableConst.CREATE_CONSUMABLE_FAILURE,
  payload,
});

//PUT
const update = (
  payload: UpdateConsumableRequestPayload
): UpdateConsumableRequest => ({
  type: consumableConst.UPDATE_CONSUMABLE_REQUEST,
  payload,
});
const updateSuccess = (): UpdateConsumableSuccess => ({
  type: consumableConst.UPDATE_CONSUMABLE_SUCCESS,
});
const updateFailure = (
  payload: ConsumableFailurePayload
): UpdateConsumableFailure => ({
  type: consumableConst.UPDATE_CONSUMABLE_FAILURE,
  payload,
});

//REMOVE
const remove = (
  payload: ConsumableRequestPayload
): RemoveConsumableRequest => ({
  type: consumableConst.REMOVE_CONSUMABLE_REQUEST,
  payload,
});
const removeSuccess = (): RemoveConsumableSuccess => ({
  type: consumableConst.REMOVE_CONSUMABLE_SUCCESS,
});
const removeFailure = (
  payload: ConsumableFailurePayload
): RemoveConsumableFailure => ({
  type: consumableConst.REMOVE_CONSUMABLE_FAILURE,
  payload,
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
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setConsumable,
  clearConsumable,
  setConsumables,
  clearConsumables,
};
