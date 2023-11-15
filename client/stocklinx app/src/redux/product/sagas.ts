import { call, put, takeEvery } from "redux-saga/effects";
import { productActions } from "./actions";
import { IProductCount, IProductStausCount } from "../../interfaces/interfaces";
import { productRequests } from "./requests";
import { genericActions } from "../generic/actions";
import { openNotificationError } from "../../notification/Notification";
import { productConst } from "./constant";

interface IResponse {
  data: IProductCount[] | IProductStausCount[] | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchProductCountsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      productRequests.getCounts
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        productActions.getCountsSuccess({
          counts: data as IProductCount[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Product Count", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchProductStatusCountsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      productRequests.getStatusCounts
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        productActions.getStatusCountsSuccess({
          statusCounts: data as IProductStausCount[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Product Status", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}

function* productSaga() {
  yield takeEvery(
    productConst.FETCH_PRODUCT_COUNTS_REQUEST,
    fetchProductCountsSaga
  );
  yield takeEvery(
    productConst.FETCH_PRODUCT_STATUS_COUNTS_REQUEST,
    fetchProductStatusCountsSaga
  );
}

export default productSaga;
