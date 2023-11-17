import { IDepartment, SelectData } from "../../interfaces/interfaces";
import { departmentConst } from "./constant";

export interface DepartmentState {
  department: IDepartment | null;
  departments: IDepartment[];
  selectData: SelectData[];
}
export interface DepartmentRequestPayload {
  id: string;
}
export interface DepartmentPayload {
  department: IDepartment;
}
export interface DepartmentsPayload {
  departments: IDepartment[];
}
export interface DepartmentRemoveRangePayload {
  ids: string[];
}
export interface DepartmentRemovePayload {
  id: string;
}

//GET
export interface FetchDepartmentsRequest {
  type: typeof departmentConst.FETCH_DEPARTMENTS_REQUEST;
}
export type FetchDepartmentsSuccess = {
  type: typeof departmentConst.FETCH_DEPARTMENTS_SUCCESS;
  payload: DepartmentsPayload;
};
export type FetchDepartmentsFailure = {
  type: typeof departmentConst.FETCH_DEPARTMENTS_FAILURE;
};
//GET:/ID
export interface FetchDepartmentRequest {
  type: typeof departmentConst.FETCH_DEPARTMENT_REQUEST;
  payload: DepartmentRequestPayload;
}
export type FetchDepartmentSuccess = {
  type: typeof departmentConst.FETCH_DEPARTMENT_SUCCESS;
  payload: DepartmentPayload;
};
export type FetchDepartmentFailure = {
  type: typeof departmentConst.FETCH_DEPARTMENT_FAILURE;
};
//POST
export interface CreateDepartmentRequest {
  type: typeof departmentConst.CREATE_DEPARTMENT_REQUEST;
  payload: DepartmentPayload;
}
export type CreateDepartmentSuccess = {
  type: typeof departmentConst.CREATE_DEPARTMENT_SUCCESS;
};
export type CreateDepartmentFailure = {
  type: typeof departmentConst.CREATE_DEPARTMENT_FAILURE;
};
//POST RANGE
export interface CreateRangeDepartmentRequest {
  type: typeof departmentConst.CREATE_RANGE_DEPARTMENT_REQUEST;
  payload: DepartmentsPayload;
}
export type CreateRangeDepartmentSuccess = {
  type: typeof departmentConst.CREATE_RANGE_DEPARTMENT_SUCCESS;
};
export type CreateRangeDepartmentFailure = {
  type: typeof departmentConst.CREATE_RANGE_DEPARTMENT_FAILURE;
};
//PUT
export interface UpdateDepartmentRequest {
  type: typeof departmentConst.UPDATE_DEPARTMENT_REQUEST;
  payload: DepartmentPayload;
}
export type UpdateDepartmentSuccess = {
  type: typeof departmentConst.UPDATE_DEPARTMENT_SUCCESS;
};
export type UpdateDepartmentFailure = {
  type: typeof departmentConst.UPDATE_DEPARTMENT_FAILURE;
};
//REMOVE
export interface RemoveDepartmentRequest {
  type: typeof departmentConst.REMOVE_DEPARTMENT_REQUEST;
  payload: DepartmentRemovePayload;
}
export type RemoveDepartmentSuccess = {
  type: typeof departmentConst.REMOVE_DEPARTMENT_SUCCESS;
  payload: DepartmentRemovePayload;
};
export type RemoveDepartmentFailure = {
  type: typeof departmentConst.REMOVE_DEPARTMENT_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeDepartmentRequest {
  type: typeof departmentConst.REMOVE_RANGE_DEPARTMENT_REQUEST;
  payload: DepartmentRemoveRangePayload;
}
export type RemoveRangeDepartmentSuccess = {
  type: typeof departmentConst.REMOVE_RANGE_DEPARTMENT_SUCCESS;
  payload: DepartmentRemoveRangePayload;
};
export type RemoveRangeDepartmentFailure = {
  type: typeof departmentConst.REMOVE_RANGE_DEPARTMENT_FAILURE;
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
  | CreateRangeDepartmentRequest
  | CreateRangeDepartmentSuccess
  | CreateRangeDepartmentFailure
  | UpdateDepartmentRequest
  | UpdateDepartmentSuccess
  | UpdateDepartmentFailure
  | RemoveDepartmentRequest
  | RemoveDepartmentSuccess
  | RemoveDepartmentFailure
  | RemoveRangeDepartmentRequest
  | RemoveRangeDepartmentSuccess
  | RemoveRangeDepartmentFailure
  | SetDepartment
  | SetDepartments
  | ClearDepartment
  | ClearDepartments;
