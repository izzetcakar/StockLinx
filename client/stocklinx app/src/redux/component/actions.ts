import { IComponent } from "../../interfaces/interfaces";
import { componentConst } from "./constant";
import {
  CreateComponentFailure,
  CreateComponentRequest,
  CreateComponentSuccess,
  RemoveComponentFailure,
  RemoveComponentRequest,
  RemoveComponentSuccess,
  FetchComponentsFailure,
  FetchComponentsRequest,
  FetchComponentsSuccess,
  FetchComponentFailure,
  FetchComponentRequest,
  FetchComponentSuccess,
  UpdateComponentFailure,
  UpdateComponentRequest,
  UpdateComponentSuccess,
  ComponentRequestPayload,
  SetComponent,
  SetComponents,
  ClearComponent,
  ClearComponents,
  ComponentsPayload,
  ComponentPayload,
  CreateRangeComponentRequest,
  CreateRangeComponentSuccess,
  CreateRangeComponentFailure,
  RemoveRangeComponentRequest,
  RemoveRangeComponentSuccess,
  RemoveRangeComponentFailure,
  ComponentRemoveRangePayload,
  ComponentRemovePayload,
} from "./type";

//GET
const getAll = (): FetchComponentsRequest => ({
  type: componentConst.FETCH_COMPONENTS_REQUEST,
});
const getAllSuccess = (payload: ComponentsPayload): FetchComponentsSuccess => ({
  type: componentConst.FETCH_COMPONENTS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchComponentsFailure => ({
  type: componentConst.FETCH_COMPONENTS_FAILURE,
});

//GET:/ID
const get = (payload: ComponentRequestPayload): FetchComponentRequest => ({
  type: componentConst.FETCH_COMPONENT_REQUEST,
  payload,
});
const getSuccess = (payload: ComponentPayload): FetchComponentSuccess => ({
  type: componentConst.FETCH_COMPONENT_SUCCESS,
  payload,
});
const getFailure = (): FetchComponentFailure => ({
  type: componentConst.FETCH_COMPONENT_FAILURE,
});

//POST
const create = (payload: ComponentPayload): CreateComponentRequest => ({
  type: componentConst.CREATE_COMPONENT_REQUEST,
  payload,
});
const createSuccess = (): CreateComponentSuccess => ({
  type: componentConst.CREATE_COMPONENT_SUCCESS,
});
const createFailure = (): CreateComponentFailure => ({
  type: componentConst.CREATE_COMPONENT_FAILURE,
});

//POST RANGE
const createRange = (payload: ComponentsPayload): CreateRangeComponentRequest => ({
  type: componentConst.CREATE_RANGE_COMPONENT_REQUEST,
  payload,
});
const createRangeSuccess = (): CreateRangeComponentSuccess => ({
  type: componentConst.CREATE_RANGE_COMPONENT_SUCCESS,
});
const createRangeFailure = (): CreateRangeComponentFailure => ({
  type: componentConst.CREATE_RANGE_COMPONENT_FAILURE,
});

//PUT
const update = (payload: ComponentPayload): UpdateComponentRequest => ({
  type: componentConst.UPDATE_COMPONENT_REQUEST,
  payload,
});
const updateSuccess = (): UpdateComponentSuccess => ({
  type: componentConst.UPDATE_COMPONENT_SUCCESS,
});
const updateFailure = (): UpdateComponentFailure => ({
  type: componentConst.UPDATE_COMPONENT_FAILURE,
});

//REMOVE
const remove = (payload: ComponentRemovePayload): RemoveComponentRequest => ({
  type: componentConst.REMOVE_COMPONENT_REQUEST,
  payload,
});
const removeSuccess = (
  payload: ComponentRemovePayload
): RemoveComponentSuccess => ({
  type: componentConst.REMOVE_COMPONENT_SUCCESS,
  payload,
});
const removeFailure = (): RemoveComponentFailure => ({
  type: componentConst.REMOVE_COMPONENT_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: ComponentRemoveRangePayload
): RemoveRangeComponentRequest => ({
  type: componentConst.REMOVE_RANGE_COMPONENT_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: ComponentRemoveRangePayload
): RemoveRangeComponentSuccess => ({
  type: componentConst.REMOVE_RANGE_COMPONENT_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeComponentFailure => ({
  type: componentConst.REMOVE_RANGE_COMPONENT_FAILURE,
});

//CLIENT ACTIONS
const setComponent = (payload: IComponent | null): SetComponent => ({
  type: componentConst.SET_COMPONENT,
  payload,
});
const clearComponent = (): ClearComponent => ({
  type: componentConst.CLEAR_COMPONENT,
});
const setComponents = (payload: IComponent[]): SetComponents => ({
  type: componentConst.SET_COMPONENTS,
  payload,
});
const clearComponents = (): ClearComponents => ({
  type: componentConst.CLEAR_COMPONENTS,
});

export const componentActions = {
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
  setComponent,
  clearComponent,
  setComponents,
  clearComponents,
};
