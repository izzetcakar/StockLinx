import { IModel } from "../../interfaces/interfaces";
import { modelConst } from "./constant";

export interface ModelState {
  model: IModel | null;
  models: IModel[];
}
export interface ModelRequestPayload {
  id: string;
}
export interface ModelPayload {
  model: IModel;
}
export interface ModelsPayload {
  models: IModel[];
}
export interface ModelRemoveRangePayload {
  ids: string[];
}
export interface ModelRemovePayload {
  id: string;
}

//GET
export interface FetchModelsRequest {
  type: typeof modelConst.FETCH_MODELS_REQUEST;
}
export type FetchModelsSuccess = {
  type: typeof modelConst.FETCH_MODELS_SUCCESS;
  payload: ModelsPayload;
};
export type FetchModelsFailure = {
  type: typeof modelConst.FETCH_MODELS_FAILURE;
};
//GET:/ID
export interface FetchModelRequest {
  type: typeof modelConst.FETCH_MODEL_REQUEST;
  payload: ModelRequestPayload;
}
export type FetchModelSuccess = {
  type: typeof modelConst.FETCH_MODEL_SUCCESS;
  payload: ModelPayload;
};
export type FetchModelFailure = {
  type: typeof modelConst.FETCH_MODEL_FAILURE;
};
//POST
export interface CreateModelRequest {
  type: typeof modelConst.CREATE_MODEL_REQUEST;
  payload: ModelPayload;
}
export type CreateModelSuccess = {
  type: typeof modelConst.CREATE_MODEL_SUCCESS;
  payload: ModelPayload;
};
export type CreateModelFailure = {
  type: typeof modelConst.CREATE_MODEL_FAILURE;
};
//POST RANGE
export interface CreateRangeModelRequest {
  type: typeof modelConst.CREATE_RANGE_MODEL_REQUEST;
  payload: ModelsPayload;
}
export type CreateRangeModelSuccess = {
  type: typeof modelConst.CREATE_RANGE_MODEL_SUCCESS;
  payload: ModelsPayload;
};
export type CreateRangeModelFailure = {
  type: typeof modelConst.CREATE_RANGE_MODEL_FAILURE;
};
//PUT
export interface UpdateModelRequest {
  type: typeof modelConst.UPDATE_MODEL_REQUEST;
  payload: ModelPayload;
}
export type UpdateModelSuccess = {
  type: typeof modelConst.UPDATE_MODEL_SUCCESS;
};
export type UpdateModelFailure = {
  type: typeof modelConst.UPDATE_MODEL_FAILURE;
};
//REMOVE
export interface RemoveModelRequest {
  type: typeof modelConst.REMOVE_MODEL_REQUEST;
  payload: ModelRemovePayload;
}
export type RemoveModelSuccess = {
  type: typeof modelConst.REMOVE_MODEL_SUCCESS;
  payload: ModelRemovePayload;
};
export type RemoveModelFailure = {
  type: typeof modelConst.REMOVE_MODEL_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeModelRequest {
  type: typeof modelConst.REMOVE_RANGE_MODEL_REQUEST;
  payload: ModelRemoveRangePayload;
}
export type RemoveRangeModelSuccess = {
  type: typeof modelConst.REMOVE_RANGE_MODEL_SUCCESS;
  payload: ModelRemoveRangePayload;
};
export type RemoveRangeModelFailure = {
  type: typeof modelConst.REMOVE_RANGE_MODEL_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetModel {
  type: typeof modelConst.SET_MODEL;
  payload: IModel | null;
}
export interface SetModels {
  type: typeof modelConst.SET_MODELS;
  payload: IModel[];
}
export interface ClearModel {
  type: typeof modelConst.CLEAR_MODEL;
}
export interface ClearModels {
  type: typeof modelConst.CLEAR_MODELS;
}

export type ModelActions =
  | FetchModelsRequest
  | FetchModelsSuccess
  | FetchModelsFailure
  | FetchModelRequest
  | FetchModelSuccess
  | FetchModelFailure
  | CreateModelRequest
  | CreateModelSuccess
  | CreateModelFailure
  | CreateRangeModelRequest
  | CreateRangeModelSuccess
  | CreateRangeModelFailure
  | UpdateModelRequest
  | UpdateModelSuccess
  | UpdateModelFailure
  | RemoveModelRequest
  | RemoveModelSuccess
  | RemoveModelFailure
  | RemoveRangeModelRequest
  | RemoveRangeModelSuccess
  | RemoveRangeModelFailure
  | SetModel
  | SetModels
  | ClearModel
  | ClearModels;
