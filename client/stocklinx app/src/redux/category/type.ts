import { ICategory, SelectData } from "../../interfaces/interfaces";
import { categoryConst } from "./constant";

export interface CategoryState {
  category: ICategory | null;
  categories: ICategory[];
  selectData: SelectData[];
}

export interface CategorySucccessPayload {
  category: ICategory;
}
export interface CategoriesSucccessPayload {
  categories: ICategory[];
}
export interface CategoryRequestPayload {
  id: string;
}
export interface UpdateCategoryRequestPayload {
  category: ICategory;
}

//GET
export interface FetchCategoriesRequest {
  type: typeof categoryConst.FETCH_CATEGORIES_REQUEST;
}
export type FetchCategoriesSuccess = {
  type: typeof categoryConst.FETCH_CATEGORIES_SUCCESS;
  payload: CategoriesSucccessPayload;
};
export type FetchCategoriesFailure = {
  type: typeof categoryConst.FETCH_CATEGORIES_FAILURE;
};
//GET:/ID
export interface FetchCategoryRequest {
  type: typeof categoryConst.FETCH_CATEGORY_REQUEST;
  payload: CategoryRequestPayload;
}
export type FetchCategorySuccess = {
  type: typeof categoryConst.FETCH_CATEGORY_SUCCESS;
  payload: CategorySucccessPayload;
};
export type FetchCategoryFailure = {
  type: typeof categoryConst.FETCH_CATEGORY_FAILURE;
};
//POST
export interface CreateCategoryRequest {
  type: typeof categoryConst.CREATE_CATEGORY_REQUEST;
  payload: UpdateCategoryRequestPayload;
}
export type CreateCategorySuccess = {
  type: typeof categoryConst.CREATE_CATEGORY_SUCCESS;
};
export type CreateCategoryFailure = {
  type: typeof categoryConst.CREATE_CATEGORY_FAILURE;
};
//PUT
export interface UpdateCategoryRequest {
  type: typeof categoryConst.UPDATE_CATEGORY_REQUEST;
  payload: UpdateCategoryRequestPayload;
}
export type UpdateCategorySuccess = {
  type: typeof categoryConst.UPDATE_CATEGORY_SUCCESS;
};
export type UpdateCategoryFailure = {
  type: typeof categoryConst.UPDATE_CATEGORY_FAILURE;
};
//REMOVE
export interface RemoveCategoryRequest {
  type: typeof categoryConst.REMOVE_CATEGORY_REQUEST;
  payload: CategoryRequestPayload;
}
export type RemoveCategorySuccess = {
  type: typeof categoryConst.REMOVE_CATEGORY_SUCCESS;
};
export type RemoveCategoryFailure = {
  type: typeof categoryConst.REMOVE_CATEGORY_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetCategory {
  type: typeof categoryConst.SET_CATEGORY;
  payload: ICategory | null;
}
export interface SetCategories {
  type: typeof categoryConst.SET_CATEGORIES;
  payload: ICategory[];
}
export interface ClearCategory {
  type: typeof categoryConst.CLEAR_CATEGORY;
}
export interface ClearCategories {
  type: typeof categoryConst.CLEAR_CATEGORIES;
}

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
  | UpdateCategoryRequest
  | UpdateCategorySuccess
  | UpdateCategoryFailure
  | RemoveCategoryRequest
  | RemoveCategorySuccess
  | RemoveCategoryFailure
  | SetCategory
  | SetCategories
  | ClearCategory
  | ClearCategories;
