import { IFieldSetCustomField } from "../../interfaces/serverInterfaces";
import { fieldSetCustomFieldConst } from "./constant";
import {
  CreateFieldSetCustomFieldFailure,
  CreateFieldSetCustomFieldRequest,
  CreateFieldSetCustomFieldSuccess,
  RemoveFieldSetCustomFieldFailure,
  RemoveFieldSetCustomFieldRequest,
  RemoveFieldSetCustomFieldSuccess,
  FetchFieldSetCustomFieldsFailure,
  FetchFieldSetCustomFieldsRequest,
  FetchFieldSetCustomFieldsSuccess,
  FetchFieldSetCustomFieldFailure,
  FetchFieldSetCustomFieldRequest,
  FetchFieldSetCustomFieldSuccess,
  UpdateFieldSetCustomFieldFailure,
  UpdateFieldSetCustomFieldRequest,
  UpdateFieldSetCustomFieldSuccess,
  FieldSetCustomFieldRequestPayload,
  SetFieldSetCustomField,
  SetFieldSetCustomFields,
  ClearFieldSetCustomField,
  ClearFieldSetCustomFields,
  FieldSetCustomFieldsPayload,
  FieldSetCustomFieldPayload,
  CreateRangeFieldSetCustomFieldRequest,
  CreateRangeFieldSetCustomFieldSuccess,
  CreateRangeFieldSetCustomFieldFailure,
  RemoveRangeFieldSetCustomFieldRequest,
  RemoveRangeFieldSetCustomFieldSuccess,
  RemoveRangeFieldSetCustomFieldFailure,
  FieldSetCustomFieldRemoveRangePayload,
  FieldSetCustomFieldRemovePayload,
  SynchronizeFieldSetCustomFieldRequest,
  SynchronizeFieldSetCustomFieldSuccess,
  SynchronizeFieldSetCustomFieldFailure,
} from "./type";

//GET
const getAll = (): FetchFieldSetCustomFieldsRequest => ({
  type: fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_REQUEST,
});
const getAllSuccess = (
  payload: FieldSetCustomFieldsPayload
): FetchFieldSetCustomFieldsSuccess => ({
  type: fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchFieldSetCustomFieldsFailure => ({
  type: fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_FAILURE,
});

//GET:/ID
const get = (
  payload: FieldSetCustomFieldRequestPayload
): FetchFieldSetCustomFieldRequest => ({
  type: fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_REQUEST,
  payload,
});
const getSuccess = (
  payload: FieldSetCustomFieldPayload
): FetchFieldSetCustomFieldSuccess => ({
  type: fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_SUCCESS,
  payload,
});
const getFailure = (): FetchFieldSetCustomFieldFailure => ({
  type: fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_FAILURE,
});

//POST
const create = (
  payload: FieldSetCustomFieldPayload
): CreateFieldSetCustomFieldRequest => ({
  type: fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_REQUEST,
  payload,
});
const createSuccess = (
  payload: FieldSetCustomFieldPayload
): CreateFieldSetCustomFieldSuccess => ({
  type: fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_SUCCESS,
  payload,
});
const createFailure = (): CreateFieldSetCustomFieldFailure => ({
  type: fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_FAILURE,
});

//POST RANGE
const createRange = (
  payload: FieldSetCustomFieldsPayload
): CreateRangeFieldSetCustomFieldRequest => ({
  type: fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: FieldSetCustomFieldsPayload
): CreateRangeFieldSetCustomFieldSuccess => ({
  type: fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeFieldSetCustomFieldFailure => ({
  type: fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_FAILURE,
});

//POST SYNCHRONIZE
const synchronize = (
  payload: FieldSetCustomFieldsPayload
): SynchronizeFieldSetCustomFieldRequest => ({
  type: fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_REQUEST,
  payload,
});
const synchronizeSuccess = (): SynchronizeFieldSetCustomFieldSuccess => ({
  type: fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_SUCCESS,
});
const synchronizeFailure = (): SynchronizeFieldSetCustomFieldFailure => ({
  type: fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_FAILURE,
});

//PUT
const update = (
  payload: FieldSetCustomFieldPayload
): UpdateFieldSetCustomFieldRequest => ({
  type: fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_REQUEST,
  payload,
});
const updateSuccess = (
  payload: FieldSetCustomFieldPayload
): UpdateFieldSetCustomFieldSuccess => ({
  type: fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_SUCCESS,
  payload,
});
const updateFailure = (): UpdateFieldSetCustomFieldFailure => ({
  type: fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_FAILURE,
});

//REMOVE
const remove = (
  payload: FieldSetCustomFieldRemovePayload
): RemoveFieldSetCustomFieldRequest => ({
  type: fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_REQUEST,
  payload,
});
const removeSuccess = (
  payload: FieldSetCustomFieldRemovePayload
): RemoveFieldSetCustomFieldSuccess => ({
  type: fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_SUCCESS,
  payload,
});
const removeFailure = (): RemoveFieldSetCustomFieldFailure => ({
  type: fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: FieldSetCustomFieldRemoveRangePayload
): RemoveRangeFieldSetCustomFieldRequest => ({
  type: fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: FieldSetCustomFieldRemoveRangePayload
): RemoveRangeFieldSetCustomFieldSuccess => ({
  type: fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeFieldSetCustomFieldFailure => ({
  type: fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_FAILURE,
});

//CLIENT ACTIONS
const setFieldSetCustomField = (
  payload: IFieldSetCustomField | null
): SetFieldSetCustomField => ({
  type: fieldSetCustomFieldConst.SET_FIELDSETCUSTOMFIELD,
  payload,
});
const clearFieldSetCustomField = (): ClearFieldSetCustomField => ({
  type: fieldSetCustomFieldConst.CLEAR_FIELDSETCUSTOMFIELD,
});
const setFieldSetCustomFields = (
  payload: IFieldSetCustomField[]
): SetFieldSetCustomFields => ({
  type: fieldSetCustomFieldConst.SET_FIELDSETCUSTOMFIELDS,
  payload,
});
const clearFieldSetCustomFields = (): ClearFieldSetCustomFields => ({
  type: fieldSetCustomFieldConst.CLEAR_FIELDSETCUSTOMFIELDS,
});

export const fieldSetCustomFieldActions = {
  getAll,
  getAllSuccess,
  getAllFailure,
  get,
  getSuccess,
  getFailure,
  create,
  createSuccess,
  createFailure,
  synchronize,
  synchronizeSuccess,
  synchronizeFailure,
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
  setFieldSetCustomField,
  clearFieldSetCustomField,
  setFieldSetCustomFields,
  clearFieldSetCustomFields,
};
