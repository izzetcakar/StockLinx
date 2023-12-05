import { categoryConst } from "./constant";
import { CategoryActions, CategoryState } from "./type";

const initialState: CategoryState = {
  category: null,
  categories: [],
};

export default (state = initialState, action: CategoryActions) => {
  switch (action.type) {
    case categoryConst.FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
      };
    case categoryConst.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
      };
    case categoryConst.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: [],
      };
    case categoryConst.FETCH_CATEGORY_REQUEST:
      return {
        ...state,
      };
    case categoryConst.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload.category,
      };
    case categoryConst.FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        category: null,
      };
    case categoryConst.CREATE_CATEGORY_REQUEST:
      return {
        ...state,
      };
    case categoryConst.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload.category],
      };
    case categoryConst.CREATE_CATEGORY_FAILURE:
      return {
        ...state,
      };
    case categoryConst.CREATE_RANGE_CATEGORY_REQUEST:
      return {
        ...state,
      };
    case categoryConst.CREATE_RANGE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, ...action.payload.categories],
      };
    case categoryConst.CREATE_RANGE_CATEGORY_FAILURE:
      return {
        ...state,
      };
    case categoryConst.UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
      };
    case categoryConst.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
      };
    case categoryConst.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
      };
    case categoryConst.REMOVE_CATEGORY_REQUEST:
      return {
        ...state,
      };
    case categoryConst.REMOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload.id
        ),
      };
    case categoryConst.REMOVE_CATEGORY_FAILURE:
      return {
        ...state,
      };
    case categoryConst.REMOVE_RANGE_CATEGORY_REQUEST:
      return {
        ...state,
      };
    case categoryConst.REMOVE_RANGE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => !action.payload.ids.includes(category.id)
        ),
      };
    case categoryConst.REMOVE_RANGE_CATEGORY_FAILURE:
      return {
        ...state,
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
