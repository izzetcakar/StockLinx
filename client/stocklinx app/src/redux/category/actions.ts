import { ICategory } from "../../interfaces/interfaces";
import { categoryConst } from "./constant";
import {
  CreateCategoryFailure,
  CreateCategoryRequest,
  CreateCategorySuccess,
  RemoveCategoryFailure,
  RemoveCategoryRequest,
  RemoveCategorySuccess,
  FetchCategoriesFailure,
  FetchCategoriesRequest,
  FetchCategoriesSuccess,
  FetchCategoryFailure,
  FetchCategoryRequest,
  FetchCategorySuccess,
  UpdateCategoryFailure,
  UpdateCategoryRequest,
  UpdateCategorySuccess,
  CategoryRequestPayload,
  SetCategory,
  SetCategories,
  ClearCategory,
  ClearCategories,
  FetchCategoryCountsRequest,
  CategoryCountsSuccessPayload,
  FetchCategoryCountsSuccess,
  FetchCategoryCountsFailure,
  CategoriesPayload,
  CategoryPayload,
  CreateRangeCategoryRequest,
  CreateRangeCategorySuccess,
  CreateRangeCategoryFailure,
  RemoveRangeCategoryRequest,
  RemoveRangeCategorySuccess,
  RemoveRangeCategoryFailure,
  CategoryRemoveRangePayload,
  CategoryRemovePayload,
} from "./type";

//GET
const getAll = (): FetchCategoriesRequest => ({
  type: categoryConst.FETCH_CATEGORIES_REQUEST,
});
const getAllSuccess = (payload: CategoriesPayload): FetchCategoriesSuccess => ({
  type: categoryConst.FETCH_CATEGORIES_SUCCESS,
  payload,
});
const getAllFailure = (): FetchCategoriesFailure => ({
  type: categoryConst.FETCH_CATEGORIES_FAILURE,
});

//GET:/ID
const get = (payload: CategoryRequestPayload): FetchCategoryRequest => ({
  type: categoryConst.FETCH_CATEGORY_REQUEST,
  payload,
});
const getSuccess = (payload: CategoryPayload): FetchCategorySuccess => ({
  type: categoryConst.FETCH_CATEGORY_SUCCESS,
  payload,
});
const getFailure = (): FetchCategoryFailure => ({
  type: categoryConst.FETCH_CATEGORY_FAILURE,
});
//GET COUNTS
const getCounts = (): FetchCategoryCountsRequest => ({
  type: categoryConst.FETCH_CATEGORY_COUNTS_REQUEST,
});
const getCountsSuccess = (
  payload: CategoryCountsSuccessPayload
): FetchCategoryCountsSuccess => ({
  type: categoryConst.FETCH_CATEGORY_COUNTS_SUCCESS,
  payload,
});
const getCountsFailure = (): FetchCategoryCountsFailure => ({
  type: categoryConst.FETCH_CATEGORY_COUNTS_FAILURE,
});

//POST
const create = (payload: CategoryPayload): CreateCategoryRequest => ({
  type: categoryConst.CREATE_CATEGORY_REQUEST,
  payload,
});
const createSuccess = (): CreateCategorySuccess => ({
  type: categoryConst.CREATE_CATEGORY_SUCCESS,
});
const createFailure = (): CreateCategoryFailure => ({
  type: categoryConst.CREATE_CATEGORY_FAILURE,
});

//POST RANGE
const createRange = (
  payload: CategoriesPayload
): CreateRangeCategoryRequest => ({
  type: categoryConst.CREATE_RANGE_CATEGORY_REQUEST,
  payload,
});
const createRangeSuccess = (): CreateRangeCategorySuccess => ({
  type: categoryConst.CREATE_RANGE_CATEGORY_SUCCESS,
});
const createRangeFailure = (): CreateRangeCategoryFailure => ({
  type: categoryConst.CREATE_RANGE_CATEGORY_FAILURE,
});

//PUT
const update = (payload: CategoryPayload): UpdateCategoryRequest => ({
  type: categoryConst.UPDATE_CATEGORY_REQUEST,
  payload,
});
const updateSuccess = (): UpdateCategorySuccess => ({
  type: categoryConst.UPDATE_CATEGORY_SUCCESS,
});
const updateFailure = (): UpdateCategoryFailure => ({
  type: categoryConst.UPDATE_CATEGORY_FAILURE,
});

//REMOVE
const remove = (payload: CategoryRemovePayload): RemoveCategoryRequest => ({
  type: categoryConst.REMOVE_CATEGORY_REQUEST,
  payload,
});
const removeSuccess = (
  payload: CategoryRemovePayload
): RemoveCategorySuccess => ({
  type: categoryConst.REMOVE_CATEGORY_SUCCESS,
  payload,
});
const removeFailure = (): RemoveCategoryFailure => ({
  type: categoryConst.REMOVE_CATEGORY_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: CategoryRemoveRangePayload
): RemoveRangeCategoryRequest => ({
  type: categoryConst.REMOVE_RANGE_CATEGORY_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: CategoryRemoveRangePayload
): RemoveRangeCategorySuccess => ({
  type: categoryConst.REMOVE_RANGE_CATEGORY_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeCategoryFailure => ({
  type: categoryConst.REMOVE_RANGE_CATEGORY_FAILURE,
});

//CLIENT ACTIONS
const setCategory = (payload: ICategory | null): SetCategory => ({
  type: categoryConst.SET_CATEGORY,
  payload,
});
const clearCategory = (): ClearCategory => ({
  type: categoryConst.CLEAR_CATEGORY,
});
const setCategories = (payload: ICategory[]): SetCategories => ({
  type: categoryConst.SET_CATEGORIES,
  payload,
});
const clearCategories = (): ClearCategories => ({
  type: categoryConst.CLEAR_CATEGORIES,
});

export const categoryActions = {
  getAll,
  getAllSuccess,
  getAllFailure,
  get,
  getSuccess,
  getFailure,
  getCounts,
  getCountsSuccess,
  getCountsFailure,
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
  setCategory,
  clearCategory,
  setCategories,
  clearCategories,
};
