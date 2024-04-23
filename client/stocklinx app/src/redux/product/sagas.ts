import { call, put, takeEvery } from "redux-saga/effects";
import { productActions } from "./actions";
import {
  ICustomLog,
  IEntityCount,
  IProductCategoryCount,
  IProductLocationCount,
  IProductStatusCount,
} from "../../interfaces/serverInterfaces";
import { productRequests } from "./requests";
import { genericActions } from "../generic/actions";
import { openNotificationError } from "../../notification/Notification";
import { productConst } from "./constant";

interface IResponse {
  data: any;
  message: string;
  success: boolean;
  status: number;
}

function* fetchEntityCountsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      productRequests.getEntityCounts
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        productActions.getEntityCountsSuccess({
          entityCounts: data as IEntityCount[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Entity Counts", (e as Error).message);
    yield put(productActions.getEntityCountsFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchProductStatusCountsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      productRequests.getProductStatusCounts
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        productActions.getProductStatusCountsSuccess({
          productStatusCounts: data as IProductStatusCount[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Product Status Counts", (e as Error).message);
    yield put(productActions.getProductStatusCountsFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchProductLocationCountsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      productRequests.getProductLocationCounts
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        productActions.getProductLocationCountsSuccess({
          productLocationCounts: data as IProductLocationCount[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Product Location Counts", (e as Error).message);
    yield put(productActions.getProductLocationCountsFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchProductCategoryCountsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      productRequests.getProductCategoryCounts
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        productActions.getProductCategoryCountsSuccess({
          productCategoryCounts: data as IProductCategoryCount[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Product Category Counts", (e as Error).message);
    yield put(productActions.getProductCategoryCountsFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchCustomLogsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      productRequests.getCustomLogs
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        productActions.getCustomLogsSuccess({
          customLogs: data as ICustomLog[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Custom Logs", (e as Error).message);
    yield put(productActions.getCustomLogsFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* productSaga() {
  yield takeEvery(
    productConst.FETCH_ENTITY_COUNTS_REQUEST,
    fetchEntityCountsSaga
  );
  yield takeEvery(
    productConst.FETCH_PRODUCT_STATUS_COUNTS_REQUEST,
    fetchProductStatusCountsSaga
  );
  yield takeEvery(
    productConst.FETCH_PRODUCT_LOCATION_COUNTS_REQUEST,
    fetchProductLocationCountsSaga
  );
  yield takeEvery(
    productConst.FETCH_PRODUCT_CATEGORY_COUNTS_REQUEST,
    fetchProductCategoryCountsSaga
  );
  yield takeEvery(productConst.FETCH_CUSTOM_LOGS_REQUEST, fetchCustomLogsSaga);
}

export default productSaga;
