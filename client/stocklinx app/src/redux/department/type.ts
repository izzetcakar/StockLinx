import { IDepartment } from "@interfaces/serverInterfaces";
import { departmentConst } from "./constant";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

export type DepartmentState = {
  department: IDepartment | null;
  departments: IDepartment[];
};
export type DepartmentRequestPayload = {
  id: string;
};
export type DepartmentPayload = {
  department: IDepartment;
};
export type DepartmentsPayload = {
  departments: IDepartment[];
};
export type DepartmentRemoveRangePayload = {
  ids: string[];
};
export type DepartmentRemovePayload = {
  id: string;
};

//GET
export type FetchDepartmentsRequest = {
  type: typeof departmentConst.FETCH_DEPARTMENTS_REQUEST;
};
export type FetchDepartmentsSuccess = {
  type: typeof departmentConst.FETCH_DEPARTMENTS_SUCCESS;
  payload: DepartmentsPayload;
};
export type FetchDepartmentsFailure = {
  type: typeof departmentConst.FETCH_DEPARTMENTS_FAILURE;
};

//GET:/ID
export type FetchDepartmentRequest = {
  type: typeof departmentConst.FETCH_DEPARTMENT_REQUEST;
  payload: DepartmentRequestPayload;
};
export type FetchDepartmentSuccess = {
  type: typeof departmentConst.FETCH_DEPARTMENT_SUCCESS;
  payload: DepartmentPayload;
};
export type FetchDepartmentFailure = {
  type: typeof departmentConst.FETCH_DEPARTMENT_FAILURE;
};

//POST
export type CreateDepartmentRequest = {
  type: typeof departmentConst.CREATE_DEPARTMENT_REQUEST;
  payload: DepartmentPayload;
};
export type CreateDepartmentSuccess = {
  type: typeof departmentConst.CREATE_DEPARTMENT_SUCCESS;
  payload: DepartmentPayload;
};
export type CreateDepartmentFailure = {
  type: typeof departmentConst.CREATE_DEPARTMENT_FAILURE;
};

//POST RANGE
export type CreateRangeDepartmentRequest = {
  type: typeof departmentConst.CREATE_RANGE_DEPARTMENT_REQUEST;
  payload: DepartmentsPayload;
};
export type CreateRangeDepartmentSuccess = {
  type: typeof departmentConst.CREATE_RANGE_DEPARTMENT_SUCCESS;
  payload: DepartmentsPayload;
};
export type CreateRangeDepartmentFailure = {
  type: typeof departmentConst.CREATE_RANGE_DEPARTMENT_FAILURE;
};

//PUT
export type UpdateDepartmentRequest = {
  type: typeof departmentConst.UPDATE_DEPARTMENT_REQUEST;
  payload: DepartmentPayload;
};
export type UpdateDepartmentSuccess = {
  type: typeof departmentConst.UPDATE_DEPARTMENT_SUCCESS;
  payload: DepartmentPayload;
};
export type UpdateDepartmentFailure = {
  type: typeof departmentConst.UPDATE_DEPARTMENT_FAILURE;
};

//REMOVE
export type RemoveDepartmentRequest = {
  type: typeof departmentConst.REMOVE_DEPARTMENT_REQUEST;
  payload: DepartmentRemovePayload;
};
export type RemoveDepartmentSuccess = {
  type: typeof departmentConst.REMOVE_DEPARTMENT_SUCCESS;
  payload: DepartmentRemovePayload;
};
export type RemoveDepartmentFailure = {
  type: typeof departmentConst.REMOVE_DEPARTMENT_FAILURE;
};

//REMOVE RANGE
export type RemoveRangeDepartmentRequest = {
  type: typeof departmentConst.REMOVE_RANGE_DEPARTMENT_REQUEST;
  payload: DepartmentRemoveRangePayload;
};
export type RemoveRangeDepartmentSuccess = {
  type: typeof departmentConst.REMOVE_RANGE_DEPARTMENT_SUCCESS;
  payload: DepartmentRemoveRangePayload;
};
export type RemoveRangeDepartmentFailure = {
  type: typeof departmentConst.REMOVE_RANGE_DEPARTMENT_FAILURE;
};

//FILTER
export type FilterDepartmentsRequest = {
  type: typeof departmentConst.FILTER_DEPARTMENTS_REQUEST;
  payload: QueryFilter[];
};
export type FilterDepartmentsSuccess = {
  type: typeof departmentConst.FILTER_DEPARTMENTS_SUCCESS;
  payload: DepartmentsPayload;
};
export type FilterDepartmentsFailure = {
  type: typeof departmentConst.FILTER_DEPARTMENTS_FAILURE;
};

//CLIENT ACTION TYPES
export type SetDepartment = {
  type: typeof departmentConst.SET_DEPARTMENT;
  payload: IDepartment | null;
};
export type SetDepartments = {
  type: typeof departmentConst.SET_DEPARTMENTS;
  payload: IDepartment[];
};
export type ClearDepartment = {
  type: typeof departmentConst.CLEAR_DEPARTMENT;
};
export type ClearDepartments = {
  type: typeof departmentConst.CLEAR_DEPARTMENTS;
};

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
  | FilterDepartmentsRequest
  | FilterDepartmentsSuccess
  | FilterDepartmentsFailure
  | SetDepartment
  | SetDepartments
  | ClearDepartment
  | ClearDepartments;
