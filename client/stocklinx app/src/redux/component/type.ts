import {
  AssetProductCheckInPayload,
  AssetProductCheckOutPayload,
  CheckInOutPayload,
} from "../../interfaces/clientInterfaces";
import { IComponent, IUserProduct } from "../../interfaces/serverInterfaces";
import { componentConst } from "./constant";

export type ComponentState = {
  component: IComponent | null;
  components: IComponent[];
};
export type ComponentRequestPayload = {
  id: string;
};
export type ComponentPayload = {
  component: IComponent;
};
export type ComponentsPayload = {
  components: IComponent[];
};
export type ComponentRemoveRangePayload = {
  ids: string[];
};
export type ComponentRemovePayload = {
  id: string;
};
export type ComponentCheckInSuccessPayload = {
  component: IComponent;
  userProduct: IUserProduct;
};

//GET
export type FetchComponentsRequest = {
  type: typeof componentConst.FETCH_COMPONENTS_REQUEST;
};
export type FetchComponentsSuccess = {
  type: typeof componentConst.FETCH_COMPONENTS_SUCCESS;
  payload: ComponentsPayload;
};
export type FetchComponentsFailure = {
  type: typeof componentConst.FETCH_COMPONENTS_FAILURE;
};

//GET:/ID
export type FetchComponentRequest = {
  type: typeof componentConst.FETCH_COMPONENT_REQUEST;
  payload: ComponentRequestPayload;
};
export type FetchComponentSuccess = {
  type: typeof componentConst.FETCH_COMPONENT_SUCCESS;
  payload: ComponentPayload;
};
export type FetchComponentFailure = {
  type: typeof componentConst.FETCH_COMPONENT_FAILURE;
};

//POST
export type CreateComponentRequest = {
  type: typeof componentConst.CREATE_COMPONENT_REQUEST;
  payload: ComponentPayload;
};
export type CreateComponentSuccess = {
  type: typeof componentConst.CREATE_COMPONENT_SUCCESS;
  payload: ComponentPayload;
};
export type CreateComponentFailure = {
  type: typeof componentConst.CREATE_COMPONENT_FAILURE;
};

//POST RANGE
export type CreateRangeComponentRequest = {
  type: typeof componentConst.CREATE_RANGE_COMPONENT_REQUEST;
  payload: ComponentsPayload;
};
export type CreateRangeComponentSuccess = {
  type: typeof componentConst.CREATE_RANGE_COMPONENT_SUCCESS;
  payload: ComponentsPayload;
};
export type CreateRangeComponentFailure = {
  type: typeof componentConst.CREATE_RANGE_COMPONENT_FAILURE;
};

//PUT
export type UpdateComponentRequest = {
  type: typeof componentConst.UPDATE_COMPONENT_REQUEST;
  payload: ComponentPayload;
};
export type UpdateComponentSuccess = {
  type: typeof componentConst.UPDATE_COMPONENT_SUCCESS;
  payload: ComponentPayload;
};
export type UpdateComponentFailure = {
  type: typeof componentConst.UPDATE_COMPONENT_FAILURE;
};

//REMOVE
export type RemoveComponentRequest = {
  type: typeof componentConst.REMOVE_COMPONENT_REQUEST;
  payload: ComponentRemovePayload;
};
export type RemoveComponentSuccess = {
  type: typeof componentConst.REMOVE_COMPONENT_SUCCESS;
  payload: ComponentRemovePayload;
};
export type RemoveComponentFailure = {
  type: typeof componentConst.REMOVE_COMPONENT_FAILURE;
};

//REMOVE RANGE
export type RemoveRangeComponentRequest = {
  type: typeof componentConst.REMOVE_RANGE_COMPONENT_REQUEST;
  payload: ComponentRemoveRangePayload;
};
export type RemoveRangeComponentSuccess = {
  type: typeof componentConst.REMOVE_RANGE_COMPONENT_SUCCESS;
  payload: ComponentRemoveRangePayload;
};
export type RemoveRangeComponentFailure = {
  type: typeof componentConst.REMOVE_RANGE_COMPONENT_FAILURE;
};

//CHECK IN
export type CheckInComponentRequest = {
  type: typeof componentConst.CHECK_IN_COMPONENT_REQUEST;
  payload: AssetProductCheckInPayload;
};
export type CheckInComponentSuccess = {
  type: typeof componentConst.CHECK_IN_COMPONENT_SUCCESS;
  payload: CheckInOutPayload;
};
export type CheckInComponentFailure = {
  type: typeof componentConst.CHECK_IN_COMPONENT_FAILURE;
};

//CHECK OUT
export type CheckOutComponentRequest = {
  type: typeof componentConst.CHECK_OUT_COMPONENT_REQUEST;
  payload: AssetProductCheckOutPayload;
};
export type CheckOutComponentSuccess = {
  type: typeof componentConst.CHECK_OUT_COMPONENT_SUCCESS;
  payload: CheckInOutPayload;
};
export type CheckOutComponentFailure = {
  type: typeof componentConst.CHECK_OUT_COMPONENT_FAILURE;
};

//CLIENT ACTION TYPES
export type SetComponent = {
  type: typeof componentConst.SET_COMPONENT;
  payload: IComponent | null;
};
export type SetComponents = {
  type: typeof componentConst.SET_COMPONENTS;
  payload: IComponent[];
};
export type ClearComponent = {
  type: typeof componentConst.CLEAR_COMPONENT;
};
export type ClearComponents = {
  type: typeof componentConst.CLEAR_COMPONENTS;
};

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
  | CheckInComponentRequest
  | CheckInComponentSuccess
  | CheckInComponentFailure
  | CheckOutComponentRequest
  | CheckOutComponentSuccess
  | CheckOutComponentFailure
  | SetComponent
  | SetComponents
  | ClearComponent
  | ClearComponents;
