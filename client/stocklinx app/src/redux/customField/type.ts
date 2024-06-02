import { ICustomField } from "@interfaces/serverInterfaces";
import { customFieldConst } from "./constant";

export type CustomFieldState = {
  customField: ICustomField | null;
  customFields: ICustomField[];
};
export type CustomFieldRequestPayload = {
  id: string;
};
export type CustomFieldPayload = {
  customField: ICustomField;
};
export type CustomFieldsPayload = {
  customFields: ICustomField[];
};
export type CustomFieldRemoveRangePayload = {
  ids: string[];
};
export type CustomFieldRemovePayload = {
  id: string;
};

//GET
export type FetchCustomFieldsRequest = {
  type: typeof customFieldConst.FETCH_CUSTOMFIELDS_REQUEST;
};
export type FetchCustomFieldsSuccess = {
  type: typeof customFieldConst.FETCH_CUSTOMFIELDS_SUCCESS;
  payload: CustomFieldsPayload;
};
export type FetchCustomFieldsFailure = {
  type: typeof customFieldConst.FETCH_CUSTOMFIELDS_FAILURE;
};
//GET:/ID
export type FetchCustomFieldRequest = {
  type: typeof customFieldConst.FETCH_CUSTOMFIELD_REQUEST;
  payload: CustomFieldRequestPayload;
};
export type FetchCustomFieldSuccess = {
  type: typeof customFieldConst.FETCH_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldPayload;
};
export type FetchCustomFieldFailure = {
  type: typeof customFieldConst.FETCH_CUSTOMFIELD_FAILURE;
};
//POST
export type CreateCustomFieldRequest = {
  type: typeof customFieldConst.CREATE_CUSTOMFIELD_REQUEST;
  payload: CustomFieldPayload;
};
export type CreateCustomFieldSuccess = {
  type: typeof customFieldConst.CREATE_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldPayload;
};
export type CreateCustomFieldFailure = {
  type: typeof customFieldConst.CREATE_CUSTOMFIELD_FAILURE;
};
//POST RANGE
export type CreateRangeCustomFieldRequest = {
  type: typeof customFieldConst.CREATE_RANGE_CUSTOMFIELD_REQUEST;
  payload: CustomFieldsPayload;
};
export type CreateRangeCustomFieldSuccess = {
  type: typeof customFieldConst.CREATE_RANGE_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldsPayload;
};
export type CreateRangeCustomFieldFailure = {
  type: typeof customFieldConst.CREATE_RANGE_CUSTOMFIELD_FAILURE;
};
//PUT
export type UpdateCustomFieldRequest = {
  type: typeof customFieldConst.UPDATE_CUSTOMFIELD_REQUEST;
  payload: CustomFieldPayload;
};
export type UpdateCustomFieldSuccess = {
  type: typeof customFieldConst.UPDATE_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldPayload;
};
export type UpdateCustomFieldFailure = {
  type: typeof customFieldConst.UPDATE_CUSTOMFIELD_FAILURE;
};
//REMOVE
export type RemoveCustomFieldRequest = {
  type: typeof customFieldConst.REMOVE_CUSTOMFIELD_REQUEST;
  payload: CustomFieldRemovePayload;
};
export type RemoveCustomFieldSuccess = {
  type: typeof customFieldConst.REMOVE_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldRemovePayload;
};
export type RemoveCustomFieldFailure = {
  type: typeof customFieldConst.REMOVE_CUSTOMFIELD_FAILURE;
};
//REMOVE RANGE
export type RemoveRangeCustomFieldRequest = {
  type: typeof customFieldConst.REMOVE_RANGE_CUSTOMFIELD_REQUEST;
  payload: CustomFieldRemoveRangePayload;
};
export type RemoveRangeCustomFieldSuccess = {
  type: typeof customFieldConst.REMOVE_RANGE_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldRemoveRangePayload;
};
export type RemoveRangeCustomFieldFailure = {
  type: typeof customFieldConst.REMOVE_RANGE_CUSTOMFIELD_FAILURE;
};

//CLIENT ACTION TYPES
export type SetCustomField = {
  type: typeof customFieldConst.SET_CUSTOMFIELD;
  payload: ICustomField | null;
};
export type SetCustomFields = {
  type: typeof customFieldConst.SET_CUSTOMFIELDS;
  payload: ICustomField[];
};
export type ClearCustomField = {
  type: typeof customFieldConst.CLEAR_CUSTOMFIELD;
};
export type ClearCustomFields = {
  type: typeof customFieldConst.CLEAR_CUSTOMFIELDS;
};

export type CustomFieldActions =
  | FetchCustomFieldsRequest
  | FetchCustomFieldsSuccess
  | FetchCustomFieldsFailure
  | FetchCustomFieldRequest
  | FetchCustomFieldSuccess
  | FetchCustomFieldFailure
  | CreateCustomFieldRequest
  | CreateCustomFieldSuccess
  | CreateCustomFieldFailure
  | CreateRangeCustomFieldRequest
  | CreateRangeCustomFieldSuccess
  | CreateRangeCustomFieldFailure
  | UpdateCustomFieldRequest
  | UpdateCustomFieldSuccess
  | UpdateCustomFieldFailure
  | RemoveCustomFieldRequest
  | RemoveCustomFieldSuccess
  | RemoveCustomFieldFailure
  | RemoveRangeCustomFieldRequest
  | RemoveRangeCustomFieldSuccess
  | RemoveRangeCustomFieldFailure
  | SetCustomField
  | SetCustomFields
  | ClearCustomField
  | ClearCustomFields;
