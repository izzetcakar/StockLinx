import { categoryConst } from "./constant";
import { CategoryActions, CategoryState } from "./type";

const initialState: CategoryState = {
  category: null,
  categories: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: CategoryActions) => {
  switch (action.type) {
    case categoryConst.FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case categoryConst.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        categories: action.payload.categories,
      };
    case categoryConst.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        pending: false,
        categories: [],
        error: action.payload.error,
      };
    case categoryConst.FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case categoryConst.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        category: action.payload.category,
      };
    case categoryConst.FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        pending: false,
        category: null,
        error: action.payload.error,
      };
    case categoryConst.CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case categoryConst.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case categoryConst.CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case categoryConst.UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case categoryConst.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case categoryConst.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case categoryConst.REMOVE_CATEGORY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case categoryConst.REMOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case categoryConst.REMOVE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case categoryConst.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case categoryConst.CLEAR_CATEGORY:
      return {
        ...state,
        category: null,
      };
    case categoryConst.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case categoryConst.CLEAR_CATEGORIES:
      return {
        ...state,
        categories: [],
      };
    default:
      return { ...state };
  }
};
