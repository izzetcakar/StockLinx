import { departmentConst } from "./constant";
import { DepartmentActions, DepartmentState } from "./type";

const initialState: DepartmentState = {
  department: null,
  departments: [],
};

export default (state = initialState, action: DepartmentActions) => {
  switch (action.type) {
    case departmentConst.FETCH_DEPARTMENTS_REQUEST:
      return {
        ...state,
      };
    case departmentConst.FETCH_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: action.payload.departments,
      };
    case departmentConst.FETCH_DEPARTMENTS_FAILURE:
      return {
        ...state,
        departments: [],
      };
    case departmentConst.FETCH_DEPARTMENT_REQUEST:
      return {
        ...state,
      };
    case departmentConst.FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state,
        department: action.payload.department,
      };
    case departmentConst.FETCH_DEPARTMENT_FAILURE:
      return {
        ...state,
        department: null,
      };
    case departmentConst.CREATE_DEPARTMENT_REQUEST:
      return {
        ...state,
      };
    case departmentConst.CREATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: [...state.departments, action.payload.department],
      };
    case departmentConst.CREATE_DEPARTMENT_FAILURE:
      return {
        ...state,
      };
    case departmentConst.CREATE_RANGE_DEPARTMENT_REQUEST:
      return {
        ...state,
      };
    case departmentConst.CREATE_RANGE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: [...state.departments, ...action.payload.departments],
      };
    case departmentConst.CREATE_RANGE_DEPARTMENT_FAILURE:
      return {
        ...state,
      };
    case departmentConst.UPDATE_DEPARTMENT_REQUEST:
      return {
        ...state,
      };
    case departmentConst.UPDATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: state.departments.map((department) =>
          department.id === action.payload.department.id
            ? action.payload.department
            : department
        ),
      };
    case departmentConst.UPDATE_DEPARTMENT_FAILURE:
      return {
        ...state,
      };
    case departmentConst.REMOVE_DEPARTMENT_REQUEST:
      return {
        ...state,
      };
    case departmentConst.REMOVE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: state.departments.filter(
          (department) => department.id !== action.payload.id
        ),
      };
    case departmentConst.REMOVE_DEPARTMENT_FAILURE:
      return {
        ...state,
      };
    case departmentConst.REMOVE_RANGE_DEPARTMENT_REQUEST:
      return {
        ...state,
      };
    case departmentConst.REMOVE_RANGE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: state.departments.filter(
          (department) => !action.payload.ids.includes(department.id)
        ),
      };
    case departmentConst.REMOVE_RANGE_DEPARTMENT_FAILURE:
      return {
        ...state,
      };
    case departmentConst.FILTER_DEPARTMENTS_REQUEST:
      return {
        ...state,
      };
    case departmentConst.FILTER_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: action.payload.departments,
      };
    case departmentConst.FILTER_DEPARTMENTS_FAILURE:
      return {
        ...state,
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
