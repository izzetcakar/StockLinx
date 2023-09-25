import { call, put, takeEvery } from "redux-saga/effects";
import { manufacturerActions } from "./actions";
import { IManufacturer } from "../../interfaces/interfaces";
import { manufacturerConst } from "./constant";
import { FetchManufacturerRequest, UpdateManufacturerRequest } from "./type";
import { manufacturerRequests } from "./requests";

interface IResponse {
  data: IManufacturer[] | IManufacturer | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchManufacturersSaga() {
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
    console.log(e);
  }
}
function* fetchManufacturerSaga(action: FetchManufacturerRequest) {
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
    console.log(e);
  }
}
function* createManufacturerSaga(action: UpdateManufacturerRequest) {
  try {
    const { message, success }: IResponse = yield call(
      manufacturerRequests.create,
      action.payload.manufacturer
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(manufacturerActions.createSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}
function* updateManufacturerSaga(action: UpdateManufacturerRequest) {
  try {
    const { message, success }: IResponse = yield call(
      manufacturerRequests.update,
      action.payload.manufacturer
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(manufacturerActions.updateSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}
function* removeManufacturerSaga(action: FetchManufacturerRequest) {
  try {
    const { message, success }: IResponse = yield call(
      manufacturerRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(manufacturerActions.removeSuccess());
    }
  } catch (e) {
    console.log(e);
  }
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
    manufacturerConst.FETCH_MANUFACTURER_REQUEST,
    fetchManufacturerSaga
  );
  yield takeEvery(
    manufacturerConst.CREATE_MANUFACTURER_REQUEST,
    createManufacturerSaga
  );
  yield takeEvery(
    manufacturerConst.UPDATE_MANUFACTURER_REQUEST,
    updateManufacturerSaga
  );
  yield takeEvery(
    manufacturerConst.REMOVE_MANUFACTURER_REQUEST,
    removeManufacturerSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default manufacturersaga;
