import { IDepartment } from "../../interfaces/interfaces";
import { departmentConst } from "./constant";
import {
  CreateDepartmentFailure,
  CreateDepartmentRequest,
  CreateDepartmentSuccess,
  RemoveDepartmentFailure,
  RemoveDepartmentRequest,
  RemoveDepartmentSuccess,
  FetchDepartmentsFailure,
  FetchDepartmentsRequest,
  FetchDepartmentsSuccess,
  FetchDepartmentFailure,
  FetchDepartmentRequest,
  FetchDepartmentSuccess,
  UpdateDepartmentFailure,
  UpdateDepartmentRequest,
  UpdateDepartmentSuccess,
  DepartmentRequestPayload,
  SetDepartment,
  SetDepartments,
  ClearDepartment,
  ClearDepartments,
  DepartmentsPayload,
  DepartmentPayload,
  CreateRangeDepartmentRequest,
  CreateRangeDepartmentSuccess,
  CreateRangeDepartmentFailure,
  RemoveRangeDepartmentRequest,
  RemoveRangeDepartmentSuccess,
  RemoveRangeDepartmentFailure,
  DepartmentRemoveRangePayload,
  DepartmentRemovePayload,
} from "./type";

//GET
const getAll = (): FetchDepartmentsRequest => ({
  type: departmentConst.FETCH_DEPARTMENTS_REQUEST,
});
const getAllSuccess = (
  payload: DepartmentsPayload
): FetchDepartmentsSuccess => ({
  type: departmentConst.FETCH_DEPARTMENTS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchDepartmentsFailure => ({
  type: departmentConst.FETCH_DEPARTMENTS_FAILURE,
});

//GET:/ID
const get = (payload: DepartmentRequestPayload): FetchDepartmentRequest => ({
  type: departmentConst.FETCH_DEPARTMENT_REQUEST,
  payload,
});
const getSuccess = (payload: DepartmentPayload): FetchDepartmentSuccess => ({
  type: departmentConst.FETCH_DEPARTMENT_SUCCESS,
  payload,
});
const getFailure = (): FetchDepartmentFailure => ({
  type: departmentConst.FETCH_DEPARTMENT_FAILURE,
});

//POST
const create = (payload: DepartmentPayload): CreateDepartmentRequest => ({
  type: departmentConst.CREATE_DEPARTMENT_REQUEST,
  payload,
});
const createSuccess = (
  payload: DepartmentPayload
): CreateDepartmentSuccess => ({
  type: departmentConst.CREATE_DEPARTMENT_SUCCESS,
  payload,
});
const createFailure = (): CreateDepartmentFailure => ({
  type: departmentConst.CREATE_DEPARTMENT_FAILURE,
});

//POST RANGE
const createRange = (
  payload: DepartmentsPayload
): CreateRangeDepartmentRequest => ({
  type: departmentConst.CREATE_RANGE_DEPARTMENT_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: DepartmentsPayload
): CreateRangeDepartmentSuccess => ({
  type: departmentConst.CREATE_RANGE_DEPARTMENT_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeDepartmentFailure => ({
  type: departmentConst.CREATE_RANGE_DEPARTMENT_FAILURE,
});

//PUT
const update = (payload: DepartmentPayload): UpdateDepartmentRequest => ({
  type: departmentConst.UPDATE_DEPARTMENT_REQUEST,
  payload,
});
const updateSuccess = (
  payload: DepartmentPayload
): UpdateDepartmentSuccess => ({
  type: departmentConst.UPDATE_DEPARTMENT_SUCCESS,
  payload,
});
const updateFailure = (): UpdateDepartmentFailure => ({
  type: departmentConst.UPDATE_DEPARTMENT_FAILURE,
});

//REMOVE
const remove = (payload: DepartmentRemovePayload): RemoveDepartmentRequest => ({
  type: departmentConst.REMOVE_DEPARTMENT_REQUEST,
  payload,
});
const removeSuccess = (
  payload: DepartmentRemovePayload
): RemoveDepartmentSuccess => ({
  type: departmentConst.REMOVE_DEPARTMENT_SUCCESS,
  payload,
});
const removeFailure = (): RemoveDepartmentFailure => ({
  type: departmentConst.REMOVE_DEPARTMENT_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: DepartmentRemoveRangePayload
): RemoveRangeDepartmentRequest => ({
  type: departmentConst.REMOVE_RANGE_DEPARTMENT_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: DepartmentRemoveRangePayload
): RemoveRangeDepartmentSuccess => ({
  type: departmentConst.REMOVE_RANGE_DEPARTMENT_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeDepartmentFailure => ({
  type: departmentConst.REMOVE_RANGE_DEPARTMENT_FAILURE,
});

//CLIENT ACTIONS
const setDepartment = (payload: IDepartment | null): SetDepartment => ({
  type: departmentConst.SET_DEPARTMENT,
  payload,
});
const clearDepartment = (): ClearDepartment => ({
  type: departmentConst.CLEAR_DEPARTMENT,
});
const setDepartments = (payload: IDepartment[]): SetDepartments => ({
  type: departmentConst.SET_DEPARTMENTS,
  payload,
});
const clearDepartments = (): ClearDepartments => ({
  type: departmentConst.CLEAR_DEPARTMENTS,
});

export const departmentActions = {
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
  setDepartment,
  clearDepartment,
  setDepartments,
  clearDepartments,
};
