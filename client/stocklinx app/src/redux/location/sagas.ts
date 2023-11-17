import { call, put, takeEvery } from "redux-saga/effects";
import { locationActions } from "./actions";
import { ILocation } from "../../interfaces/interfaces";
import { locationConst } from "./constant";
import {
  CreateLocationRequest,
  CreateRangeLocationRequest,
  FetchLocationRequest,
  RemoveLocationRequest,
  RemoveRangeLocationRequest,
  UpdateLocationRequest,
} from "./type";
import { locationRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: ILocation[] | ILocation | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchLocationsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      locationRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        locationActions.getAllSuccess({
          locations: data as ILocation[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchLocationSaga(action: FetchLocationRequest) {
  try {
    const { data, message, success }: IResponse = yield call(
      locationRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        locationActions.getSuccess({
          location: data as ILocation,
        })
      );
    }
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
  }
}
function* createLocationSaga(action: CreateLocationRequest) {
  try {
    const { message, success }: IResponse = yield call(
      locationRequests.create,
      action.payload.location
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(locationActions.createSuccess());
      openNotificationSuccess("Location Created");
    }
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
  }
}
function* createRangeLocationSaga(action: CreateRangeLocationRequest) {
  try {
    const { message, success }: IResponse = yield call(
      locationRequests.createRange,
      action.payload.locations
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(locationActions.createRangeSuccess());
      openNotificationSuccess("Locations Created");
    }
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
  }
}

function* updateLocationSaga(action: UpdateLocationRequest) {
  try {
    const { message, success }: IResponse = yield call(
      locationRequests.update,
      action.payload.location
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(locationActions.updateSuccess());
      openNotificationSuccess("Location Updated");
    }
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
  }
}
function* removeLocationSaga(action: RemoveLocationRequest) {
  try {
    const { message, success }: IResponse = yield call(
      locationRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(locationActions.removeSuccess({ id: action.payload.id }));
      openNotificationSuccess("Location Removed");
    }
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
  }
}
function* removeRangeLocationSaga(action: RemoveRangeLocationRequest) {
  try {
    const { message, success }: IResponse = yield call(
      locationRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(locationActions.removeRangeSuccess({ ids: action.payload.ids }));
      openNotificationSuccess("Locations Removed");
    }
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
  }
}

function* locationsaga() {
  // yield all([
  //   takeLatest(locationConst.FETCH_LOCATIONS_REQUEST, fetchLocationsSaga),
  // ]);
  yield takeEvery(locationConst.FETCH_LOCATIONS_REQUEST, fetchLocationsSaga);
  yield takeEvery(locationConst.FETCH_LOCATION_REQUEST, fetchLocationSaga);
  yield takeEvery(locationConst.CREATE_LOCATION_REQUEST, createLocationSaga);
  yield takeEvery(
    locationConst.CREATE_RANGE_LOCATION_REQUEST,
    createRangeLocationSaga
  );
  yield takeEvery(locationConst.UPDATE_LOCATION_REQUEST, updateLocationSaga);
  yield takeEvery(locationConst.REMOVE_LOCATION_REQUEST, removeLocationSaga);
  yield takeEvery(
    locationConst.REMOVE_RANGE_LOCATION_REQUEST,
    removeRangeLocationSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default locationsaga;
