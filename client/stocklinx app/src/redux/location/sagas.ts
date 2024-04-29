import { call, put, takeEvery } from "redux-saga/effects";
import { locationActions } from "./actions";
import { ILocation } from "../../interfaces/serverInterfaces";
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

type IResponse = {
  data: ILocation[] | ILocation | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchLocationsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(locationRequests.getAll);
    yield put(
      locationActions.getAllSuccess({
        locations: data as ILocation[],
      })
    );
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
    yield put(locationActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchLocationSaga(action: FetchLocationRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      locationRequests.get,
      action.payload.id
    );
    yield put(
      locationActions.getSuccess({
        location: data as ILocation,
      })
    );
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
    yield put(locationActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createLocationSaga(action: CreateLocationRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      locationRequests.create,
      action.payload.location
    );
    openNotificationSuccess("Location Created");
    yield put(locationActions.createSuccess({ location: data as ILocation }));
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
    yield put(locationActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeLocationSaga(action: CreateRangeLocationRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      locationRequests.createRange,
      action.payload.locations
    );
    openNotificationSuccess("Locations Created");
    yield put(
      locationActions.createRangeSuccess({ locations: data as ILocation[] })
    );
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
    yield put(locationActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateLocationSaga(action: UpdateLocationRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      locationRequests.update,
      action.payload.location
    );
    openNotificationSuccess("Location Updated");
    yield put(locationActions.updateSuccess({ location: data as ILocation }));
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
    yield put(locationActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeLocationSaga(action: RemoveLocationRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(locationRequests.remove, action.payload.id);
    openNotificationSuccess("Location Removed");
    yield put(locationActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
    yield put(locationActions.removeFailure());
    yield put(genericActions.decreaseLoading());
  }
}

function* removeRangeLocationSaga(action: RemoveRangeLocationRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(locationRequests.removeRange, action.payload.ids);
    openNotificationSuccess("Locations Removed");
    yield put(locationActions.removeRangeSuccess({ ids: action.payload.ids }));
  } catch (e) {
    openNotificationError("Location", (e as Error).message);
    yield put(locationActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* locationSaga() {
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

export default locationSaga;
