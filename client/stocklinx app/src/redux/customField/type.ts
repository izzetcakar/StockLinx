import { ICustomField } from "../../interfaces/serverInterfaces";
import { customFieldConst } from "./constant";

export interface CustomFieldState {
  customField: ICustomField | null;
  customFields: ICustomField[];
}
export interface CustomFieldRequestPayload {
  id: string;
}
export interface CustomFieldPayload {
  customField: ICustomField;
}
export interface CustomFieldsPayload {
  customFields: ICustomField[];
}
export interface CustomFieldRemoveRangePayload {
  ids: string[];
}
export interface CustomFieldRemovePayload {
  id: string;
}

//GET
export interface FetchCustomFieldsRequest {
  type: typeof customFieldConst.FETCH_CUSTOMFIELDS_REQUEST;
}
export type FetchCustomFieldsSuccess = {
  type: typeof customFieldConst.FETCH_CUSTOMFIELDS_SUCCESS;
  payload: CustomFieldsPayload;
};
export type FetchCustomFieldsFailure = {
  type: typeof customFieldConst.FETCH_CUSTOMFIELDS_FAILURE;
};
//GET:/ID
export interface FetchCustomFieldRequest {
  type: typeof customFieldConst.FETCH_CUSTOMFIELD_REQUEST;
  payload: CustomFieldRequestPayload;
}
export type FetchCustomFieldSuccess = {
  type: typeof customFieldConst.FETCH_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldPayload;
};
export type FetchCustomFieldFailure = {
  type: typeof customFieldConst.FETCH_CUSTOMFIELD_FAILURE;
};
//POST
export interface CreateCustomFieldRequest {
  type: typeof customFieldConst.CREATE_CUSTOMFIELD_REQUEST;
  payload: CustomFieldPayload;
}
export type CreateCustomFieldSuccess = {
  type: typeof customFieldConst.CREATE_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldPayload;
};
export type CreateCustomFieldFailure = {
  type: typeof customFieldConst.CREATE_CUSTOMFIELD_FAILURE;
};
//POST RANGE
export interface CreateRangeCustomFieldRequest {
  type: typeof customFieldConst.CREATE_RANGE_CUSTOMFIELD_REQUEST;
  payload: CustomFieldsPayload;
}
export type CreateRangeCustomFieldSuccess = {
  type: typeof customFieldConst.CREATE_RANGE_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldsPayload;
};
export type CreateRangeCustomFieldFailure = {
  type: typeof customFieldConst.CREATE_RANGE_CUSTOMFIELD_FAILURE;
};
//PUT
export interface UpdateCustomFieldRequest {
  type: typeof customFieldConst.UPDATE_CUSTOMFIELD_REQUEST;
  payload: CustomFieldPayload;
}
export type UpdateCustomFieldSuccess = {
  type: typeof customFieldConst.UPDATE_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldPayload;
};
export type UpdateCustomFieldFailure = {
  type: typeof customFieldConst.UPDATE_CUSTOMFIELD_FAILURE;
};
//REMOVE
export interface RemoveCustomFieldRequest {
  type: typeof customFieldConst.REMOVE_CUSTOMFIELD_REQUEST;
  payload: CustomFieldRemovePayload;
}
export type RemoveCustomFieldSuccess = {
  type: typeof customFieldConst.REMOVE_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldRemovePayload;
};
export type RemoveCustomFieldFailure = {
  type: typeof customFieldConst.REMOVE_CUSTOMFIELD_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeCustomFieldRequest {
  type: typeof customFieldConst.REMOVE_RANGE_CUSTOMFIELD_REQUEST;
  payload: CustomFieldRemoveRangePayload;
}
export type RemoveRangeCustomFieldSuccess = {
  type: typeof customFieldConst.REMOVE_RANGE_CUSTOMFIELD_SUCCESS;
  payload: CustomFieldRemoveRangePayload;
};
export type RemoveRangeCustomFieldFailure = {
  type: typeof customFieldConst.REMOVE_RANGE_CUSTOMFIELD_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetCustomField {
  type: typeof customFieldConst.SET_CUSTOMFIELD;
  payload: ICustomField | null;
}
export interface SetCustomFields {
  type: typeof customFieldConst.SET_CUSTOMFIELDS;
  payload: ICustomField[];
}
export interface ClearCustomField {
  type: typeof customFieldConst.CLEAR_CUSTOMFIELD;
}
export interface ClearCustomFields {
  type: typeof customFieldConst.CLEAR_CUSTOMFIELDS;
}

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
