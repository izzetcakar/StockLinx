import { IFieldSet } from "../../interfaces/serverInterfaces";
import { fieldSetConst } from "./constant";

export interface FieldSetState {
  fieldSet: IFieldSet | null;
  fieldSets: IFieldSet[];
}
export interface FieldSetRequestPayload {
  id: string;
}
export interface FieldSetPayload {
  fieldSet: IFieldSet;
}
export interface FieldSetsPayload {
  fieldSets: IFieldSet[];
}
export interface FieldSetRemoveRangePayload {
  ids: string[];
}
export interface FieldSetRemovePayload {
  id: string;
}

//GET
export interface FetchFieldSetsRequest {
  type: typeof fieldSetConst.FETCH_FIELDSETS_REQUEST;
}
export type FetchFieldSetsSuccess = {
  type: typeof fieldSetConst.FETCH_FIELDSETS_SUCCESS;
  payload: FieldSetsPayload;
};
export type FetchFieldSetsFailure = {
  type: typeof fieldSetConst.FETCH_FIELDSETS_FAILURE;
};
//GET:/ID
export interface FetchFieldSetRequest {
  type: typeof fieldSetConst.FETCH_FIELDSET_REQUEST;
  payload: FieldSetRequestPayload;
}
export type FetchFieldSetSuccess = {
  type: typeof fieldSetConst.FETCH_FIELDSET_SUCCESS;
  payload: FieldSetPayload;
};
export type FetchFieldSetFailure = {
  type: typeof fieldSetConst.FETCH_FIELDSET_FAILURE;
};
//POST
export interface CreateFieldSetRequest {
  type: typeof fieldSetConst.CREATE_FIELDSET_REQUEST;
  payload: FieldSetPayload;
}
export type CreateFieldSetSuccess = {
  type: typeof fieldSetConst.CREATE_FIELDSET_SUCCESS;
  payload: FieldSetPayload;
};
export type CreateFieldSetFailure = {
  type: typeof fieldSetConst.CREATE_FIELDSET_FAILURE;
};
//POST RANGE
export interface CreateRangeFieldSetRequest {
  type: typeof fieldSetConst.CREATE_RANGE_FIELDSET_REQUEST;
  payload: FieldSetsPayload;
}
export type CreateRangeFieldSetSuccess = {
  type: typeof fieldSetConst.CREATE_RANGE_FIELDSET_SUCCESS;
  payload: FieldSetsPayload;
};
export type CreateRangeFieldSetFailure = {
  type: typeof fieldSetConst.CREATE_RANGE_FIELDSET_FAILURE;
};
//PUT
export interface UpdateFieldSetRequest {
  type: typeof fieldSetConst.UPDATE_FIELDSET_REQUEST;
  payload: FieldSetPayload;
}
export type UpdateFieldSetSuccess = {
  type: typeof fieldSetConst.UPDATE_FIELDSET_SUCCESS;
  payload: FieldSetPayload;
};
export type UpdateFieldSetFailure = {
  type: typeof fieldSetConst.UPDATE_FIELDSET_FAILURE;
};
//REMOVE
export interface RemoveFieldSetRequest {
  type: typeof fieldSetConst.REMOVE_FIELDSET_REQUEST;
  payload: FieldSetRemovePayload;
}
export type RemoveFieldSetSuccess = {
  type: typeof fieldSetConst.REMOVE_FIELDSET_SUCCESS;
  payload: FieldSetRemovePayload;
};
export type RemoveFieldSetFailure = {
  type: typeof fieldSetConst.REMOVE_FIELDSET_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeFieldSetRequest {
  type: typeof fieldSetConst.REMOVE_RANGE_FIELDSET_REQUEST;
  payload: FieldSetRemoveRangePayload;
}
export type RemoveRangeFieldSetSuccess = {
  type: typeof fieldSetConst.REMOVE_RANGE_FIELDSET_SUCCESS;
  payload: FieldSetRemoveRangePayload;
};
export type RemoveRangeFieldSetFailure = {
  type: typeof fieldSetConst.REMOVE_RANGE_FIELDSET_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetFieldSet {
  type: typeof fieldSetConst.SET_FIELDSET;
  payload: IFieldSet | null;
}
export interface SetFieldSets {
  type: typeof fieldSetConst.SET_FIELDSETS;
  payload: IFieldSet[];
}
export interface ClearFieldSet {
  type: typeof fieldSetConst.CLEAR_FIELDSET;
}
export interface ClearFieldSets {
  type: typeof fieldSetConst.CLEAR_FIELDSETS;
}

export type FieldSetActions =
  | FetchFieldSetsRequest
  | FetchFieldSetsSuccess
  | FetchFieldSetsFailure
  | FetchFieldSetRequest
  | FetchFieldSetSuccess
  | FetchFieldSetFailure
  | CreateFieldSetRequest
  | CreateFieldSetSuccess
  | CreateFieldSetFailure
  | CreateRangeFieldSetRequest
  | CreateRangeFieldSetSuccess
  | CreateRangeFieldSetFailure
  | UpdateFieldSetRequest
  | UpdateFieldSetSuccess
  | UpdateFieldSetFailure
  | RemoveFieldSetRequest
  | RemoveFieldSetSuccess
  | RemoveFieldSetFailure
  | RemoveRangeFieldSetRequest
  | RemoveRangeFieldSetSuccess
  | RemoveRangeFieldSetFailure
  | SetFieldSet
  | SetFieldSets
  | ClearFieldSet
  | ClearFieldSets;
