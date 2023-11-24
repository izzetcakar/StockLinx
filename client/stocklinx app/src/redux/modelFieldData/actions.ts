import { IModelFieldData } from "../../interfaces/interfaces";
import { modelFieldDataConst } from "./constant";
import {
  CreateModelFieldDataFailure,
  CreateModelFieldDataRequest,
  CreateModelFieldDataSuccess,
  RemoveModelFieldDataFailure,
  RemoveModelFieldDataRequest,
  RemoveModelFieldDataSuccess,
  FetchModelFieldDatasFailure,
  FetchModelFieldDatasRequest,
  FetchModelFieldDatasSuccess,
  FetchModelFieldDataFailure,
  FetchModelFieldDataRequest,
  FetchModelFieldDataSuccess,
  UpdateModelFieldDataFailure,
  UpdateModelFieldDataRequest,
  UpdateModelFieldDataSuccess,
  ModelFieldDataRequestPayload,
  SetModelFieldData,
  SetModelFieldDatas,
  ClearModelFieldData,
  ClearModelFieldDatas,
  ModelFieldDatasPayload,
  ModelFieldDataPayload,
  CreateRangeModelFieldDataRequest,
  CreateRangeModelFieldDataSuccess,
  CreateRangeModelFieldDataFailure,
  RemoveRangeModelFieldDataRequest,
  RemoveRangeModelFieldDataSuccess,
  RemoveRangeModelFieldDataFailure,
  ModelFieldDataRemoveRangePayload,
  ModelFieldDataRemovePayload,
} from "./type";

//GET
const getAll = (): FetchModelFieldDatasRequest => ({
  type: modelFieldDataConst.FETCH_MODELFIELDDATAS_REQUEST,
});
const getAllSuccess = (payload: ModelFieldDatasPayload): FetchModelFieldDatasSuccess => ({
  type: modelFieldDataConst.FETCH_MODELFIELDDATAS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchModelFieldDatasFailure => ({
  type: modelFieldDataConst.FETCH_MODELFIELDDATAS_FAILURE,
});

//GET:/ID
const get = (payload: ModelFieldDataRequestPayload): FetchModelFieldDataRequest => ({
  type: modelFieldDataConst.FETCH_MODELFIELDDATA_REQUEST,
  payload,
});
const getSuccess = (payload: ModelFieldDataPayload): FetchModelFieldDataSuccess => ({
  type: modelFieldDataConst.FETCH_MODELFIELDDATA_SUCCESS,
  payload,
});
const getFailure = (): FetchModelFieldDataFailure => ({
  type: modelFieldDataConst.FETCH_MODELFIELDDATA_FAILURE,
});

//POST
const create = (payload: ModelFieldDataPayload): CreateModelFieldDataRequest => ({
  type: modelFieldDataConst.CREATE_MODELFIELDDATA_REQUEST,
  payload,
});
const createSuccess = (): CreateModelFieldDataSuccess => ({
  type: modelFieldDataConst.CREATE_MODELFIELDDATA_SUCCESS,
});
const createFailure = (): CreateModelFieldDataFailure => ({
  type: modelFieldDataConst.CREATE_MODELFIELDDATA_FAILURE,
});

//POST RANGE
const createRange = (payload: ModelFieldDatasPayload): CreateRangeModelFieldDataRequest => ({
  type: modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_REQUEST,
  payload,
});
const createRangeSuccess = (): CreateRangeModelFieldDataSuccess => ({
  type: modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_SUCCESS,
});
const createRangeFailure = (): CreateRangeModelFieldDataFailure => ({
  type: modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_FAILURE,
});

//PUT
const update = (payload: ModelFieldDataPayload): UpdateModelFieldDataRequest => ({
  type: modelFieldDataConst.UPDATE_MODELFIELDDATA_REQUEST,
  payload,
});
const updateSuccess = (): UpdateModelFieldDataSuccess => ({
  type: modelFieldDataConst.UPDATE_MODELFIELDDATA_SUCCESS,
});
const updateFailure = (): UpdateModelFieldDataFailure => ({
  type: modelFieldDataConst.UPDATE_MODELFIELDDATA_FAILURE,
});

//REMOVE
const remove = (payload: ModelFieldDataRemovePayload): RemoveModelFieldDataRequest => ({
  type: modelFieldDataConst.REMOVE_MODELFIELDDATA_REQUEST,
  payload,
});
const removeSuccess = (
  payload: ModelFieldDataRemovePayload
): RemoveModelFieldDataSuccess => ({
  type: modelFieldDataConst.REMOVE_MODELFIELDDATA_SUCCESS,
  payload,
});
const removeFailure = (): RemoveModelFieldDataFailure => ({
  type: modelFieldDataConst.REMOVE_MODELFIELDDATA_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: ModelFieldDataRemoveRangePayload
): RemoveRangeModelFieldDataRequest => ({
  type: modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: ModelFieldDataRemoveRangePayload
): RemoveRangeModelFieldDataSuccess => ({
  type: modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeModelFieldDataFailure => ({
  type: modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_FAILURE,
});

//CLIENT ACTIONS
const setModelFieldData = (payload: IModelFieldData | null): SetModelFieldData => ({
  type: modelFieldDataConst.SET_MODELFIELDDATA,
  payload,
});
const clearModelFieldData = (): ClearModelFieldData => ({
  type: modelFieldDataConst.CLEAR_MODELFIELDDATA,
});
const setModelFieldDatas = (payload: IModelFieldData[]): SetModelFieldDatas => ({
  type: modelFieldDataConst.SET_MODELFIELDDATAS,
  payload,
});
const clearModelFieldDatas = (): ClearModelFieldDatas => ({
  type: modelFieldDataConst.CLEAR_MODELFIELDDATAS,
});

export const modelFieldDataActions = {
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
  setModelFieldData,
  clearModelFieldData,
  setModelFieldDatas,
  clearModelFieldDatas,
};
