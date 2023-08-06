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
  ComponentsSucccessPayload,
  FetchComponentsSuccess,
  FetchComponentFailure,
  ComponentFailurePayload,
  FetchComponentRequest,
  FetchComponentSuccess,
  UpdateComponentFailure,
  UpdateComponentRequest,
  UpdateComponentSuccess,
  ComponentRequestPayload,
  UpdateComponentRequestPayload,
  ComponentSucccessPayload,
  SetComponent,
  SetComponents,
  ClearComponent,
  ClearComponents,
} from "./type";

//GET
const getAll = (): FetchComponentsRequest => ({
  type: componentConst.FETCH_COMPONENTS_REQUEST,
});
const getAllSuccess = (
  payload: ComponentsSucccessPayload
): FetchComponentsSuccess => ({
  type: componentConst.FETCH_COMPONENTS_SUCCESS,
  payload,
});
const getAllFailure = (
  payload: ComponentFailurePayload
): FetchComponentsFailure => ({
  type: componentConst.FETCH_COMPONENTS_FAILURE,
  payload,
});

//GET:/ID
const get = (payload: ComponentRequestPayload): FetchComponentRequest => ({
  type: componentConst.FETCH_COMPONENT_REQUEST,
  payload,
});
const getSuccess = (
  payload: ComponentSucccessPayload
): FetchComponentSuccess => ({
  type: componentConst.FETCH_COMPONENT_SUCCESS,
  payload,
});
const getFailure = (
  payload: ComponentFailurePayload
): FetchComponentFailure => ({
  type: componentConst.FETCH_COMPONENT_FAILURE,
  payload,
});

//POST
const create = (
  payload: UpdateComponentRequestPayload
): CreateComponentRequest => ({
  type: componentConst.CREATE_COMPONENT_REQUEST,
  payload,
});
const createSuccess = (): CreateComponentSuccess => ({
  type: componentConst.CREATE_COMPONENT_SUCCESS,
});
const createFailure = (
  payload: ComponentFailurePayload
): CreateComponentFailure => ({
  type: componentConst.CREATE_COMPONENT_FAILURE,
  payload,
});

//PUT
const update = (
  payload: UpdateComponentRequestPayload
): UpdateComponentRequest => ({
  type: componentConst.UPDATE_COMPONENT_REQUEST,
  payload,
});
const updateSuccess = (): UpdateComponentSuccess => ({
  type: componentConst.UPDATE_COMPONENT_SUCCESS,
});
const updateFailure = (
  payload: ComponentFailurePayload
): UpdateComponentFailure => ({
  type: componentConst.UPDATE_COMPONENT_FAILURE,
  payload,
});

//REMOVE
const remove = (payload: ComponentRequestPayload): RemoveComponentRequest => ({
  type: componentConst.REMOVE_COMPONENT_REQUEST,
  payload,
});
const removeSuccess = (): RemoveComponentSuccess => ({
  type: componentConst.REMOVE_COMPONENT_SUCCESS,
});
const removeFailure = (
  payload: ComponentFailurePayload
): RemoveComponentFailure => ({
  type: componentConst.REMOVE_COMPONENT_FAILURE,
  payload,
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
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setComponent,
  clearComponent,
  setComponents,
  clearComponents,
};
