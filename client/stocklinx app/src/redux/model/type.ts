import { IModel, SelectData } from "../../interfaces/interfaces";
import { modelConst } from "./constant";

export interface ModelState {
  model: IModel | null;
  models: IModel[];
  selectData: SelectData[];
}

export interface ModelSucccessPayload {
  model: IModel;
}
export interface ModelsSucccessPayload {
  models: IModel[];
}
export interface ModelRequestPayload {
  id: string;
}
export interface UpdateModelRequestPayload {
  model: IModel;
}

//GET
export interface FetchModelsRequest {
  type: typeof modelConst.FETCH_MODELS_REQUEST;
}
export type FetchModelsSuccess = {
  type: typeof modelConst.FETCH_MODELS_SUCCESS;
  payload: ModelsSucccessPayload;
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
  payload: ModelSucccessPayload;
};
export type FetchModelFailure = {
  type: typeof modelConst.FETCH_MODEL_FAILURE;
};
//POST
export interface CreateModelRequest {
  type: typeof modelConst.CREATE_MODEL_REQUEST;
  payload: UpdateModelRequestPayload;
}
export type CreateModelSuccess = {
  type: typeof modelConst.CREATE_MODEL_SUCCESS;
};
export type CreateModelFailure = {
  type: typeof modelConst.CREATE_MODEL_FAILURE;
};
//PUT
export interface UpdateModelRequest {
  type: typeof modelConst.UPDATE_MODEL_REQUEST;
  payload: UpdateModelRequestPayload;
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
  payload: ModelRequestPayload;
}
export type RemoveModelSuccess = {
  type: typeof modelConst.REMOVE_MODEL_SUCCESS;
};
export type RemoveModelFailure = {
  type: typeof modelConst.REMOVE_MODEL_FAILURE;
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
  | UpdateModelRequest
  | UpdateModelSuccess
  | UpdateModelFailure
  | RemoveModelRequest
  | RemoveModelSuccess
  | RemoveModelFailure
  | SetModel
  | SetModels
  | ClearModel
  | ClearModels;
