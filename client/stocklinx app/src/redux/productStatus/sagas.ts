import { call, put, takeEvery } from "redux-saga/effects";
import { productStatusActions } from "./actions";
import { IProductStatus } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { productStatusConst } from "./constant";
import { FetchProductStatusRequest, UpdateProductStatusRequest } from "./type";
const requestUrl = "ProductStatus/";

const fetchProductStatuses = () => {
  return request<IProductStatus>({ requestUrl: requestUrl, apiType: "get" });
};
const fetchProductStatus = (id: string) => {
  return request<IProductStatus>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const createProductStatus = (productStatus: IProductStatus) => {
  return request<IProductStatus>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: productStatus,
  });
};
const updateProductStatus = (productStatus: IProductStatus) => {
  return request<IProductStatus>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: productStatus,
  });
};
const removeProductStatus = (id: string) => {
  return request<IProductStatus>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

function* fetchProductStatusesSaga() {
  try {
    const { data, message, success, status }: BackendResponse<IProductStatus> =
      yield call(fetchProductStatuses);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        productStatusActions.getAllSuccess({
          productStatuses: data as IProductStatus[],
        })
      );
    }
  } catch (e) {
    yield put(
      productStatusActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchProductStatusSaga(action: FetchProductStatusRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IProductStatus> =
      yield call(fetchProductStatus, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        productStatusActions.getSuccess({
          productStatus: data as IProductStatus,
        })
      );
    }
  } catch (e) {
    yield put(
      productStatusActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createProductStatusSaga(action: UpdateProductStatusRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IProductStatus> =
      yield call(createProductStatus, action.payload.productStatus);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(productStatusActions.createSuccess());
    }
  } catch (e) {
    yield put(
      productStatusActions.createFailure({
        error: e.message as string,
      })
    );
  }
}
function* updateProductStatusSaga(action: UpdateProductStatusRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IProductStatus> =
      yield call(updateProductStatus, action.payload.productStatus);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(productStatusActions.updateSuccess());
    }
  } catch (e) {
    yield put(
      productStatusActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeProductStatusSaga(action: FetchProductStatusRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IProductStatus> =
      yield call(removeProductStatus, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(productStatusActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      productStatusActions.removeFailure({
        error: e.message as string,
      })
    );
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
