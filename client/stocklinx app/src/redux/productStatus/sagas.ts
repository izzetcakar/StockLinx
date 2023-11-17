import { call, put, takeEvery } from "redux-saga/effects";
import { productStatusActions } from "./actions";
import { IProductStatus } from "../../interfaces/interfaces";
import { productStatusConst } from "./constant";
import {
  CreateProductStatusRequest,
  CreateRangeProductStatusRequest,
  FetchProductStatusRequest,
  RemoveProductStatusRequest,
  RemoveRangeProductStatusRequest,
  UpdateProductStatusRequest,
} from "./type";
import { productStatusRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

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
    openNotificationError("ProductStatus", (e as Error).message);
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
    openNotificationError("ProductStatus", (e as Error).message);
  }
}
function* createProductStatusSaga(action: CreateProductStatusRequest) {
  try {
    const { message, success }: IResponse = yield call(
      productStatusRequests.create,
      action.payload.productStatus
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(productStatusActions.createSuccess());
      openNotificationSuccess("ProductStatus Created");
    }
  } catch (e) {
    openNotificationError("ProductStatus", (e as Error).message);
  }
}
function* createRangeProductStatusSaga(action: CreateRangeProductStatusRequest) {
  try {
    const { message, success }: IResponse = yield call(
      productStatusRequests.createRange,
      action.payload.productStatuses
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(productStatusActions.createRangeSuccess());
      openNotificationSuccess("ProductStatuses Created");
    }
  } catch (e) {
    openNotificationError("ProductStatus", (e as Error).message);
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
      openNotificationSuccess("ProductStatus Updated");
    }
  } catch (e) {
    openNotificationError("ProductStatus", (e as Error).message);
  }
}
function* removeProductStatusSaga(action: RemoveProductStatusRequest) {
  try {
    const { message, success }: IResponse = yield call(
      productStatusRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(productStatusActions.removeSuccess({ id: action.payload.id }));
      openNotificationSuccess("ProductStatus Removed");
    }
  } catch (e) {
    openNotificationError("ProductStatus", (e as Error).message);
  }
}
function* removeRangeProductStatusSaga(action: RemoveRangeProductStatusRequest) {
  try {
    const { message, success }: IResponse = yield call(
      productStatusRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(productStatusActions.removeRangeSuccess({ ids: action.payload.ids }));
      openNotificationSuccess("ProductStatuses Removed");
    }
  } catch (e) {
    openNotificationError("ProductStatus", (e as Error).message);
  }
}

function* productStatusesaga() {
  // yield all([
  //   takeLatest(productStatusConst.FETCH_PRODUCTSTATUSES_REQUEST, fetchProductStatusesSaga),
  // ]);
  yield takeEvery(productStatusConst.FETCH_PRODUCTSTATUSES_REQUEST, fetchProductStatusesSaga);
  yield takeEvery(productStatusConst.FETCH_PRODUCTSTATUS_REQUEST, fetchProductStatusSaga);
  yield takeEvery(productStatusConst.CREATE_PRODUCTSTATUS_REQUEST, createProductStatusSaga);
  yield takeEvery(
    productStatusConst.CREATE_RANGE_PRODUCTSTATUS_REQUEST,
    createRangeProductStatusSaga
  );
  yield takeEvery(productStatusConst.UPDATE_PRODUCTSTATUS_REQUEST, updateProductStatusSaga);
  yield takeEvery(productStatusConst.REMOVE_PRODUCTSTATUS_REQUEST, removeProductStatusSaga);
  yield takeEvery(
    productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_REQUEST,
    removeRangeProductStatusSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default productStatusesaga;
