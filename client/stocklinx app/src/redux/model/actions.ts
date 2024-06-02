import { IModel } from "@interfaces/serverInterfaces";
import { modelConst } from "./constant";
import {
  CreateModelFailure,
  CreateModelRequest,
  CreateModelSuccess,
  RemoveModelFailure,
  RemoveModelRequest,
  RemoveModelSuccess,
  FetchModelsFailure,
  FetchModelsRequest,
  FetchModelsSuccess,
  FetchModelFailure,
  FetchModelRequest,
  FetchModelSuccess,
  UpdateModelFailure,
  UpdateModelRequest,
  UpdateModelSuccess,
  ModelRequestPayload,
  SetModel,
  SetModels,
  ClearModel,
  ClearModels,
  ModelsPayload,
  ModelPayload,
  CreateRangeModelRequest,
  CreateRangeModelSuccess,
  CreateRangeModelFailure,
  RemoveRangeModelRequest,
  RemoveRangeModelSuccess,
  RemoveRangeModelFailure,
  ModelRemoveRangePayload,
  ModelRemovePayload,
  FilterModelsRequest,
  FilterModelsSuccess,
  FilterModelsFailure,
} from "./type";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

//GET
const getAll = (): FetchModelsRequest => ({
  type: modelConst.FETCH_MODELS_REQUEST,
});
const getAllSuccess = (payload: ModelsPayload): FetchModelsSuccess => ({
  type: modelConst.FETCH_MODELS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchModelsFailure => ({
  type: modelConst.FETCH_MODELS_FAILURE,
});

//GET:/ID
const get = (payload: ModelRequestPayload): FetchModelRequest => ({
  type: modelConst.FETCH_MODEL_REQUEST,
  payload,
});
const getSuccess = (payload: ModelPayload): FetchModelSuccess => ({
  type: modelConst.FETCH_MODEL_SUCCESS,
  payload,
});
const getFailure = (): FetchModelFailure => ({
  type: modelConst.FETCH_MODEL_FAILURE,
});

//POST
const create = (payload: ModelPayload): CreateModelRequest => ({
  type: modelConst.CREATE_MODEL_REQUEST,
  payload,
});
const createSuccess = (payload: ModelPayload): CreateModelSuccess => ({
  type: modelConst.CREATE_MODEL_SUCCESS,
  payload,
});
const createFailure = (): CreateModelFailure => ({
  type: modelConst.CREATE_MODEL_FAILURE,
});

//POST RANGE
const createRange = (payload: ModelsPayload): CreateRangeModelRequest => ({
  type: modelConst.CREATE_RANGE_MODEL_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: ModelsPayload
): CreateRangeModelSuccess => ({
  type: modelConst.CREATE_RANGE_MODEL_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeModelFailure => ({
  type: modelConst.CREATE_RANGE_MODEL_FAILURE,
});

//PUT
const update = (payload: ModelPayload): UpdateModelRequest => ({
  type: modelConst.UPDATE_MODEL_REQUEST,
  payload,
});
const updateSuccess = (): UpdateModelSuccess => ({
  type: modelConst.UPDATE_MODEL_SUCCESS,
});
const updateFailure = (): UpdateModelFailure => ({
  type: modelConst.UPDATE_MODEL_FAILURE,
});

//REMOVE
const remove = (payload: ModelRemovePayload): RemoveModelRequest => ({
  type: modelConst.REMOVE_MODEL_REQUEST,
  payload,
});
const removeSuccess = (payload: ModelRemovePayload): RemoveModelSuccess => ({
  type: modelConst.REMOVE_MODEL_SUCCESS,
  payload,
});
const removeFailure = (): RemoveModelFailure => ({
  type: modelConst.REMOVE_MODEL_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: ModelRemoveRangePayload
): RemoveRangeModelRequest => ({
  type: modelConst.REMOVE_RANGE_MODEL_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: ModelRemoveRangePayload
): RemoveRangeModelSuccess => ({
  type: modelConst.REMOVE_RANGE_MODEL_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeModelFailure => ({
  type: modelConst.REMOVE_RANGE_MODEL_FAILURE,
});

//FILTER
const filter = (payload: QueryFilter[]): FilterModelsRequest => ({
  type: modelConst.FILTER_MODELS_REQUEST,
  payload,
});
const filterSuccess = (payload: ModelsPayload): FilterModelsSuccess => ({
  type: modelConst.FILTER_MODELS_SUCCESS,
  payload,
});
const filterFailure = (): FilterModelsFailure => ({
  type: modelConst.FILTER_MODELS_FAILURE,
});

//CLIENT ACTIONS
const setModel = (payload: IModel | null): SetModel => ({
  type: modelConst.SET_MODEL,
  payload,
});
const clearModel = (): ClearModel => ({
  type: modelConst.CLEAR_MODEL,
});
const setModels = (payload: IModel[]): SetModels => ({
  type: modelConst.SET_MODELS,
  payload,
});
const clearModels = (): ClearModels => ({
  type: modelConst.CLEAR_MODELS,
});

export const modelActions = {
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
  filter,
  filterSuccess,
  filterFailure,
  setModel,
  clearModel,
  setModels,
  clearModels,
};
