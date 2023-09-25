import { call, put, takeEvery } from "redux-saga/effects";
import { productStatusActions } from "./actions";
import { IProductStatus } from "../../interfaces/interfaces";
import { productStatusConst } from "./constant";
import { FetchProductStatusRequest, UpdateProductStatusRequest } from "./type";
import { productStatusRequests } from "./requests";
import { genericActions } from "../generic/actions";

interface IResponse {
  data: IProductStatus[] | IProductStatus | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchProductStatusesSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      productStatusRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        productStatusActions.getAllSuccess({
          productStatuses: data as IProductStatus[],
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchProductStatusSaga(action: FetchProductStatusRequest) {
  try {
    const { data, message, success }: IResponse = yield call(
      productStatusRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        productStatusActions.getSuccess({
          productStatus: data as IProductStatus,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}
function* createProductStatusSaga(action: UpdateProductStatusRequest) {
  try {
    const { message, success }: IResponse = yield call(
      productStatusRequests.create,
      action.payload.productStatus
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(productStatusActions.createSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}
function* updateProductStatusSaga(action: UpdateProductStatusRequest) {
  try {
    const { message, success }: IResponse = yield call(
      productStatusRequests.update,
      action.payload.productStatus
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(productStatusActions.updateSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}
function* removeProductStatusSaga(action: FetchProductStatusRequest) {
  try {
    const { message, success }: IResponse = yield call(
      productStatusRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(productStatusActions.removeSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}

function* productStatusesaga() {
  // yield all([
  //   takeLatest(productStatusConst.FETCH_PRODUCTSTATUSES_REQUEST, fetchProductStatusesSaga),
  // ]);
  yield takeEvery(
    productStatusConst.FETCH_PRODUCTSTATUSES_REQUEST,
    fetchProductStatusesSaga
  );
  yield takeEvery(
    productStatusConst.FETCH_PRODUCTSTATUS_REQUEST,
    fetchProductStatusSaga
  );
  yield takeEvery(
    productStatusConst.CREATE_PRODUCTSTATUS_REQUEST,
    createProductStatusSaga
  );
  yield takeEvery(
    productStatusConst.UPDATE_PRODUCTSTATUS_REQUEST,
    updateProductStatusSaga
  );
  yield takeEvery(
    productStatusConst.REMOVE_PRODUCTSTATUS_REQUEST,
    removeProductStatusSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default productStatusesaga;
