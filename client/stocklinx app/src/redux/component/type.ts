import { IComponent, SelectData } from "../../interfaces/interfaces";
import { componentConst } from "./constant";

export interface ComponentState {
  component: IComponent | null;
  components: IComponent[];
  selectData: SelectData[];
}
export interface ComponentRequestPayload {
  id: string;
}
export interface ComponentPayload {
  component: IComponent;
}
export interface ComponentsPayload {
  components: IComponent[];
}
export interface ComponentRemoveRangePayload {
  ids: string[];
}
export interface ComponentRemovePayload {
  id: string;
}

//GET
export interface FetchComponentsRequest {
  type: typeof componentConst.FETCH_COMPONENTS_REQUEST;
}
export type FetchComponentsSuccess = {
  type: typeof componentConst.FETCH_COMPONENTS_SUCCESS;
  payload: ComponentsPayload;
};
export type FetchComponentsFailure = {
  type: typeof componentConst.FETCH_COMPONENTS_FAILURE;
};
//GET:/ID
export interface FetchComponentRequest {
  type: typeof componentConst.FETCH_COMPONENT_REQUEST;
  payload: ComponentRequestPayload;
}
export type FetchComponentSuccess = {
  type: typeof componentConst.FETCH_COMPONENT_SUCCESS;
  payload: ComponentPayload;
};
export type FetchComponentFailure = {
  type: typeof componentConst.FETCH_COMPONENT_FAILURE;
};
//POST
export interface CreateComponentRequest {
  type: typeof componentConst.CREATE_COMPONENT_REQUEST;
  payload: ComponentPayload;
}
export type CreateComponentSuccess = {
  type: typeof componentConst.CREATE_COMPONENT_SUCCESS;
};
export type CreateComponentFailure = {
  type: typeof componentConst.CREATE_COMPONENT_FAILURE;
};
//POST RANGE
export interface CreateRangeComponentRequest {
  type: typeof componentConst.CREATE_RANGE_COMPONENT_REQUEST;
  payload: ComponentsPayload;
}
export type CreateRangeComponentSuccess = {
  type: typeof componentConst.CREATE_RANGE_COMPONENT_SUCCESS;
};
export type CreateRangeComponentFailure = {
  type: typeof componentConst.CREATE_RANGE_COMPONENT_FAILURE;
};
//PUT
export interface UpdateComponentRequest {
  type: typeof componentConst.UPDATE_COMPONENT_REQUEST;
  payload: ComponentPayload;
}
export type UpdateComponentSuccess = {
  type: typeof componentConst.UPDATE_COMPONENT_SUCCESS;
};
export type UpdateComponentFailure = {
  type: typeof componentConst.UPDATE_COMPONENT_FAILURE;
};
//REMOVE
export interface RemoveComponentRequest {
  type: typeof componentConst.REMOVE_COMPONENT_REQUEST;
  payload: ComponentRemovePayload;
}
export type RemoveComponentSuccess = {
  type: typeof componentConst.REMOVE_COMPONENT_SUCCESS;
  payload: ComponentRemovePayload;
};
export type RemoveComponentFailure = {
  type: typeof componentConst.REMOVE_COMPONENT_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeComponentRequest {
  type: typeof componentConst.REMOVE_RANGE_COMPONENT_REQUEST;
  payload: ComponentRemoveRangePayload;
}
export type RemoveRangeComponentSuccess = {
  type: typeof componentConst.REMOVE_RANGE_COMPONENT_SUCCESS;
  payload: ComponentRemoveRangePayload;
};
export type RemoveRangeComponentFailure = {
  type: typeof componentConst.REMOVE_RANGE_COMPONENT_FAILURE;
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
  | CreateRangeComponentRequest
  | CreateRangeComponentSuccess
  | CreateRangeComponentFailure
  | UpdateComponentRequest
  | UpdateComponentSuccess
  | UpdateComponentFailure
  | RemoveComponentRequest
  | RemoveComponentSuccess
  | RemoveComponentFailure
  | RemoveRangeComponentRequest
  | RemoveRangeComponentSuccess
  | RemoveRangeComponentFailure
  | SetComponent
  | SetComponents
  | ClearComponent
  | ClearComponents;
