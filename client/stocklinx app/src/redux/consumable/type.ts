import { IConsumable } from "../../interfaces/interfaces";
import { consumableConst } from "./constant";

export interface ConsumableState {
  consumable: IConsumable | null;
  consumables: IConsumable[];
}
export interface ConsumableRequestPayload {
  id: string;
}
export interface ConsumablePayload {
  consumable: IConsumable;
}
export interface ConsumablesPayload {
  consumables: IConsumable[];
}
export interface ConsumableRemoveRangePayload {
  ids: string[];
}
export interface ConsumableRemovePayload {
  id: string;
}

//GET
export interface FetchConsumablesRequest {
  type: typeof consumableConst.FETCH_CONSUMABLES_REQUEST;
}
export type FetchConsumablesSuccess = {
  type: typeof consumableConst.FETCH_CONSUMABLES_SUCCESS;
  payload: ConsumablesPayload;
};
export type FetchConsumablesFailure = {
  type: typeof consumableConst.FETCH_CONSUMABLES_FAILURE;
};
//GET:/ID
export interface FetchConsumableRequest {
  type: typeof consumableConst.FETCH_CONSUMABLE_REQUEST;
  payload: ConsumableRequestPayload;
}
export type FetchConsumableSuccess = {
  type: typeof consumableConst.FETCH_CONSUMABLE_SUCCESS;
  payload: ConsumablePayload;
};
export type FetchConsumableFailure = {
  type: typeof consumableConst.FETCH_CONSUMABLE_FAILURE;
};
//POST
export interface CreateConsumableRequest {
  type: typeof consumableConst.CREATE_CONSUMABLE_REQUEST;
  payload: ConsumablePayload;
}
export type CreateConsumableSuccess = {
  type: typeof consumableConst.CREATE_CONSUMABLE_SUCCESS;
  payload: ConsumablePayload;
};
export type CreateConsumableFailure = {
  type: typeof consumableConst.CREATE_CONSUMABLE_FAILURE;
};
//POST RANGE
export interface CreateRangeConsumableRequest {
  type: typeof consumableConst.CREATE_RANGE_CONSUMABLE_REQUEST;
  payload: ConsumablesPayload;
}
export type CreateRangeConsumableSuccess = {
  type: typeof consumableConst.CREATE_RANGE_CONSUMABLE_SUCCESS;
  payload: ConsumablesPayload;
};
export type CreateRangeConsumableFailure = {
  type: typeof consumableConst.CREATE_RANGE_CONSUMABLE_FAILURE;
};
//PUT
export interface UpdateConsumableRequest {
  type: typeof consumableConst.UPDATE_CONSUMABLE_REQUEST;
  payload: ConsumablePayload;
}
export type UpdateConsumableSuccess = {
  type: typeof consumableConst.UPDATE_CONSUMABLE_SUCCESS;
};
export type UpdateConsumableFailure = {
  type: typeof consumableConst.UPDATE_CONSUMABLE_FAILURE;
};
//REMOVE
export interface RemoveConsumableRequest {
  type: typeof consumableConst.REMOVE_CONSUMABLE_REQUEST;
  payload: ConsumableRemovePayload;
}
export type RemoveConsumableSuccess = {
  type: typeof consumableConst.REMOVE_CONSUMABLE_SUCCESS;
  payload: ConsumableRemovePayload;
};
export type RemoveConsumableFailure = {
  type: typeof consumableConst.REMOVE_CONSUMABLE_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeConsumableRequest {
  type: typeof consumableConst.REMOVE_RANGE_CONSUMABLE_REQUEST;
  payload: ConsumableRemoveRangePayload;
}
export type RemoveRangeConsumableSuccess = {
  type: typeof consumableConst.REMOVE_RANGE_CONSUMABLE_SUCCESS;
  payload: ConsumableRemoveRangePayload;
};
export type RemoveRangeConsumableFailure = {
  type: typeof consumableConst.REMOVE_RANGE_CONSUMABLE_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetConsumable {
  type: typeof consumableConst.SET_CONSUMABLE;
  payload: IConsumable | null;
}
export interface SetConsumables {
  type: typeof consumableConst.SET_CONSUMABLES;
  payload: IConsumable[];
}
export interface ClearConsumable {
  type: typeof consumableConst.CLEAR_CONSUMABLE;
}
export interface ClearConsumables {
  type: typeof consumableConst.CLEAR_CONSUMABLES;
}

export type ConsumableActions =
  | FetchConsumablesRequest
  | FetchConsumablesSuccess
  | FetchConsumablesFailure
  | FetchConsumableRequest
  | FetchConsumableSuccess
  | FetchConsumableFailure
  | CreateConsumableRequest
  | CreateConsumableSuccess
  | CreateConsumableFailure
  | CreateRangeConsumableRequest
  | CreateRangeConsumableSuccess
  | CreateRangeConsumableFailure
  | UpdateConsumableRequest
  | UpdateConsumableSuccess
  | UpdateConsumableFailure
  | RemoveConsumableRequest
  | RemoveConsumableSuccess
  | RemoveConsumableFailure
  | RemoveRangeConsumableRequest
  | RemoveRangeConsumableSuccess
  | RemoveRangeConsumableFailure
  | SetConsumable
  | SetConsumables
  | ClearConsumable
  | ClearConsumables;
