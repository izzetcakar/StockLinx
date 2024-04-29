import { IFieldSetCustomField } from "../../interfaces/serverInterfaces";
import { fieldSetCustomFieldConst } from "./constant";

export type FieldSetCustomFieldState = {
  fieldSetCustomField: IFieldSetCustomField | null;
  fieldSetCustomFields: IFieldSetCustomField[];
};
export type FieldSetCustomFieldRequestPayload = {
  id: string;
};
export type FieldSetCustomFieldPayload = {
  fieldSetCustomField: IFieldSetCustomField;
};
export type FieldSetCustomFieldsPayload = {
  fieldSetCustomFields: IFieldSetCustomField[];
};
export type FieldSetCustomFieldRemoveRangePayload = {
  ids: string[];
};
export type FieldSetCustomFieldRemovePayload = {
  id: string;
};

//GET
export type FetchFieldSetCustomFieldsRequest = {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_REQUEST;
};
export type FetchFieldSetCustomFieldsSuccess = {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_SUCCESS;
  payload: FieldSetCustomFieldsPayload;
};
export type FetchFieldSetCustomFieldsFailure = {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_FAILURE;
};
//GET:/ID
export type FetchFieldSetCustomFieldRequest = {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldRequestPayload;
};
export type FetchFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_SUCCESS;
  payload: FieldSetCustomFieldPayload;
};
export type FetchFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_FAILURE;
};
//POST
export type CreateFieldSetCustomFieldRequest = {
  type: typeof fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldPayload;
};
export type CreateFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_SUCCESS;
  payload: FieldSetCustomFieldPayload;
};
export type CreateFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_FAILURE;
};
//POST SYNCHRONIZE
export type SynchronizeFieldSetCustomFieldRequest = {
  type: typeof fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldsPayload;
};
export type SynchronizeFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_SUCCESS;
};
export type SynchronizeFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_FAILURE;
};
//POST RANGE
export type CreateRangeFieldSetCustomFieldRequest = {
  type: typeof fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldsPayload;
};
export type CreateRangeFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_SUCCESS;
  payload: FieldSetCustomFieldsPayload;
};
export type CreateRangeFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_FAILURE;
};
//PUT
export type UpdateFieldSetCustomFieldRequest = {
  type: typeof fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldPayload;
};
export type UpdateFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_SUCCESS;
  payload: FieldSetCustomFieldPayload;
};
export type UpdateFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_FAILURE;
};
//REMOVE
export type RemoveFieldSetCustomFieldRequest = {
  type: typeof fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldRemovePayload;
};
export type RemoveFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_SUCCESS;
  payload: FieldSetCustomFieldRemovePayload;
};
export type RemoveFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_FAILURE;
};
//REMOVE RANGE
export type RemoveRangeFieldSetCustomFieldRequest = {
  type: typeof fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_REQUEST;
  payload: FieldSetCustomFieldRemoveRangePayload;
};
export type RemoveRangeFieldSetCustomFieldSuccess = {
  type: typeof fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_SUCCESS;
  payload: FieldSetCustomFieldRemoveRangePayload;
};
export type RemoveRangeFieldSetCustomFieldFailure = {
  type: typeof fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_FAILURE;
};

//CLIENT ACTION TYPES
export type SetFieldSetCustomField = {
  type: typeof fieldSetCustomFieldConst.SET_FIELDSETCUSTOMFIELD;
  payload: IFieldSetCustomField | null;
};
export type SetFieldSetCustomFields = {
  type: typeof fieldSetCustomFieldConst.SET_FIELDSETCUSTOMFIELDS;
  payload: IFieldSetCustomField[];
};
export type ClearFieldSetCustomField = {
  type: typeof fieldSetCustomFieldConst.CLEAR_FIELDSETCUSTOMFIELD;
};
export type ClearFieldSetCustomFields = {
  type: typeof fieldSetCustomFieldConst.CLEAR_FIELDSETCUSTOMFIELDS;
};

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
