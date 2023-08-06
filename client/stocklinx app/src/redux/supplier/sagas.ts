import { call, put, takeEvery } from "redux-saga/effects";
import { supplierActions } from "./actions";
import { ISupplier } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { supplierConst } from "./constant";
import { FetchSupplierRequest, UpdateSupplierRequest } from "./type";
const requestUrl = "Supplier/";

const fetchSuppliers = () => {
  return request<ISupplier>({ requestUrl: requestUrl, apiType: "get" });
};
const fetchSupplier = (id: string) => {
  return request<ISupplier>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const createSupplier = (supplier: ISupplier) => {
  return request<ISupplier>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: supplier,
  });
};
const updateSupplier = (supplier: ISupplier) => {
  return request<ISupplier>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: supplier,
  });
};
const removeSupplier = (id: string) => {
  return request<ISupplier>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

function* fetchSuppliersSaga() {
  try {
    const { data, message, success, status }: BackendResponse<ISupplier> =
      yield call(fetchSuppliers);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        supplierActions.getAllSuccess({
          suppliers: data as ISupplier[],
        })
      );
    }
  } catch (e) {
    yield put(
      supplierActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchSupplierSaga(action: FetchSupplierRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ISupplier> =
      yield call(fetchSupplier, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        supplierActions.getSuccess({
          supplier: data as ISupplier,
        })
      );
    }
  } catch (e) {
    yield put(
      supplierActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createSupplierSaga(action: UpdateSupplierRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ISupplier> =
      yield call(createSupplier, action.payload.supplier);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(supplierActions.createSuccess());
    }
  } catch (e) {
    yield put(
      supplierActions.createFailure({
        error: e.message as string,
      })
    );
  }
}
function* updateSupplierSaga(action: UpdateSupplierRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ISupplier> =
      yield call(updateSupplier, action.payload.supplier);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(supplierActions.updateSuccess());
    }
  } catch (e) {
    yield put(
      supplierActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeSupplierSaga(action: FetchSupplierRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ISupplier> =
      yield call(removeSupplier, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(supplierActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      supplierActions.removeFailure({
        error: e.message as string,
      })
    );
  }
}

function* suppliersaga() {
  // yield all([
  //   takeLatest(supplierConst.FETCH_SUPPLIERS_REQUEST, fetchSuppliersSaga),
  // ]);
  yield takeEvery(supplierConst.FETCH_SUPPLIERS_REQUEST, fetchSuppliersSaga);
  yield takeEvery(supplierConst.FETCH_SUPPLIER_REQUEST, fetchSupplierSaga);
  yield takeEvery(supplierConst.CREATE_SUPPLIER_REQUEST, createSupplierSaga);
  yield takeEvery(supplierConst.UPDATE_SUPPLIER_REQUEST, updateSupplierSaga);
  yield takeEvery(supplierConst.REMOVE_SUPPLIER_REQUEST, removeSupplierSaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default suppliersaga;
