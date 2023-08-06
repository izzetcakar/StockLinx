import { IComponent, SelectData } from "../../interfaces/interfaces";
import { componentConst } from "./constant";

export interface ComponentState {
  component: IComponent | null;
  components: IComponent[];
  selectData: SelectData[];
  pending: boolean;
  error: string | null;
}

export interface ComponentSucccessPayload {
  component: IComponent;
}
export interface ComponentsSucccessPayload {
  components: IComponent[];
}
export interface ComponentFailurePayload {
  error: string;
}
export interface ComponentRequestPayload {
  id: string;
}
export interface UpdateComponentRequestPayload {
  component: IComponent;
}

//GET
export interface FetchComponentsRequest {
  type: typeof componentConst.FETCH_COMPONENTS_REQUEST;
}
export type FetchComponentsSuccess = {
  type: typeof componentConst.FETCH_COMPONENTS_SUCCESS;
  payload: ComponentsSucccessPayload;
};
export type FetchComponentsFailure = {
  type: typeof componentConst.FETCH_COMPONENTS_FAILURE;
  payload: ComponentFailurePayload;
};
//GET:/ID
export interface FetchComponentRequest {
  type: typeof componentConst.FETCH_COMPONENT_REQUEST;
  payload: ComponentRequestPayload;
}
export type FetchComponentSuccess = {
  type: typeof componentConst.FETCH_COMPONENT_SUCCESS;
  payload: ComponentSucccessPayload;
};
export type FetchComponentFailure = {
  type: typeof componentConst.FETCH_COMPONENT_FAILURE;
  payload: ComponentFailurePayload;
};
//POST
export interface CreateComponentRequest {
  type: typeof componentConst.CREATE_COMPONENT_REQUEST;
  payload: UpdateComponentRequestPayload;
}
export type CreateComponentSuccess = {
  type: typeof componentConst.CREATE_COMPONENT_SUCCESS;
};
export type CreateComponentFailure = {
  type: typeof componentConst.CREATE_COMPONENT_FAILURE;
  payload: ComponentFailurePayload;
};
//PUT
export interface UpdateComponentRequest {
  type: typeof componentConst.UPDATE_COMPONENT_REQUEST;
  payload: UpdateComponentRequestPayload;
}
export type UpdateComponentSuccess = {
  type: typeof componentConst.UPDATE_COMPONENT_SUCCESS;
};
export type UpdateComponentFailure = {
  type: typeof componentConst.UPDATE_COMPONENT_FAILURE;
  payload: ComponentFailurePayload;
};
//REMOVE
export interface RemoveComponentRequest {
  type: typeof componentConst.REMOVE_COMPONENT_REQUEST;
  payload: ComponentRequestPayload;
}
export type RemoveComponentSuccess = {
  type: typeof componentConst.REMOVE_COMPONENT_SUCCESS;
};
export type RemoveComponentFailure = {
  type: typeof componentConst.REMOVE_COMPONENT_FAILURE;
  payload: ComponentFailurePayload;
};

//CLIENT ACTION TYPES
export interface SetComponent {
  type: typeof componentConst.SET_COMPONENT;
  payload: IComponent | null;
}
export interface SetComponents {
  type: typeof componentConst.SET_COMPONENTS;
  payload: IComponent[];
}
export interface ClearComponent {
  type: typeof componentConst.CLEAR_COMPONENT;
}
export interface ClearComponents {
  type: typeof componentConst.CLEAR_COMPONENTS;
}

export type ComponentActions =
  | FetchComponentsRequest
  | FetchComponentsSuccess
  | FetchComponentsFailure
  | FetchComponentRequest
  | FetchComponentSuccess
  | FetchComponentFailure
  | CreateComponentRequest
  | CreateComponentSuccess
  | CreateComponentFailure
  | UpdateComponentRequest
  | UpdateComponentSuccess
  | UpdateComponentFailure
  | RemoveComponentRequest
  | RemoveComponentSuccess
  | RemoveComponentFailure
  | SetComponent
  | SetComponents
  | ClearComponent
  | ClearComponents;
