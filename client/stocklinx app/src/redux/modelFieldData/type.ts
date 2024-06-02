import { IModelFieldData } from "@interfaces/serverInterfaces";
import { modelFieldDataConst } from "./constant";

export type ModelFieldDataState = {
  modelFieldData: IModelFieldData | null;
  modelFieldDatas: IModelFieldData[];
};
export type ModelFieldDataRequestPayload = {
  id: string;
};
export type ModelFieldDataPayload = {
  modelFieldData: IModelFieldData;
};
export type ModelFieldDatasPayload = {
  modelFieldDatas: IModelFieldData[];
};
export type ModelFieldDataRemoveRangePayload = {
  ids: string[];
};
export type ModelFieldDataRemovePayload = {
  id: string;
};

//GET
export type FetchModelFieldDatasRequest = {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATAS_REQUEST;
};
export type FetchModelFieldDatasSuccess = {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATAS_SUCCESS;
  payload: ModelFieldDatasPayload;
};
export type FetchModelFieldDatasFailure = {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATAS_FAILURE;
};
//GET:/ID
export type FetchModelFieldDataRequest = {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDataRequestPayload;
};
export type FetchModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATA_SUCCESS;
  payload: ModelFieldDataPayload;
};
export type FetchModelFieldDataFailure = {
  type: typeof modelFieldDataConst.FETCH_MODELFIELDDATA_FAILURE;
};
//POST
export type CreateModelFieldDataRequest = {
  type: typeof modelFieldDataConst.CREATE_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDataPayload;
};
export type CreateModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.CREATE_MODELFIELDDATA_SUCCESS;
  payload: ModelFieldDataPayload;
};
export type CreateModelFieldDataFailure = {
  type: typeof modelFieldDataConst.CREATE_MODELFIELDDATA_FAILURE;
};
//POST RANGE
export type CreateRangeModelFieldDataRequest = {
  type: typeof modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDatasPayload;
};
export type CreateRangeModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_SUCCESS;
  payload: ModelFieldDatasPayload;
};
export type CreateRangeModelFieldDataFailure = {
  type: typeof modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_FAILURE;
};
//PUT
export type UpdateModelFieldDataRequest = {
  type: typeof modelFieldDataConst.UPDATE_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDataPayload;
};
export type UpdateModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.UPDATE_MODELFIELDDATA_SUCCESS;
  payload: ModelFieldDataPayload;
};
export type UpdateModelFieldDataFailure = {
  type: typeof modelFieldDataConst.UPDATE_MODELFIELDDATA_FAILURE;
};
//REMOVE
export type RemoveModelFieldDataRequest = {
  type: typeof modelFieldDataConst.REMOVE_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDataRemovePayload;
};
export type RemoveModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.REMOVE_MODELFIELDDATA_SUCCESS;
  payload: ModelFieldDataRemovePayload;
};
export type RemoveModelFieldDataFailure = {
  type: typeof modelFieldDataConst.REMOVE_MODELFIELDDATA_FAILURE;
};
//REMOVE RANGE
export type RemoveRangeModelFieldDataRequest = {
  type: typeof modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_REQUEST;
  payload: ModelFieldDataRemoveRangePayload;
};
export type RemoveRangeModelFieldDataSuccess = {
  type: typeof modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_SUCCESS;
  payload: ModelFieldDataRemoveRangePayload;
};
export type RemoveRangeModelFieldDataFailure = {
  type: typeof modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_FAILURE;
};

//CLIENT ACTION TYPES
export type SetModelFieldData = {
  type: typeof modelFieldDataConst.SET_MODELFIELDDATA;
  payload: IModelFieldData | null;
};
export type SetModelFieldDatas = {
  type: typeof modelFieldDataConst.SET_MODELFIELDDATAS;
  payload: IModelFieldData[];
};
export type ClearModelFieldData = {
  type: typeof modelFieldDataConst.CLEAR_MODELFIELDDATA;
};
export type ClearModelFieldDatas = {
  type: typeof modelFieldDataConst.CLEAR_MODELFIELDDATAS;
};

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
