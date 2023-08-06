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
  DepartmentsSucccessPayload,
  FetchDepartmentsSuccess,
  FetchDepartmentFailure,
  DepartmentFailurePayload,
  FetchDepartmentRequest,
  FetchDepartmentSuccess,
  UpdateDepartmentFailure,
  UpdateDepartmentRequest,
  UpdateDepartmentSuccess,
  DepartmentRequestPayload,
  UpdateDepartmentRequestPayload,
  DepartmentSucccessPayload,
  SetDepartment,
  SetDepartments,
  ClearDepartment,
  ClearDepartments,
} from "./type";

//GET
const getAll = (): FetchDepartmentsRequest => ({
  type: departmentConst.FETCH_DEPARTMENTS_REQUEST,
});
const getAllSuccess = (
  payload: DepartmentsSucccessPayload
): FetchDepartmentsSuccess => ({
  type: departmentConst.FETCH_DEPARTMENTS_SUCCESS,
  payload,
});
const getAllFailure = (
  payload: DepartmentFailurePayload
): FetchDepartmentsFailure => ({
  type: departmentConst.FETCH_DEPARTMENTS_FAILURE,
  payload,
});

//GET:/ID
const get = (payload: DepartmentRequestPayload): FetchDepartmentRequest => ({
  type: departmentConst.FETCH_DEPARTMENT_REQUEST,
  payload,
});
const getSuccess = (
  payload: DepartmentSucccessPayload
): FetchDepartmentSuccess => ({
  type: departmentConst.FETCH_DEPARTMENT_SUCCESS,
  payload,
});
const getFailure = (
  payload: DepartmentFailurePayload
): FetchDepartmentFailure => ({
  type: departmentConst.FETCH_DEPARTMENT_FAILURE,
  payload,
});

//POST
const create = (
  payload: UpdateDepartmentRequestPayload
): CreateDepartmentRequest => ({
  type: departmentConst.CREATE_DEPARTMENT_REQUEST,
  payload,
});
const createSuccess = (): CreateDepartmentSuccess => ({
  type: departmentConst.CREATE_DEPARTMENT_SUCCESS,
});
const createFailure = (
  payload: DepartmentFailurePayload
): CreateDepartmentFailure => ({
  type: departmentConst.CREATE_DEPARTMENT_FAILURE,
  payload,
});

//PUT
const update = (
  payload: UpdateDepartmentRequestPayload
): UpdateDepartmentRequest => ({
  type: departmentConst.UPDATE_DEPARTMENT_REQUEST,
  payload,
});
const updateSuccess = (): UpdateDepartmentSuccess => ({
  type: departmentConst.UPDATE_DEPARTMENT_SUCCESS,
});
const updateFailure = (
  payload: DepartmentFailurePayload
): UpdateDepartmentFailure => ({
  type: departmentConst.UPDATE_DEPARTMENT_FAILURE,
  payload,
});

//REMOVE
const remove = (
  payload: DepartmentRequestPayload
): RemoveDepartmentRequest => ({
  type: departmentConst.REMOVE_DEPARTMENT_REQUEST,
  payload,
});
const removeSuccess = (): RemoveDepartmentSuccess => ({
  type: departmentConst.REMOVE_DEPARTMENT_SUCCESS,
});
const removeFailure = (
  payload: DepartmentFailurePayload
): RemoveDepartmentFailure => ({
  type: departmentConst.REMOVE_DEPARTMENT_FAILURE,
  payload,
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
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setDepartment,
  clearDepartment,
  setDepartments,
  clearDepartments,
};
