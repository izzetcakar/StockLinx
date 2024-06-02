import { IModel } from "@interfaces/serverInterfaces";
import { modelConst } from "./constant";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

export type ModelState = {
  model: IModel | null;
  models: IModel[];
};
export type ModelRequestPayload = {
  id: string;
};
export type ModelPayload = {
  model: IModel;
};
export type ModelsPayload = {
  models: IModel[];
};
export type ModelRemoveRangePayload = {
  ids: string[];
};
export type ModelRemovePayload = {
  id: string;
};

//GET
export type FetchModelsRequest = {
  type: typeof modelConst.FETCH_MODELS_REQUEST;
};
export type FetchModelsSuccess = {
  type: typeof modelConst.FETCH_MODELS_SUCCESS;
  payload: ModelsPayload;
};
export type FetchModelsFailure = {
  type: typeof modelConst.FETCH_MODELS_FAILURE;
};

//GET:/ID
export type FetchModelRequest = {
  type: typeof modelConst.FETCH_MODEL_REQUEST;
  payload: ModelRequestPayload;
};
export type FetchModelSuccess = {
  type: typeof modelConst.FETCH_MODEL_SUCCESS;
  payload: ModelPayload;
};
export type FetchModelFailure = {
  type: typeof modelConst.FETCH_MODEL_FAILURE;
};

//POST
export type CreateModelRequest = {
  type: typeof modelConst.CREATE_MODEL_REQUEST;
  payload: ModelPayload;
};
export type CreateModelSuccess = {
  type: typeof modelConst.CREATE_MODEL_SUCCESS;
  payload: ModelPayload;
};
export type CreateModelFailure = {
  type: typeof modelConst.CREATE_MODEL_FAILURE;
};

//POST RANGE
export type CreateRangeModelRequest = {
  type: typeof modelConst.CREATE_RANGE_MODEL_REQUEST;
  payload: ModelsPayload;
};
export type CreateRangeModelSuccess = {
  type: typeof modelConst.CREATE_RANGE_MODEL_SUCCESS;
  payload: ModelsPayload;
};
export type CreateRangeModelFailure = {
  type: typeof modelConst.CREATE_RANGE_MODEL_FAILURE;
};

//PUT
export type UpdateModelRequest = {
  type: typeof modelConst.UPDATE_MODEL_REQUEST;
  payload: ModelPayload;
};
export type UpdateModelSuccess = {
  type: typeof modelConst.UPDATE_MODEL_SUCCESS;
};
export type UpdateModelFailure = {
  type: typeof modelConst.UPDATE_MODEL_FAILURE;
};

//REMOVE
export type RemoveModelRequest = {
  type: typeof modelConst.REMOVE_MODEL_REQUEST;
  payload: ModelRemovePayload;
};
export type RemoveModelSuccess = {
  type: typeof modelConst.REMOVE_MODEL_SUCCESS;
  payload: ModelRemovePayload;
};
export type RemoveModelFailure = {
  type: typeof modelConst.REMOVE_MODEL_FAILURE;
};

//REMOVE RANGE
export type RemoveRangeModelRequest = {
  type: typeof modelConst.REMOVE_RANGE_MODEL_REQUEST;
  payload: ModelRemoveRangePayload;
};
export type RemoveRangeModelSuccess = {
  type: typeof modelConst.REMOVE_RANGE_MODEL_SUCCESS;
  payload: ModelRemoveRangePayload;
};
export type RemoveRangeModelFailure = {
  type: typeof modelConst.REMOVE_RANGE_MODEL_FAILURE;
};

//FILTER
export type FilterModelsRequest = {
  type: typeof modelConst.FILTER_MODELS_REQUEST;
  payload: QueryFilter[];
};
export type FilterModelsSuccess = {
  type: typeof modelConst.FILTER_MODELS_SUCCESS;
  payload: ModelsPayload;
};
export type FilterModelsFailure = {
  type: typeof modelConst.FILTER_MODELS_FAILURE;
};

//CLIENT ACTION TYPES
export type SetModel = {
  type: typeof modelConst.SET_MODEL;
  payload: IModel | null;
};
export type SetModels = {
  type: typeof modelConst.SET_MODELS;
  payload: IModel[];
};
export type ClearModel = {
  type: typeof modelConst.CLEAR_MODEL;
};
export type ClearModels = {
  type: typeof modelConst.CLEAR_MODELS;
};

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
  | FilterModelsRequest
  | FilterModelsSuccess
  | FilterModelsFailure
  | SetModel
  | SetModels
  | ClearModel
  | ClearModels;
