import { ICustomField } from "../../interfaces/serverInterfaces";
import { customFieldConst } from "./constant";
import {
  CreateCustomFieldFailure,
  CreateCustomFieldRequest,
  CreateCustomFieldSuccess,
  RemoveCustomFieldFailure,
  RemoveCustomFieldRequest,
  RemoveCustomFieldSuccess,
  FetchCustomFieldsFailure,
  FetchCustomFieldsRequest,
  FetchCustomFieldsSuccess,
  FetchCustomFieldFailure,
  FetchCustomFieldRequest,
  FetchCustomFieldSuccess,
  UpdateCustomFieldFailure,
  UpdateCustomFieldRequest,
  UpdateCustomFieldSuccess,
  CustomFieldRequestPayload,
  SetCustomField,
  SetCustomFields,
  ClearCustomField,
  ClearCustomFields,
  CustomFieldsPayload,
  CustomFieldPayload,
  CreateRangeCustomFieldRequest,
  CreateRangeCustomFieldSuccess,
  CreateRangeCustomFieldFailure,
  RemoveRangeCustomFieldRequest,
  RemoveRangeCustomFieldSuccess,
  RemoveRangeCustomFieldFailure,
  CustomFieldRemoveRangePayload,
  CustomFieldRemovePayload,
} from "./type";

//GET
const getAll = (): FetchCustomFieldsRequest => ({
  type: customFieldConst.FETCH_CUSTOMFIELDS_REQUEST,
});
const getAllSuccess = (
  payload: CustomFieldsPayload
): FetchCustomFieldsSuccess => ({
  type: customFieldConst.FETCH_CUSTOMFIELDS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchCustomFieldsFailure => ({
  type: customFieldConst.FETCH_CUSTOMFIELDS_FAILURE,
});

//GET:/ID
const get = (payload: CustomFieldRequestPayload): FetchCustomFieldRequest => ({
  type: customFieldConst.FETCH_CUSTOMFIELD_REQUEST,
  payload,
});
const getSuccess = (payload: CustomFieldPayload): FetchCustomFieldSuccess => ({
  type: customFieldConst.FETCH_CUSTOMFIELD_SUCCESS,
  payload,
});
const getFailure = (): FetchCustomFieldFailure => ({
  type: customFieldConst.FETCH_CUSTOMFIELD_FAILURE,
});

//POST
const create = (payload: CustomFieldPayload): CreateCustomFieldRequest => ({
  type: customFieldConst.CREATE_CUSTOMFIELD_REQUEST,
  payload,
});
const createSuccess = (
  payload: CustomFieldPayload
): CreateCustomFieldSuccess => ({
  type: customFieldConst.CREATE_CUSTOMFIELD_SUCCESS,
  payload,
});
const createFailure = (): CreateCustomFieldFailure => ({
  type: customFieldConst.CREATE_CUSTOMFIELD_FAILURE,
});

//POST RANGE
const createRange = (
  payload: CustomFieldsPayload
): CreateRangeCustomFieldRequest => ({
  type: customFieldConst.CREATE_RANGE_CUSTOMFIELD_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: CustomFieldsPayload
): CreateRangeCustomFieldSuccess => ({
  type: customFieldConst.CREATE_RANGE_CUSTOMFIELD_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeCustomFieldFailure => ({
  type: customFieldConst.CREATE_RANGE_CUSTOMFIELD_FAILURE,
});

//PUT
const update = (payload: CustomFieldPayload): UpdateCustomFieldRequest => ({
  type: customFieldConst.UPDATE_CUSTOMFIELD_REQUEST,
  payload,
});
const updateSuccess = (
  payload: CustomFieldPayload
): UpdateCustomFieldSuccess => ({
  type: customFieldConst.UPDATE_CUSTOMFIELD_SUCCESS,
  payload,
});
const updateFailure = (): UpdateCustomFieldFailure => ({
  type: customFieldConst.UPDATE_CUSTOMFIELD_FAILURE,
});

//REMOVE
const remove = (
  payload: CustomFieldRemovePayload
): RemoveCustomFieldRequest => ({
  type: customFieldConst.REMOVE_CUSTOMFIELD_REQUEST,
  payload,
});
const removeSuccess = (
  payload: CustomFieldRemovePayload
): RemoveCustomFieldSuccess => ({
  type: customFieldConst.REMOVE_CUSTOMFIELD_SUCCESS,
  payload,
});
const removeFailure = (): RemoveCustomFieldFailure => ({
  type: customFieldConst.REMOVE_CUSTOMFIELD_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: CustomFieldRemoveRangePayload
): RemoveRangeCustomFieldRequest => ({
  type: customFieldConst.REMOVE_RANGE_CUSTOMFIELD_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: CustomFieldRemoveRangePayload
): RemoveRangeCustomFieldSuccess => ({
  type: customFieldConst.REMOVE_RANGE_CUSTOMFIELD_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeCustomFieldFailure => ({
  type: customFieldConst.REMOVE_RANGE_CUSTOMFIELD_FAILURE,
});

//CLIENT ACTIONS
const setCustomField = (payload: ICustomField | null): SetCustomField => ({
  type: customFieldConst.SET_CUSTOMFIELD,
  payload,
});
const clearCustomField = (): ClearCustomField => ({
  type: customFieldConst.CLEAR_CUSTOMFIELD,
});
const setCustomFields = (payload: ICustomField[]): SetCustomFields => ({
  type: customFieldConst.SET_CUSTOMFIELDS,
  payload,
});
const clearCustomFields = (): ClearCustomFields => ({
  type: customFieldConst.CLEAR_CUSTOMFIELDS,
});

export const customFieldActions = {
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
  setCustomField,
  clearCustomField,
  setCustomFields,
  clearCustomFields,
};
