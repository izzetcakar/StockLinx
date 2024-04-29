import {
  CheckInOutPayload,
  UserProductCheckInPayload,
} from "../../interfaces/clientInterfaces";
import { IConsumable, IUserProduct } from "../../interfaces/serverInterfaces";
import { consumableConst } from "./constant";

export type ConsumableState = {
  consumable: IConsumable | null;
  consumables: IConsumable[];
};
export type ConsumableRequestPayload = {
  id: string;
};
export type ConsumablePayload = {
  consumable: IConsumable;
};
export type ConsumablesPayload = {
  consumables: IConsumable[];
};
export type ConsumableRemoveRangePayload = {
  ids: string[];
};
export type ConsumableRemovePayload = {
  id: string;
};

//GET
export type FetchConsumablesRequest = {
  type: typeof consumableConst.FETCH_CONSUMABLES_REQUEST;
};
export type FetchConsumablesSuccess = {
  type: typeof consumableConst.FETCH_CONSUMABLES_SUCCESS;
  payload: ConsumablesPayload;
};
export type FetchConsumablesFailure = {
  type: typeof consumableConst.FETCH_CONSUMABLES_FAILURE;
};

//GET:/ID
export type FetchConsumableRequest = {
  type: typeof consumableConst.FETCH_CONSUMABLE_REQUEST;
  payload: ConsumableRequestPayload;
};
export type FetchConsumableSuccess = {
  type: typeof consumableConst.FETCH_CONSUMABLE_SUCCESS;
  payload: ConsumablePayload;
};
export type FetchConsumableFailure = {
  type: typeof consumableConst.FETCH_CONSUMABLE_FAILURE;
};

//POST
export type CreateConsumableRequest = {
  type: typeof consumableConst.CREATE_CONSUMABLE_REQUEST;
  payload: ConsumablePayload;
};
export type CreateConsumableSuccess = {
  type: typeof consumableConst.CREATE_CONSUMABLE_SUCCESS;
  payload: ConsumablePayload;
};
export type CreateConsumableFailure = {
  type: typeof consumableConst.CREATE_CONSUMABLE_FAILURE;
};

//POST RANGE
export type CreateRangeConsumableRequest = {
  type: typeof consumableConst.CREATE_RANGE_CONSUMABLE_REQUEST;
  payload: ConsumablesPayload;
};
export type CreateRangeConsumableSuccess = {
  type: typeof consumableConst.CREATE_RANGE_CONSUMABLE_SUCCESS;
  payload: ConsumablesPayload;
};
export type CreateRangeConsumableFailure = {
  type: typeof consumableConst.CREATE_RANGE_CONSUMABLE_FAILURE;
};

//PUT
export type UpdateConsumableRequest = {
  type: typeof consumableConst.UPDATE_CONSUMABLE_REQUEST;
  payload: ConsumablePayload;
};
export type UpdateConsumableSuccess = {
  type: typeof consumableConst.UPDATE_CONSUMABLE_SUCCESS;
  payload: ConsumablePayload;
};
export type UpdateConsumableFailure = {
  type: typeof consumableConst.UPDATE_CONSUMABLE_FAILURE;
};

//REMOVE
export type RemoveConsumableRequest = {
  type: typeof consumableConst.REMOVE_CONSUMABLE_REQUEST;
  payload: ConsumableRemovePayload;
};
export type RemoveConsumableSuccess = {
  type: typeof consumableConst.REMOVE_CONSUMABLE_SUCCESS;
  payload: ConsumableRemovePayload;
};
export type RemoveConsumableFailure = {
  type: typeof consumableConst.REMOVE_CONSUMABLE_FAILURE;
};

//REMOVE RANGE
export type RemoveRangeConsumableRequest = {
  type: typeof consumableConst.REMOVE_RANGE_CONSUMABLE_REQUEST;
  payload: ConsumableRemoveRangePayload;
};
export type RemoveRangeConsumableSuccess = {
  type: typeof consumableConst.REMOVE_RANGE_CONSUMABLE_SUCCESS;
  payload: ConsumableRemoveRangePayload;
};
export type RemoveRangeConsumableFailure = {
  type: typeof consumableConst.REMOVE_RANGE_CONSUMABLE_FAILURE;
};

//CHECK IN
export type CheckInConsumableRequest = {
  type: typeof consumableConst.CHECK_IN_CONSUMABLE_REQUEST;
  payload: UserProductCheckInPayload;
};
export type CheckInConsumableSuccess = {
  type: typeof consumableConst.CHECK_IN_CONSUMABLE_SUCCESS;
  payload: CheckInOutPayload;
};
export type CheckInConsumableFailure = {
  type: typeof consumableConst.CHECK_IN_CONSUMABLE_FAILURE;
};

//CHECK OUT
export type CheckOutConsumableRequest = {
  type: typeof consumableConst.CHECK_OUT_CONSUMABLE_REQUEST;
  payload: IUserProduct;
};
export type CheckOutConsumableSuccess = {
  type: typeof consumableConst.CHECK_OUT_CONSUMABLE_SUCCESS;
  payload: CheckInOutPayload;
};
export type CheckOutConsumableFailure = {
  type: typeof consumableConst.CHECK_OUT_CONSUMABLE_FAILURE;
};

//CLIENT ACTION TYPES
export type SetConsumable = {
  type: typeof consumableConst.SET_CONSUMABLE;
  payload: IConsumable | null;
};
export type SetConsumables = {
  type: typeof consumableConst.SET_CONSUMABLES;
  payload: IConsumable[];
};
export type ClearConsumable = {
  type: typeof consumableConst.CLEAR_CONSUMABLE;
};
export type ClearConsumables = {
  type: typeof consumableConst.CLEAR_CONSUMABLES;
};

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
  | CheckInConsumableRequest
  | CheckInConsumableSuccess
  | CheckInConsumableFailure
  | CheckOutConsumableRequest
  | CheckOutConsumableSuccess
  | CheckOutConsumableFailure
  | SetConsumable
  | SetConsumables
  | ClearConsumable
  | ClearConsumables;
