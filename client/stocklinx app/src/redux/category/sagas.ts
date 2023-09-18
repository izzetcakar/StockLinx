import { call, put, takeEvery } from "redux-saga/effects";
import { categoryActions } from "./actions";
import { ICategory } from "../../interfaces/interfaces";
import { categoryConst } from "./constant";
import { FetchCategoryRequest, UpdateCategoryRequest } from "./type";
import { categoryRequests } from "./requests";

interface IResponse {
  data: ICategory[] | ICategory | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchCategoriesSaga() {
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
    yield put(
      categoryActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
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
    yield put(
      categoryActions.getFailure({
        error: e.message as string,
      })
    );
  }
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
    yield put(
      categoryActions.createFailure({
        error: e.message as string,
      })
    );
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
    yield put(
      categoryActions.updateFailure({
        error: e.message as string,
      })
    );
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
    yield put(
      categoryActions.removeFailure({
        error: e.message as string,
      })
    );
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
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default categoriesaga;
