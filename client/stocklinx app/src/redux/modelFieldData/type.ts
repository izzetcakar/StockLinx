import { IModelFieldData } from "../../interfaces/interfaces";
import { modelFieldDataConst } from "./constant";

export interface ModelFieldDataState {
  modelFieldData: IModelFieldData | null;
  modelFieldDatas: IModelFieldData[];
}
export interface ModelFieldDataRequestPayload {
  id: string;
}
export interface ModelFieldDataPayload {
  modelFieldData: IModelFieldData;
}
export interface ModelFieldDatasPayload {
  modelFieldDatas: IModelFieldData[];
}
export interface ModelFieldDataRemoveRangePayload {
  ids: string[];
}
export interface ModelFieldDataRemovePayload {
  id: string;
}

//GET
export interface FetchModelFieldDatasRequest {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATAS_REQUEST;
}
export type FetchModelFieldDatasSuccess = {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATAS_SUCCESS;
  payload: ModelFieldDatasPayload;
};
export type FetchModelFieldDatasFailure = {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATAS_FAILURE;
};
//GET:/ID
export interface FetchModelFieldDataRequest {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDataRequestPayload;
}
export type FetchModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATA_SUCCESS;
  payload: ModelFieldDataPayload;
};
export type FetchModelFieldDataFailure = {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATA_FAILURE;
};
//POST
export interface CreateModelFieldDataRequest {
  type: typeof modelFieldDataConst.CREATE_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDataPayload;
}
export type CreateModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.CREATE_MODELFIELDDATA_SUCCESS;
  payload: ModelFieldDataPayload;
};
export type CreateModelFieldDataFailure = {
  type: typeof modelFieldDataConst.CREATE_MODELFIELDDATA_FAILURE;
};
//POST RANGE
export interface CreateRangeModelFieldDataRequest {
  type: typeof modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDatasPayload;
}
export type CreateRangeModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_SUCCESS;
  payload: ModelFieldDatasPayload;
};
export type CreateRangeModelFieldDataFailure = {
  type: typeof modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_FAILURE;
};
//PUT
export interface UpdateModelFieldDataRequest {
  type: typeof modelFieldDataConst.UPDATE_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDataPayload;
}
export type UpdateModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.UPDATE_MODELFIELDDATA_SUCCESS;
};
export type UpdateModelFieldDataFailure = {
  type: typeof modelFieldDataConst.UPDATE_MODELFIELDDATA_FAILURE;
};
//REMOVE
export interface RemoveModelFieldDataRequest {
  type: typeof modelFieldDataConst.REMOVE_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDataRemovePayload;
}
export type RemoveModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.REMOVE_MODELFIELDDATA_SUCCESS;
  payload: ModelFieldDataRemovePayload;
};
export type RemoveModelFieldDataFailure = {
  type: typeof modelFieldDataConst.REMOVE_MODELFIELDDATA_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeModelFieldDataRequest {
  type: typeof modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDataRemoveRangePayload;
}
export type RemoveRangeModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_SUCCESS;
  payload: ModelFieldDataRemoveRangePayload;
};
export type RemoveRangeModelFieldDataFailure = {
  type: typeof modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetModelFieldData {
  type: typeof modelFieldDataConst.SET_MODELFIELDDATA;
  payload: IModelFieldData | null;
}
export interface SetModelFieldDatas {
  type: typeof modelFieldDataConst.SET_MODELFIELDDATAS;
  payload: IModelFieldData[];
}
export interface ClearModelFieldData {
  type: typeof modelFieldDataConst.CLEAR_MODELFIELDDATA;
}
export interface ClearModelFieldDatas {
  type: typeof modelFieldDataConst.CLEAR_MODELFIELDDATAS;
}

export type ModelFieldDataActions =
  | FetchModelFieldDatasRequest
  | FetchModelFieldDatasSuccess
  | FetchModelFieldDatasFailure
  | FetchModelFieldDataRequest
  | FetchModelFieldDataSuccess
  | FetchModelFieldDataFailure
  | CreateModelFieldDataRequest
  | CreateModelFieldDataSuccess
  | CreateModelFieldDataFailure
  | CreateRangeModelFieldDataRequest
  | CreateRangeModelFieldDataSuccess
  | CreateRangeModelFieldDataFailure
  | UpdateModelFieldDataRequest
  | UpdateModelFieldDataSuccess
  | UpdateModelFieldDataFailure
  | RemoveModelFieldDataRequest
  | RemoveModelFieldDataSuccess
  | RemoveModelFieldDataFailure
  | RemoveRangeModelFieldDataRequest
  | RemoveRangeModelFieldDataSuccess
  | RemoveRangeModelFieldDataFailure
  | SetModelFieldData
  | SetModelFieldDatas
  | ClearModelFieldData
  | ClearModelFieldDatas;
