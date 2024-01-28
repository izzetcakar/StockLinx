import { call, put, takeEvery } from "redux-saga/effects";
import { manufacturerActions } from "./actions";
import { IManufacturer } from "../../interfaces/interfaces";
import { manufacturerConst } from "./constant";
import {
  CreateManufacturerRequest,
  CreateRangeManufacturerRequest,
  FetchManufacturerRequest,
  FetchManufacturersPagedRequest,
  RemoveManufacturerRequest,
  RemoveRangeManufacturerRequest,
  UpdateManufacturerRequest,
} from "./type";
import { manufacturerRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: IManufacturer[] | IManufacturer | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchManufacturersSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      manufacturerRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        manufacturerActions.getAllSuccess({
          manufacturers: data as IManufacturer[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchManufacturersPagedSaga(action: FetchManufacturersPagedRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      manufacturerRequests.getPaged,
      action.payload.skip,
      action.payload.take
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        manufacturerActions.getPagedSuccess({
          manufacturers: data as IManufacturer[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.getPagedFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchManufacturerSaga(action: FetchManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      manufacturerRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        manufacturerActions.getSuccess({
          manufacturer: data as IManufacturer,
        })
      );
    }
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createManufacturerSaga(action: CreateManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      manufacturerRequests.create,
      action.payload.manufacturer
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Manufacturer Created");
      yield put(
        manufacturerActions.createSuccess({
          manufacturer: data as IManufacturer,
        })
      );
    }
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createRangeManufacturerSaga(action: CreateRangeManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      manufacturerRequests.createRange,
      action.payload.manufacturers
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Manufacturers Created");
      yield put(
        manufacturerActions.createRangeSuccess({
          manufacturers: data as IManufacturer[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* updateManufacturerSaga(action: UpdateManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      manufacturerRequests.update,
      action.payload.manufacturer
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Manufacturer Updated");
      yield put(
        manufacturerActions.updateSuccess({
          manufacturer: data as IManufacturer,
        })
      );
    }
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeManufacturerSaga(action: RemoveManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      manufacturerRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Manufacturer Removed");
      yield put(manufacturerActions.removeSuccess({ id: action.payload.id }));
    }
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeManufacturerSaga(action: RemoveRangeManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      manufacturerRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Manufacturers Removed");
      yield put(
        manufacturerActions.removeRangeSuccess({ ids: action.payload.ids })
      );
    }
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* manufacturersaga() {
  // yield all([
  //   takeLatest(manufacturerConst.FETCH_MANUFACTURERS_REQUEST, fetchManufacturersSaga),
  // ]);
  yield takeEvery(
    manufacturerConst.FETCH_MANUFACTURERS_REQUEST,
    fetchManufacturersSaga
  );
  yield takeEvery(
    manufacturerConst.FETCH_MANUFACTURERS_PAGED_REQUEST,
    fetchManufacturersPagedSaga
  );
  yield takeEvery(
    manufacturerConst.FETCH_MANUFACTURER_REQUEST,
    fetchManufacturerSaga
  );
  yield takeEvery(
    manufacturerConst.CREATE_MANUFACTURER_REQUEST,
    createManufacturerSaga
  );
  yield takeEvery(
    manufacturerConst.CREATE_RANGE_MANUFACTURER_REQUEST,
    createRangeManufacturerSaga
  );
  yield takeEvery(
    manufacturerConst.UPDATE_MANUFACTURER_REQUEST,
    updateManufacturerSaga
  );
  yield takeEvery(
    manufacturerConst.REMOVE_MANUFACTURER_REQUEST,
    removeManufacturerSaga
  );
  yield takeEvery(
    manufacturerConst.REMOVE_RANGE_MANUFACTURER_REQUEST,
    removeRangeManufacturerSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default manufacturersaga;
