import { call, put, takeEvery } from "redux-saga/effects";
import { supplierActions } from "./actions";
import { ISupplier } from "@interfaces/serverInterfaces";
import { supplierConst } from "./constant";
import {
  CreateSupplierRequest,
  CreateRangeSupplierRequest,
  FetchSupplierRequest,
  RemoveSupplierRequest,
  RemoveRangeSupplierRequest,
  UpdateSupplierRequest,
  FilterSuppliersRequest,
} from "./type";
import { supplierRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "@/notification/Notification";

type IResponse = {
  data: ISupplier[] | ISupplier | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchSuppliersSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(supplierRequests.getAll);
    yield put(
      supplierActions.getAllSuccess({
        suppliers: data as ISupplier[],
      })
    );
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
    yield put(supplierActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchSupplierSaga(action: FetchSupplierRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      supplierRequests.get,
      action.payload.id
    );
    yield put(
      supplierActions.getSuccess({
        supplier: data as ISupplier,
      })
    );
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
    yield put(supplierActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createSupplierSaga(action: CreateSupplierRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      supplierRequests.create,
      action.payload.supplier
    );
    openNotificationSuccess("Supplier Created");
    yield put(supplierActions.createSuccess({ supplier: data as ISupplier }));
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
    yield put(supplierActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeSupplierSaga(action: CreateRangeSupplierRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      supplierRequests.createRange,
      action.payload.suppliers
    );
    openNotificationSuccess("Suppliers Created");
    yield put(
      supplierActions.createRangeSuccess({ suppliers: data as ISupplier[] })
    );
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
    yield put(supplierActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateSupplierSaga(action: UpdateSupplierRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      supplierRequests.update,
      action.payload.supplier
    );
    openNotificationSuccess("Supplier Updated");
    yield put(supplierActions.updateSuccess({ supplier: data as ISupplier }));
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
    yield put(supplierActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeSupplierSaga(action: RemoveSupplierRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(supplierRequests.remove, action.payload.id);
    openNotificationSuccess("Supplier Removed");
    yield put(supplierActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
    yield put(supplierActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeSupplierSaga(action: RemoveRangeSupplierRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(supplierRequests.removeRange, action.payload.ids);
    openNotificationSuccess("Suppliers Removed");
    yield put(supplierActions.removeRangeSuccess({ ids: action.payload.ids }));
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
    yield put(supplierActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* filterSuppliersSaga(action: FilterSuppliersRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      supplierRequests.filter,
      action.payload
    );
    yield put(
      supplierActions.filterSuccess({
        suppliers: data as ISupplier[],
      })
    );
  } catch (e) {
    openNotificationError("Supplier", (e as Error).message);
    yield put(supplierActions.filterFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* suppliersaga() {
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
  yield takeEvery(supplierConst.FILTER_SUPPLIERS_REQUEST, filterSuppliersSaga);
}

export default suppliersaga;
