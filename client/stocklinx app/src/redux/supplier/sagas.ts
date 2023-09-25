import { call, put, takeEvery } from "redux-saga/effects";
import { supplierActions } from "./actions";
import { ISupplier } from "../../interfaces/interfaces";
import { supplierConst } from "./constant";
import { FetchSupplierRequest, UpdateSupplierRequest } from "./type";
import { supplierRequests } from "./requests";
import { genericActions } from "../generic/actions";

interface IResponse {
  data: ISupplier[] | ISupplier | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchSuppliersSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      supplierRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        supplierActions.getAllSuccess({
          suppliers: data as ISupplier[],
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchSupplierSaga(action: FetchSupplierRequest) {
  try {
    const { data, message, success }: IResponse = yield call(
      supplierRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        supplierActions.getSuccess({
          supplier: data as ISupplier,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}
function* createSupplierSaga(action: UpdateSupplierRequest) {
  try {
    const { message, success }: IResponse = yield call(
      supplierRequests.create,
      action.payload.supplier
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(supplierActions.createSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}
function* updateSupplierSaga(action: UpdateSupplierRequest) {
  try {
    const { message, success }: IResponse = yield call(
      supplierRequests.update,
      action.payload.supplier
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(supplierActions.updateSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}
function* removeSupplierSaga(action: FetchSupplierRequest) {
  try {
    const { message, success }: IResponse = yield call(
      supplierRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(supplierActions.removeSuccess());
    }
  } catch (e) {
    console.log(e);
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
