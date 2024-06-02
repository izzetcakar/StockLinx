import { call, put, takeEvery } from "redux-saga/effects";
import { manufacturerActions } from "./actions";
import { IManufacturer } from "@interfaces/serverInterfaces";
import { manufacturerConst } from "./constant";
import {
  CreateManufacturerRequest,
  CreateRangeManufacturerRequest,
  FetchManufacturerRequest,
  FilterManufacturersRequest,
  RemoveManufacturerRequest,
  RemoveRangeManufacturerRequest,
  UpdateManufacturerRequest,
} from "./type";
import { manufacturerRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "@/notification/Notification";

type IResponse = {
  data: IManufacturer[] | IManufacturer | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchManufacturersSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(manufacturerRequests.getAll);
    yield put(
      manufacturerActions.getAllSuccess({
        manufacturers: data as IManufacturer[],
      })
    );
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchManufacturerSaga(action: FetchManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      manufacturerRequests.get,
      action.payload.id
    );
    yield put(
      manufacturerActions.getSuccess({
        manufacturer: data as IManufacturer,
      })
    );
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createManufacturerSaga(action: CreateManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      manufacturerRequests.create,
      action.payload.manufacturer
    );
    openNotificationSuccess("Manufacturer Created");
    yield put(
      manufacturerActions.createSuccess({
        manufacturer: data as IManufacturer,
      })
    );
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeManufacturerSaga(action: CreateRangeManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      manufacturerRequests.createRange,
      action.payload.manufacturers
    );
    openNotificationSuccess("Manufacturers Created");
    yield put(
      manufacturerActions.createRangeSuccess({
        manufacturers: data as IManufacturer[],
      })
    );
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateManufacturerSaga(action: UpdateManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      manufacturerRequests.update,
      action.payload.manufacturer
    );
    openNotificationSuccess("Manufacturer Updated");
    yield put(
      manufacturerActions.updateSuccess({
        manufacturer: data as IManufacturer,
      })
    );
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeManufacturerSaga(action: RemoveManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(manufacturerRequests.remove, action.payload.id);
    openNotificationSuccess("Manufacturer Removed");
    yield put(manufacturerActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeManufacturerSaga(action: RemoveRangeManufacturerRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(manufacturerRequests.removeRange, action.payload.ids);
    openNotificationSuccess("Manufacturers Removed");
    yield put(
      manufacturerActions.removeRangeSuccess({ ids: action.payload.ids })
    );
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* filterManufacturersSaga(action: FilterManufacturersRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      manufacturerRequests.filter,
      action.payload
    );
    yield put(
      manufacturerActions.filterSuccess({
        manufacturers: data as IManufacturer[],
      })
    );
  } catch (e) {
    openNotificationError("Manufacturer", (e as Error).message);
    yield put(manufacturerActions.filterFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* manufacturersaga() {
  yield takeEvery(
    manufacturerConst.FETCH_MANUFACTURERS_REQUEST,
    fetchManufacturersSaga
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
  yield takeEvery(
    manufacturerConst.FILTER_MANUFACTURERS_REQUEST,
    filterManufacturersSaga
  );
}

export default manufacturersaga;
