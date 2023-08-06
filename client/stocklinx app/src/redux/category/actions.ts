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
  CategoriesSucccessPayload,
  FetchCategoriesSuccess,
  FetchCategoryFailure,
  CategoryFailurePayload,
  FetchCategoryRequest,
  FetchCategorySuccess,
  UpdateCategoryFailure,
  UpdateCategoryRequest,
  UpdateCategorySuccess,
  CategoryRequestPayload,
  UpdateCategoryRequestPayload,
  CategorySucccessPayload,
  SetCategory,
  SetCategories,
  ClearCategory,
  ClearCategories,
} from "./type";

//GET
const getAll = (): FetchCategoriesRequest => ({
  type: categoryConst.FETCH_CATEGORIES_REQUEST,
});
const getAllSuccess = (
  payload: CategoriesSucccessPayload
): FetchCategoriesSuccess => ({
  type: categoryConst.FETCH_CATEGORIES_SUCCESS,
  payload,
});
const getAllFailure = (
  payload: CategoryFailurePayload
): FetchCategoriesFailure => ({
  type: categoryConst.FETCH_CATEGORIES_FAILURE,
  payload,
});

//GET:/ID
const get = (payload: CategoryRequestPayload): FetchCategoryRequest => ({
  type: categoryConst.FETCH_CATEGORY_REQUEST,
  payload,
});
const getSuccess = (
  payload: CategorySucccessPayload
): FetchCategorySuccess => ({
  type: categoryConst.FETCH_CATEGORY_SUCCESS,
  payload,
});
const getFailure = (payload: CategoryFailurePayload): FetchCategoryFailure => ({
  type: categoryConst.FETCH_CATEGORY_FAILURE,
  payload,
});

//POST
const create = (
  payload: UpdateCategoryRequestPayload
): CreateCategoryRequest => ({
  type: categoryConst.CREATE_CATEGORY_REQUEST,
  payload,
});
const createSuccess = (): CreateCategorySuccess => ({
  type: categoryConst.CREATE_CATEGORY_SUCCESS,
});
const createFailure = (
  payload: CategoryFailurePayload
): CreateCategoryFailure => ({
  type: categoryConst.CREATE_CATEGORY_FAILURE,
  payload,
});

//PUT
const update = (
  payload: UpdateCategoryRequestPayload
): UpdateCategoryRequest => ({
  type: categoryConst.UPDATE_CATEGORY_REQUEST,
  payload,
});
const updateSuccess = (): UpdateCategorySuccess => ({
  type: categoryConst.UPDATE_CATEGORY_SUCCESS,
});
const updateFailure = (
  payload: CategoryFailurePayload
): UpdateCategoryFailure => ({
  type: categoryConst.UPDATE_CATEGORY_FAILURE,
  payload,
});

//REMOVE
const remove = (payload: CategoryRequestPayload): RemoveCategoryRequest => ({
  type: categoryConst.REMOVE_CATEGORY_REQUEST,
  payload,
});
const removeSuccess = (): RemoveCategorySuccess => ({
  type: categoryConst.REMOVE_CATEGORY_SUCCESS,
});
const removeFailure = (
  payload: CategoryFailurePayload
): RemoveCategoryFailure => ({
  type: categoryConst.REMOVE_CATEGORY_FAILURE,
  payload,
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
  create,
  createSuccess,
  createFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setCategory,
  clearCategory,
  setCategories,
  clearCategories,
};
