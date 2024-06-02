import {
  AssetProductCheckInPayload,
  AssetProductCheckOutPayload,
  CheckInOutPayload,
} from "@interfaces/clientInterfaces";
import { IComponent } from "@interfaces/serverInterfaces";
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
  CheckInComponentRequest,
  CheckInComponentSuccess,
  CheckInComponentFailure,
  CheckOutComponentRequest,
  CheckOutComponentSuccess,
  CheckOutComponentFailure,
  FilterComponentsRequest,
  FilterComponentsSuccess,
  FilterComponentsFailure,
} from "./type";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

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
const createSuccess = (payload: ComponentPayload): CreateComponentSuccess => ({
  type: componentConst.CREATE_COMPONENT_SUCCESS,
  payload,
});
const createFailure = (): CreateComponentFailure => ({
  type: componentConst.CREATE_COMPONENT_FAILURE,
});

//POST RANGE
const createRange = (
  payload: ComponentsPayload
): CreateRangeComponentRequest => ({
  type: componentConst.CREATE_RANGE_COMPONENT_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: ComponentsPayload
): CreateRangeComponentSuccess => ({
  type: componentConst.CREATE_RANGE_COMPONENT_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeComponentFailure => ({
  type: componentConst.CREATE_RANGE_COMPONENT_FAILURE,
});

//PUT
const update = (payload: ComponentPayload): UpdateComponentRequest => ({
  type: componentConst.UPDATE_COMPONENT_REQUEST,
  payload,
});
const updateSuccess = (payload: ComponentPayload): UpdateComponentSuccess => ({
  type: componentConst.UPDATE_COMPONENT_SUCCESS,
  payload,
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

//CHECK IN
const checkIn = (
  payload: AssetProductCheckInPayload
): CheckInComponentRequest => ({
  type: componentConst.CHECK_IN_COMPONENT_REQUEST,
  payload,
});
const checkInSuccess = (
  payload: CheckInOutPayload
): CheckInComponentSuccess => ({
  type: componentConst.CHECK_IN_COMPONENT_SUCCESS,
  payload,
});
const checkInFailure = (): CheckInComponentFailure => ({
  type: componentConst.CHECK_IN_COMPONENT_FAILURE,
});

//CHECK OUT
const checkOut = (
  payload: AssetProductCheckOutPayload
): CheckOutComponentRequest => ({
  type: componentConst.CHECK_OUT_COMPONENT_REQUEST,
  payload,
});
const checkOutSuccess = (
  payload: CheckInOutPayload
): CheckOutComponentSuccess => ({
  type: componentConst.CHECK_OUT_COMPONENT_SUCCESS,
  payload,
});
const checkOutFailure = (): CheckOutComponentFailure => ({
  type: componentConst.CHECK_OUT_COMPONENT_FAILURE,
});

//FILTER
const filter = (payload: QueryFilter[]): FilterComponentsRequest => ({
  type: componentConst.FILTER_COMPONENTS_REQUEST,
  payload,
});
const filterSuccess = (
  payload: ComponentsPayload
): FilterComponentsSuccess => ({
  type: componentConst.FILTER_COMPONENTS_SUCCESS,
  payload,
});
const filterFailure = (): FilterComponentsFailure => ({
  type: componentConst.FILTER_COMPONENTS_FAILURE,
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
  checkIn,
  checkInSuccess,
  checkInFailure,
  checkOut,
  checkOutSuccess,
  checkOutFailure,
  filter,
  filterSuccess,
  filterFailure,
  setComponent,
  clearComponent,
  setComponents,
  clearComponents,
};
