import { call, put, takeEvery } from "redux-saga/effects";
import { supplierActions } from "./actions";
import { ISupplier } from "../../interfaces/interfaces";
import { supplierConst } from "./constant";
import {
  CreateSupplierRequest,
  CreateRangeSupplierRequest,
  FetchSupplierRequest,
  RemoveSupplierRequest,
  RemoveRangeSupplierRequest,
  UpdateSupplierRequest,
} from "./type";
import { supplierRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

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
    openNotificationError("Supplier", (e as Error).message);
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
    openNotificationError("Supplier", (e as Error).message);
  }
}
function* createSupplierSaga(action: CreateSupplierRequest) {
  try {
    const { message, success }: IResponse = yield call(
      supplierRequests.create,
      action.payload.supplier
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(supplierActions.createSuccess());
      openNotificationSuccess("Supplier Created");
    }
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
  }
}
function* createRangeSupplierSaga(action: CreateRangeSupplierRequest) {
  try {
    const { message, success }: IResponse = yield call(
      supplierRequests.createRange,
      action.payload.suppliers
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(supplierActions.createRangeSuccess());
      openNotificationSuccess("Suppliers Created");
    }
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
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
      openNotificationSuccess("Supplier Updated");
    }
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
  }
}
function* removeSupplierSaga(action: RemoveSupplierRequest) {
  try {
    const { message, success }: IResponse = yield call(
      supplierRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(supplierActions.removeSuccess({ id: action.payload.id }));
      openNotificationSuccess("Supplier Removed");
    }
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
  }
}
function* removeRangeSupplierSaga(action: RemoveRangeSupplierRequest) {
  try {
    const { message, success }: IResponse = yield call(
      supplierRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(supplierActions.removeRangeSuccess({ ids: action.payload.ids }));
      openNotificationSuccess("Suppliers Removed");
    }
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
  }
}

function* suppliersaga() {
  // yield all([
  //   takeLatest(supplierConst.FETCH_SUPPLIERS_REQUEST, fetchSuppliersSaga),
  // ]);
  yield takeEvery(supplierConst.FETCH_SUPPLIERS_REQUEST, fetchSuppliersSaga);
  yield takeEvery(supplierConst.FETCH_SUPPLIER_REQUEST, fetchSupplierSaga);
  yield takeEvery(supplierConst.CREATE_SUPPLIER_REQUEST, createSupplierSaga);
  yield takeEvery(
    supplierConst.CREATE_RANGE_SUPPLIER_REQUEST,
    createRangeSupplierSaga
  );
  yield takeEvery(supplierConst.UPDATE_SUPPLIER_REQUEST, updateSupplierSaga);
  yield takeEvery(supplierConst.REMOVE_SUPPLIER_REQUEST, removeSupplierSaga);
  yield takeEvery(
    supplierConst.REMOVE_RANGE_SUPPLIER_REQUEST,
    removeRangeSupplierSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default suppliersaga;
