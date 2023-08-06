import { IConsumable, SelectData } from "../../interfaces/interfaces";
import { consumableConst } from "./constant";

export interface ConsumableState {
  consumable: IConsumable | null;
  consumables: IConsumable[];
  selectData: SelectData[];
  pending: boolean;
  error: string | null;
}

export interface ConsumableSucccessPayload {
  consumable: IConsumable;
}
export interface ConsumablesSucccessPayload {
  consumables: IConsumable[];
}
export interface ConsumableFailurePayload {
  error: string;
}
export interface ConsumableRequestPayload {
  id: string;
}
export interface UpdateConsumableRequestPayload {
  consumable: IConsumable;
}

//GET
export interface FetchConsumablesRequest {
  type: typeof consumableConst.FETCH_CONSUMABLES_REQUEST;
}
export type FetchConsumablesSuccess = {
  type: typeof consumableConst.FETCH_CONSUMABLES_SUCCESS;
  payload: ConsumablesSucccessPayload;
};
export type FetchConsumablesFailure = {
  type: typeof consumableConst.FETCH_CONSUMABLES_FAILURE;
  payload: ConsumableFailurePayload;
};
//GET:/ID
export interface FetchConsumableRequest {
  type: typeof consumableConst.FETCH_CONSUMABLE_REQUEST;
  payload: ConsumableRequestPayload;
}
export type FetchConsumableSuccess = {
  type: typeof consumableConst.FETCH_CONSUMABLE_SUCCESS;
  payload: ConsumableSucccessPayload;
};
export type FetchConsumableFailure = {
  type: typeof consumableConst.FETCH_CONSUMABLE_FAILURE;
  payload: ConsumableFailurePayload;
};
//POST
export interface CreateConsumableRequest {
  type: typeof consumableConst.CREATE_CONSUMABLE_REQUEST;
  payload: UpdateConsumableRequestPayload;
}
export type CreateConsumableSuccess = {
  type: typeof consumableConst.CREATE_CONSUMABLE_SUCCESS;
};
export type CreateConsumableFailure = {
  type: typeof consumableConst.CREATE_CONSUMABLE_FAILURE;
  payload: ConsumableFailurePayload;
};
//PUT
export interface UpdateConsumableRequest {
  type: typeof consumableConst.UPDATE_CONSUMABLE_REQUEST;
  payload: UpdateConsumableRequestPayload;
}
export type UpdateConsumableSuccess = {
  type: typeof consumableConst.UPDATE_CONSUMABLE_SUCCESS;
};
export type UpdateConsumableFailure = {
  type: typeof consumableConst.UPDATE_CONSUMABLE_FAILURE;
  payload: ConsumableFailurePayload;
};
//REMOVE
export interface RemoveConsumableRequest {
  type: typeof consumableConst.REMOVE_CONSUMABLE_REQUEST;
  payload: ConsumableRequestPayload;
}
export type RemoveConsumableSuccess = {
  type: typeof consumableConst.REMOVE_CONSUMABLE_SUCCESS;
};
export type RemoveConsumableFailure = {
  type: typeof consumableConst.REMOVE_CONSUMABLE_FAILURE;
  payload: ConsumableFailurePayload;
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
  | UpdateConsumableRequest
  | UpdateConsumableSuccess
  | UpdateConsumableFailure
  | RemoveConsumableRequest
  | RemoveConsumableSuccess
  | RemoveConsumableFailure
  | SetConsumable
  | SetConsumables
  | ClearConsumable
  | ClearConsumables;
