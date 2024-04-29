import { ICategory } from "../../interfaces/serverInterfaces";
import { categoryConst } from "./constant";

export type CategoryState = {
  category: ICategory | null;
  categories: ICategory[];
};
export type CategoryRequestPayload = {
  id: string;
};
export type CategoryPayload = {
  category: ICategory;
};
export type CategoriesPayload = {
  categories: ICategory[];
};
export type CategoryRemoveRangePayload = {
  ids: string[];
};
export type CategoryRemovePayload = {
  id: string;
};

//GET
export type FetchCategoriesRequest = {
  type: typeof categoryConst.FETCH_CATEGORIES_REQUEST;
};
export type FetchCategoriesSuccess = {
  type: typeof categoryConst.FETCH_CATEGORIES_SUCCESS;
  payload: CategoriesPayload;
};
export type FetchCategoriesFailure = {
  type: typeof categoryConst.FETCH_CATEGORIES_FAILURE;
};
//GET:/ID
export type FetchCategoryRequest = {
  type: typeof categoryConst.FETCH_CATEGORY_REQUEST;
  payload: CategoryRequestPayload;
};
export type FetchCategorySuccess = {
  type: typeof categoryConst.FETCH_CATEGORY_SUCCESS;
  payload: CategoryPayload;
};
export type FetchCategoryFailure = {
  type: typeof categoryConst.FETCH_CATEGORY_FAILURE;
};
//POST
export type CreateCategoryRequest = {
  type: typeof categoryConst.CREATE_CATEGORY_REQUEST;
  payload: CategoryPayload;
};
export type CreateCategorySuccess = {
  type: typeof categoryConst.CREATE_CATEGORY_SUCCESS;
  payload: CategoryPayload;
};
export type CreateCategoryFailure = {
  type: typeof categoryConst.CREATE_CATEGORY_FAILURE;
};
//POST RANGE
export type CreateRangeCategoryRequest = {
  type: typeof categoryConst.CREATE_RANGE_CATEGORY_REQUEST;
  payload: CategoriesPayload;
};
export type CreateRangeCategorySuccess = {
  type: typeof categoryConst.CREATE_RANGE_CATEGORY_SUCCESS;
  payload: CategoriesPayload;
};
export type CreateRangeCategoryFailure = {
  type: typeof categoryConst.CREATE_RANGE_CATEGORY_FAILURE;
};
//PUT
export type UpdateCategoryRequest = {
  type: typeof categoryConst.UPDATE_CATEGORY_REQUEST;
  payload: CategoryPayload;
};
export type UpdateCategorySuccess = {
  type: typeof categoryConst.UPDATE_CATEGORY_SUCCESS;
  payload: CategoryPayload;
};
export type UpdateCategoryFailure = {
  type: typeof categoryConst.UPDATE_CATEGORY_FAILURE;
};
//REMOVE
export type RemoveCategoryRequest = {
  type: typeof categoryConst.REMOVE_CATEGORY_REQUEST;
  payload: CategoryRemovePayload;
};
export type RemoveCategorySuccess = {
  type: typeof categoryConst.REMOVE_CATEGORY_SUCCESS;
  payload: CategoryRemovePayload;
};
export type RemoveCategoryFailure = {
  type: typeof categoryConst.REMOVE_CATEGORY_FAILURE;
};
//REMOVE RANGE
export type RemoveRangeCategoryRequest = {
  type: typeof categoryConst.REMOVE_RANGE_CATEGORY_REQUEST;
  payload: CategoryRemoveRangePayload;
};
export type RemoveRangeCategorySuccess = {
  type: typeof categoryConst.REMOVE_RANGE_CATEGORY_SUCCESS;
  payload: CategoryRemoveRangePayload;
};
export type RemoveRangeCategoryFailure = {
  type: typeof categoryConst.REMOVE_RANGE_CATEGORY_FAILURE;
};

//CLIENT ACTION TYPES
export type SetCategory = {
  type: typeof categoryConst.SET_CATEGORY;
  payload: ICategory | null;
};
export type SetCategories = {
  type: typeof categoryConst.SET_CATEGORIES;
  payload: ICategory[];
};
export type ClearCategory = {
  type: typeof categoryConst.CLEAR_CATEGORY;
};
export type ClearCategories = {
  type: typeof categoryConst.CLEAR_CATEGORIES;
};

export type CategoryActions =
  | FetchCategoriesRequest
  | FetchCategoriesSuccess
  | FetchCategoriesFailure
  | FetchCategoryRequest
  | FetchCategorySuccess
  | FetchCategoryFailure
  | CreateCategoryRequest
  | CreateCategorySuccess
  | CreateCategoryFailure
  | CreateRangeCategoryRequest
  | CreateRangeCategorySuccess
  | CreateRangeCategoryFailure
  | UpdateCategoryRequest
  | UpdateCategorySuccess
  | UpdateCategoryFailure
  | RemoveCategoryRequest
  | RemoveCategorySuccess
  | RemoveCategoryFailure
  | RemoveRangeCategoryRequest
  | RemoveRangeCategorySuccess
  | RemoveRangeCategoryFailure
  | SetCategory
  | SetCategories
  | ClearCategory
  | ClearCategories;
