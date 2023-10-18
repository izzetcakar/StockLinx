import { call, put, takeEvery } from "redux-saga/effects";
import { categoryActions } from "./actions";
import { ICategory, ICategoryCounts } from "../../interfaces/interfaces";
import { categoryConst } from "./constant";
import { FetchCategoryRequest, UpdateCategoryRequest } from "./type";
import { categoryRequests } from "./requests";
import { genericActions } from "../generic/actions";
import { openNotificationError } from "../../components/notification/Notification";

interface IResponse {
  data: ICategory[] | ICategory | ICategoryCounts[] | null;
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
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchCategorySaga(action: FetchCategoryRequest) {
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
  }
}
function* fetchCategoryCountsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      categoryRequests.getCounts
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        categoryActions.getCountsSuccess({
          counts: data as ICategoryCounts[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Category", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* createCategorySaga(action: UpdateCategoryRequest) {
  try {
    const { message, success }: IResponse = yield call(
      categoryRequests.create,
      action.payload.category
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(categoryActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("Category", (e as Error).message);
  }
}
function* updateCategorySaga(action: UpdateCategoryRequest) {
  try {
    const { message, success }: IResponse = yield call(
      categoryRequests.update,
      action.payload.category
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(categoryActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("Category", (e as Error).message);
  }
}
function* removeCategorySaga(action: FetchCategoryRequest) {
  try {
    const { message, success }: IResponse = yield call(
      categoryRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(categoryActions.removeSuccess());
    }
  } catch (e) {
    openNotificationError("Category", (e as Error).message);
  }
}

function* categoriesaga() {
  // yield all([
  //   takeLatest(categoryConst.FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga),
  // ]);
  yield takeEvery(categoryConst.FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga);
  yield takeEvery(categoryConst.FETCH_CATEGORY_REQUEST, fetchCategorySaga);
  yield takeEvery(categoryConst.CREATE_CATEGORY_REQUEST, createCategorySaga);
  yield takeEvery(categoryConst.UPDATE_CATEGORY_REQUEST, updateCategorySaga);
  yield takeEvery(categoryConst.REMOVE_CATEGORY_REQUEST, removeCategorySaga);
  yield takeEvery(
    categoryConst.FETCH_CATEGORY_COUNTS_REQUEST,
    fetchCategoryCountsSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default categoriesaga;
