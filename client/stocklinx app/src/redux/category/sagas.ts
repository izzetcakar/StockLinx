import { call, put, takeEvery } from "redux-saga/effects";
import { categoryActions } from "./actions";
import { ICategory } from "../../interfaces/interfaces";
import { categoryConst } from "./constant";
import {
  CreateCategoryRequest,
  CreateRangeCategoryRequest,
  FetchCategoryRequest,
  RemoveCategoryRequest,
  RemoveRangeCategoryRequest,
  UpdateCategoryRequest,
} from "./type";
import { categoryRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: ICategory[] | ICategory | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchCategoriesSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      categoryRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        categoryActions.getAllSuccess({
          categories: data as ICategory[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Category", (e as Error).message);
    yield put(categoryActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchCategorySaga(action: FetchCategoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      categoryRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        categoryActions.getSuccess({
          category: data as ICategory,
        })
      );
    }
  } catch (e) {
    openNotificationError("Category", (e as Error).message);
    yield put(categoryActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createCategorySaga(action: CreateCategoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      categoryRequests.create,
      action.payload.category
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Category Created");
      yield put(categoryActions.createSuccess({ category: data as ICategory }));
    }
  } catch (e) {
    openNotificationError("Category", (e as Error).message);
    yield put(categoryActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createRangeCategorySaga(action: CreateRangeCategoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      categoryRequests.createRange,
      action.payload.categories
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Categories Created");
      yield put(
        categoryActions.createRangeSuccess({ categories: data as ICategory[] })
      );
    }
  } catch (e) {
    openNotificationError("Category", (e as Error).message);
    yield put(categoryActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateCategorySaga(action: UpdateCategoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      categoryRequests.update,
      action.payload.category
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Category Updated");
      yield put(categoryActions.updateSuccess({ category: data as ICategory }));
    }
  } catch (e) {
    openNotificationError("Category", (e as Error).message);
    yield put(categoryActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeCategorySaga(action: RemoveCategoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      categoryRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Category Removed");
      yield put(categoryActions.removeSuccess({ id: action.payload.id }));
    }
  } catch (e) {
    openNotificationError("Category", (e as Error).message);
    yield put(categoryActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeCategorySaga(action: RemoveRangeCategoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      categoryRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Categories Removed");
      yield put(
        categoryActions.removeRangeSuccess({ ids: action.payload.ids })
      );
    }
  } catch (e) {
    openNotificationError("Category", (e as Error).message);
    yield put(categoryActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* categorysaga() {
  // yield all([
  //   takeLatest(categoryConst.FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga),
  // ]);
  yield takeEvery(categoryConst.FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga);
  yield takeEvery(categoryConst.FETCH_CATEGORY_REQUEST, fetchCategorySaga);
  yield takeEvery(categoryConst.CREATE_CATEGORY_REQUEST, createCategorySaga);
  yield takeEvery(
    categoryConst.CREATE_RANGE_CATEGORY_REQUEST,
    createRangeCategorySaga
  );
  yield takeEvery(categoryConst.UPDATE_CATEGORY_REQUEST, updateCategorySaga);
  yield takeEvery(categoryConst.REMOVE_CATEGORY_REQUEST, removeCategorySaga);
  yield takeEvery(
    categoryConst.REMOVE_RANGE_CATEGORY_REQUEST,
    removeRangeCategorySaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default categorysaga;
