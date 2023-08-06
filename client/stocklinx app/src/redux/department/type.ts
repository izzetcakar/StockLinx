import { IDepartment, SelectData } from "../../interfaces/interfaces";
import { departmentConst } from "./constant";

export interface DepartmentState {
  department: IDepartment | null;
  departments: IDepartment[];
  selectData: SelectData[];
  pending: boolean;
  error: string | null;
}

export interface DepartmentSucccessPayload {
  department: IDepartment;
}
export interface DepartmentsSucccessPayload {
  departments: IDepartment[];
}
export interface DepartmentFailurePayload {
  error: string;
}
export interface DepartmentRequestPayload {
  id: string;
}
export interface UpdateDepartmentRequestPayload {
  department: IDepartment;
}

//GET
export interface FetchDepartmentsRequest {
  type: typeof departmentConst.FETCH_DEPARTMENTS_REQUEST;
}
export type FetchDepartmentsSuccess = {
  type: typeof departmentConst.FETCH_DEPARTMENTS_SUCCESS;
  payload: DepartmentsSucccessPayload;
};
export type FetchDepartmentsFailure = {
  type: typeof departmentConst.FETCH_DEPARTMENTS_FAILURE;
  payload: DepartmentFailurePayload;
};
//GET:/ID
export interface FetchDepartmentRequest {
  type: typeof departmentConst.FETCH_DEPARTMENT_REQUEST;
  payload: DepartmentRequestPayload;
}
export type FetchDepartmentSuccess = {
  type: typeof departmentConst.FETCH_DEPARTMENT_SUCCESS;
  payload: DepartmentSucccessPayload;
};
export type FetchDepartmentFailure = {
  type: typeof departmentConst.FETCH_DEPARTMENT_FAILURE;
  payload: DepartmentFailurePayload;
};
//POST
export interface CreateDepartmentRequest {
  type: typeof departmentConst.CREATE_DEPARTMENT_REQUEST;
  payload: UpdateDepartmentRequestPayload;
}
export type CreateDepartmentSuccess = {
  type: typeof departmentConst.CREATE_DEPARTMENT_SUCCESS;
};
export type CreateDepartmentFailure = {
  type: typeof departmentConst.CREATE_DEPARTMENT_FAILURE;
  payload: DepartmentFailurePayload;
};
//PUT
export interface UpdateDepartmentRequest {
  type: typeof departmentConst.UPDATE_DEPARTMENT_REQUEST;
  payload: UpdateDepartmentRequestPayload;
}
export type UpdateDepartmentSuccess = {
  type: typeof departmentConst.UPDATE_DEPARTMENT_SUCCESS;
};
export type UpdateDepartmentFailure = {
  type: typeof departmentConst.UPDATE_DEPARTMENT_FAILURE;
  payload: DepartmentFailurePayload;
};
//REMOVE
export interface RemoveDepartmentRequest {
  type: typeof departmentConst.REMOVE_DEPARTMENT_REQUEST;
  payload: DepartmentRequestPayload;
}
export type RemoveDepartmentSuccess = {
  type: typeof departmentConst.REMOVE_DEPARTMENT_SUCCESS;
};
export type RemoveDepartmentFailure = {
  type: typeof departmentConst.REMOVE_DEPARTMENT_FAILURE;
  payload: DepartmentFailurePayload;
};

//CLIENT ACTION TYPES
export interface SetDepartment {
  type: typeof departmentConst.SET_DEPARTMENT;
  payload: IDepartment | null;
}
export interface SetDepartments {
  type: typeof departmentConst.SET_DEPARTMENTS;
  payload: IDepartment[];
}
export interface ClearDepartment {
  type: typeof departmentConst.CLEAR_DEPARTMENT;
}
export interface ClearDepartments {
  type: typeof departmentConst.CLEAR_DEPARTMENTS;
}

export type DepartmentActions =
  | FetchDepartmentsRequest
  | FetchDepartmentsSuccess
  | FetchDepartmentsFailure
  | FetchDepartmentRequest
  | FetchDepartmentSuccess
  | FetchDepartmentFailure
  | CreateDepartmentRequest
  | CreateDepartmentSuccess
  | CreateDepartmentFailure
  | UpdateDepartmentRequest
  | UpdateDepartmentSuccess
  | UpdateDepartmentFailure
  | RemoveDepartmentRequest
  | RemoveDepartmentSuccess
  | RemoveDepartmentFailure
  | SetDepartment
  | SetDepartments
  | ClearDepartment
  | ClearDepartments;
