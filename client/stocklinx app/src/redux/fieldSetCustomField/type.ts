import { IFieldSetCustomField } from "../../interfaces/interfaces";
import { fieldSetCustomFieldConst } from "./constant";

export interface FieldSetCustomFieldState {
  fieldSetCustomField: IFieldSetCustomField | null;
  fieldSetCustomFields: IFieldSetCustomField[];
}
export interface FieldSetCustomFieldRequestPayload {
  id: string;
}
export interface FieldSetCustomFieldPayload {
  fieldSetCustomField: IFieldSetCustomField;
}
export interface FieldSetCustomFieldsPayload {
  fieldSetCustomFields: IFieldSetCustomField[];
}
export interface FieldSetCustomFieldRemoveRangePayload {
  ids: string[];
}
export interface FieldSetCustomFieldRemovePayload {
  id: string;
}

//GET
export interface FetchFieldSetCustomFieldsRequest {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_REQUEST;
}
export type FetchFieldSetCustomFieldsSuccess = {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_SUCCESS;
  payload: FieldSetCustomFieldsPayload;
};
export type FetchFieldSetCustomFieldsFailure = {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_FAILURE;
};
//GET:/ID
export interface FetchFieldSetCustomFieldRequest {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldRequestPayload;
}
export type FetchFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_SUCCESS;
  payload: FieldSetCustomFieldPayload;
};
export type FetchFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_FAILURE;
};
//POST
export interface CreateFieldSetCustomFieldRequest {
  type: typeof fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldPayload;
}
export type CreateFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_SUCCESS;
  payload: FieldSetCustomFieldPayload;
};
export type CreateFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_FAILURE;
};
//POST SYNCHRONIZE
export interface SynchronizeFieldSetCustomFieldRequest {
  type: typeof fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldsPayload;
}
export type SynchronizeFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_SUCCESS;
};
export type SynchronizeFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_FAILURE;
};
//POST RANGE
export interface CreateRangeFieldSetCustomFieldRequest {
  type: typeof fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldsPayload;
}
export type CreateRangeFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_SUCCESS;
  payload: FieldSetCustomFieldsPayload;
};
export type CreateRangeFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_FAILURE;
};
//PUT
export interface UpdateFieldSetCustomFieldRequest {
  type: typeof fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldPayload;
}
export type UpdateFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_SUCCESS;
};
export type UpdateFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_FAILURE;
};
//REMOVE
export interface RemoveFieldSetCustomFieldRequest {
  type: typeof fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldRemovePayload;
}
export type RemoveFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_SUCCESS;
  payload: FieldSetCustomFieldRemovePayload;
};
export type RemoveFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeFieldSetCustomFieldRequest {
  type: typeof fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldRemoveRangePayload;
}
export type RemoveRangeFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_SUCCESS;
  payload: FieldSetCustomFieldRemoveRangePayload;
};
export type RemoveRangeFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetFieldSetCustomField {
  type: typeof fieldSetCustomFieldConst.SET_FIELDSETCUSTOMFIELD;
  payload: IFieldSetCustomField | null;
}
export interface SetFieldSetCustomFields {
  type: typeof fieldSetCustomFieldConst.SET_FIELDSETCUSTOMFIELDS;
  payload: IFieldSetCustomField[];
}
export interface ClearFieldSetCustomField {
  type: typeof fieldSetCustomFieldConst.CLEAR_FIELDSETCUSTOMFIELD;
}
export interface ClearFieldSetCustomFields {
  type: typeof fieldSetCustomFieldConst.CLEAR_FIELDSETCUSTOMFIELDS;
}

export type FieldSetCustomFieldActions =
  | FetchFieldSetCustomFieldsRequest
  | FetchFieldSetCustomFieldsSuccess
  | FetchFieldSetCustomFieldsFailure
  | FetchFieldSetCustomFieldRequest
  | FetchFieldSetCustomFieldSuccess
  | FetchFieldSetCustomFieldFailure
  | CreateFieldSetCustomFieldRequest
  | CreateFieldSetCustomFieldSuccess
  | CreateFieldSetCustomFieldFailure
  | CreateRangeFieldSetCustomFieldRequest
  | CreateRangeFieldSetCustomFieldSuccess
  | CreateRangeFieldSetCustomFieldFailure
  | UpdateFieldSetCustomFieldRequest
  | UpdateFieldSetCustomFieldSuccess
  | UpdateFieldSetCustomFieldFailure
  | RemoveFieldSetCustomFieldRequest
  | RemoveFieldSetCustomFieldSuccess
  | RemoveFieldSetCustomFieldFailure
  | RemoveRangeFieldSetCustomFieldRequest
  | RemoveRangeFieldSetCustomFieldSuccess
  | RemoveRangeFieldSetCustomFieldFailure
  | SynchronizeFieldSetCustomFieldRequest
  | SynchronizeFieldSetCustomFieldSuccess
  | SynchronizeFieldSetCustomFieldFailure
  | SetFieldSetCustomField
  | SetFieldSetCustomFields
  | ClearFieldSetCustomField
  | ClearFieldSetCustomFields;
