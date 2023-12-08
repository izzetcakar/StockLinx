import { IFieldSet } from "../../interfaces/interfaces";
import { fieldSetConst } from "./constant";
import {
  CreateFieldSetFailure,
  CreateFieldSetRequest,
  CreateFieldSetSuccess,
  RemoveFieldSetFailure,
  RemoveFieldSetRequest,
  RemoveFieldSetSuccess,
  FetchFieldSetsFailure,
  FetchFieldSetsRequest,
  FetchFieldSetsSuccess,
  FetchFieldSetFailure,
  FetchFieldSetRequest,
  FetchFieldSetSuccess,
  UpdateFieldSetFailure,
  UpdateFieldSetRequest,
  UpdateFieldSetSuccess,
  FieldSetRequestPayload,
  SetFieldSet,
  SetFieldSets,
  ClearFieldSet,
  ClearFieldSets,
  FieldSetsPayload,
  FieldSetPayload,
  CreateRangeFieldSetRequest,
  CreateRangeFieldSetSuccess,
  CreateRangeFieldSetFailure,
  RemoveRangeFieldSetRequest,
  RemoveRangeFieldSetSuccess,
  RemoveRangeFieldSetFailure,
  FieldSetRemoveRangePayload,
  FieldSetRemovePayload,
} from "./type";

//GET
const getAll = (): FetchFieldSetsRequest => ({
  type: fieldSetConst.FETCH_FIELDSETS_REQUEST,
});
const getAllSuccess = (payload: FieldSetsPayload): FetchFieldSetsSuccess => ({
  type: fieldSetConst.FETCH_FIELDSETS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchFieldSetsFailure => ({
  type: fieldSetConst.FETCH_FIELDSETS_FAILURE,
});

//GET:/ID
const get = (payload: FieldSetRequestPayload): FetchFieldSetRequest => ({
  type: fieldSetConst.FETCH_FIELDSET_REQUEST,
  payload,
});
const getSuccess = (payload: FieldSetPayload): FetchFieldSetSuccess => ({
  type: fieldSetConst.FETCH_FIELDSET_SUCCESS,
  payload,
});
const getFailure = (): FetchFieldSetFailure => ({
  type: fieldSetConst.FETCH_FIELDSET_FAILURE,
});

//POST
const create = (payload: FieldSetPayload): CreateFieldSetRequest => ({
  type: fieldSetConst.CREATE_FIELDSET_REQUEST,
  payload,
});
const createSuccess = (payload: FieldSetPayload): CreateFieldSetSuccess => ({
  type: fieldSetConst.CREATE_FIELDSET_SUCCESS,
  payload,
});
const createFailure = (): CreateFieldSetFailure => ({
  type: fieldSetConst.CREATE_FIELDSET_FAILURE,
});

//POST RANGE
const createRange = (
  payload: FieldSetsPayload
): CreateRangeFieldSetRequest => ({
  type: fieldSetConst.CREATE_RANGE_FIELDSET_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: FieldSetsPayload
): CreateRangeFieldSetSuccess => ({
  type: fieldSetConst.CREATE_RANGE_FIELDSET_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeFieldSetFailure => ({
  type: fieldSetConst.CREATE_RANGE_FIELDSET_FAILURE,
});

//PUT
const update = (payload: FieldSetPayload): UpdateFieldSetRequest => ({
  type: fieldSetConst.UPDATE_FIELDSET_REQUEST,
  payload,
});
const updateSuccess = (payload: FieldSetPayload): UpdateFieldSetSuccess => ({
  type: fieldSetConst.UPDATE_FIELDSET_SUCCESS,
  payload,
});
const updateFailure = (): UpdateFieldSetFailure => ({
  type: fieldSetConst.UPDATE_FIELDSET_FAILURE,
});

//REMOVE
const remove = (payload: FieldSetRemovePayload): RemoveFieldSetRequest => ({
  type: fieldSetConst.REMOVE_FIELDSET_REQUEST,
  payload,
});
const removeSuccess = (
  payload: FieldSetRemovePayload
): RemoveFieldSetSuccess => ({
  type: fieldSetConst.REMOVE_FIELDSET_SUCCESS,
  payload,
});
const removeFailure = (): RemoveFieldSetFailure => ({
  type: fieldSetConst.REMOVE_FIELDSET_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: FieldSetRemoveRangePayload
): RemoveRangeFieldSetRequest => ({
  type: fieldSetConst.REMOVE_RANGE_FIELDSET_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: FieldSetRemoveRangePayload
): RemoveRangeFieldSetSuccess => ({
  type: fieldSetConst.REMOVE_RANGE_FIELDSET_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeFieldSetFailure => ({
  type: fieldSetConst.REMOVE_RANGE_FIELDSET_FAILURE,
});

//CLIENT ACTIONS
const setFieldSet = (payload: IFieldSet | null): SetFieldSet => ({
  type: fieldSetConst.SET_FIELDSET,
  payload,
});
const clearFieldSet = (): ClearFieldSet => ({
  type: fieldSetConst.CLEAR_FIELDSET,
});
const setFieldSets = (payload: IFieldSet[]): SetFieldSets => ({
  type: fieldSetConst.SET_FIELDSETS,
  payload,
});
const clearFieldSets = (): ClearFieldSets => ({
  type: fieldSetConst.CLEAR_FIELDSETS,
});

export const fieldSetActions = {
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
  setFieldSet,
  clearFieldSet,
  setFieldSets,
  clearFieldSets,
};
