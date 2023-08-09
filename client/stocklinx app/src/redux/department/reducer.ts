import {
  closeNotification,
  openNotification,
} from "../../components/notification/notification";
import { departmentConst } from "./constant";
import { DepartmentActions, DepartmentState } from "./type";

const initialState: DepartmentState = {
  department: null,
  departments: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: DepartmentActions) => {
  switch (action.type) {
    case departmentConst.FETCH_DEPARTMENTS_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case departmentConst.FETCH_DEPARTMENTS_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        departments: action.payload.departments,
        selectData: action.payload.departments.map((department) => ({
          value: department.id as string,
          label: department.name,
        })),
      };
    case departmentConst.FETCH_DEPARTMENTS_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        departments: [],
        error: action.payload.error,
      };
    case departmentConst.FETCH_DEPARTMENT_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case departmentConst.FETCH_DEPARTMENT_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        department: action.payload.department,
      };
    case departmentConst.FETCH_DEPARTMENT_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        department: null,
        error: action.payload.error,
      };
    case departmentConst.CREATE_DEPARTMENT_REQUEST:
      openNotification("Creating", true);
      return {
        ...state,
        pending: true,
      };
    case departmentConst.CREATE_DEPARTMENT_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case departmentConst.CREATE_DEPARTMENT_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case departmentConst.UPDATE_DEPARTMENT_REQUEST:
      openNotification("Updating", true);
      return {
        ...state,
        pending: true,
      };
    case departmentConst.UPDATE_DEPARTMENT_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case departmentConst.UPDATE_DEPARTMENT_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case departmentConst.REMOVE_DEPARTMENT_REQUEST:
      openNotification("Removing", true);
      return {
        ...state,
        pending: true,
      };
    case departmentConst.REMOVE_DEPARTMENT_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case departmentConst.REMOVE_DEPARTMENT_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case departmentConst.SET_DEPARTMENT:
      return {
        ...state,
        department: action.payload,
      };
    case departmentConst.CLEAR_DEPARTMENT:
      return {
        ...state,
        department: null,
      };
    case departmentConst.SET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case departmentConst.CLEAR_DEPARTMENTS:
      return {
        ...state,
        departments: [],
      };
    default:
      return { ...state };
  }
};
