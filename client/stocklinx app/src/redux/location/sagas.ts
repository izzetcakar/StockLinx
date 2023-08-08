import { call, put, takeEvery } from "redux-saga/effects";
import { locationActions } from "./actions";
import { ILocation } from "../../interfaces/interfaces";
import { locationConst } from "./constant";
import { FetchLocationRequest, UpdateLocationRequest } from "./type";
import { locationRequests } from "./requests";

interface IResponse {
  data: ILocation[] | ILocation | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchLocationsSaga() {
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
    yield put(
      locationActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
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
    yield put(
      locationActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createLocationSaga(action: UpdateLocationRequest) {
  try {
    const { message, success }: IResponse = yield call(
      locationRequests.create,
      action.payload.location
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(locationActions.createSuccess());
    }
  } catch (e) {
    yield put(
      locationActions.createFailure({
        error: e.message as string,
      })
    );
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
    }
  } catch (e) {
    yield put(
      locationActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeLocationSaga(action: FetchLocationRequest) {
  try {
    const { message, success }: IResponse = yield call(
      locationRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(locationActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      locationActions.removeFailure({
        error: e.message as string,
      })
    );
  }
}

function* locationsaga() {
  // yield all([
  //   takeLatest(locationConst.FETCH_LOCATIONS_REQUEST, fetchLocationsSaga),
  // ]);
  yield takeEvery(locationConst.FETCH_LOCATIONS_REQUEST, fetchLocationsSaga);
  yield takeEvery(locationConst.FETCH_LOCATION_REQUEST, fetchLocationSaga);
  yield takeEvery(locationConst.CREATE_LOCATION_REQUEST, createLocationSaga);
  yield takeEvery(locationConst.UPDATE_LOCATION_REQUEST, updateLocationSaga);
  yield takeEvery(locationConst.REMOVE_LOCATION_REQUEST, removeLocationSaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default locationsaga;
