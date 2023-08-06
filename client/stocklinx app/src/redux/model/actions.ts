import { IModel } from "../../interfaces/interfaces";
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
  ModelsSucccessPayload,
  FetchModelsSuccess,
  FetchModelFailure,
  ModelFailurePayload,
  FetchModelRequest,
  FetchModelSuccess,
  UpdateModelFailure,
  UpdateModelRequest,
  UpdateModelSuccess,
  ModelRequestPayload,
  UpdateModelRequestPayload,
  ModelSucccessPayload,
  SetModel,
  SetModels,
  ClearModel,
  ClearModels,
} from "./type";

//GET
const getAll = (): FetchModelsRequest => ({
  type: modelConst.FETCH_MODELS_REQUEST,
});
const getAllSuccess = (payload: ModelsSucccessPayload): FetchModelsSuccess => ({
  type: modelConst.FETCH_MODELS_SUCCESS,
  payload,
});
const getAllFailure = (payload: ModelFailurePayload): FetchModelsFailure => ({
  type: modelConst.FETCH_MODELS_FAILURE,
  payload,
});

//GET:/ID
const get = (payload: ModelRequestPayload): FetchModelRequest => ({
  type: modelConst.FETCH_MODEL_REQUEST,
  payload,
});
const getSuccess = (payload: ModelSucccessPayload): FetchModelSuccess => ({
  type: modelConst.FETCH_MODEL_SUCCESS,
  payload,
});
const getFailure = (payload: ModelFailurePayload): FetchModelFailure => ({
  type: modelConst.FETCH_MODEL_FAILURE,
  payload,
});

//POST
const create = (payload: UpdateModelRequestPayload): CreateModelRequest => ({
  type: modelConst.CREATE_MODEL_REQUEST,
  payload,
});
const createSuccess = (): CreateModelSuccess => ({
  type: modelConst.CREATE_MODEL_SUCCESS,
});
const createFailure = (payload: ModelFailurePayload): CreateModelFailure => ({
  type: modelConst.CREATE_MODEL_FAILURE,
  payload,
});

//PUT
const update = (payload: UpdateModelRequestPayload): UpdateModelRequest => ({
  type: modelConst.UPDATE_MODEL_REQUEST,
  payload,
});
const updateSuccess = (): UpdateModelSuccess => ({
  type: modelConst.UPDATE_MODEL_SUCCESS,
});
const updateFailure = (payload: ModelFailurePayload): UpdateModelFailure => ({
  type: modelConst.UPDATE_MODEL_FAILURE,
  payload,
});

//REMOVE
const remove = (payload: ModelRequestPayload): RemoveModelRequest => ({
  type: modelConst.REMOVE_MODEL_REQUEST,
  payload,
});
const removeSuccess = (): RemoveModelSuccess => ({
  type: modelConst.REMOVE_MODEL_SUCCESS,
});
const removeFailure = (payload: ModelFailurePayload): RemoveModelFailure => ({
  type: modelConst.REMOVE_MODEL_FAILURE,
  payload,
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
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setModel,
  clearModel,
  setModels,
  clearModels,
};
