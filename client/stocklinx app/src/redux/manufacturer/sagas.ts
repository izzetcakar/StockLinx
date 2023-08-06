import { call, put, takeEvery } from "redux-saga/effects";
import { manufacturerActions } from "./actions";
import { IManufacturer } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { manufacturerConst } from "./constant";
import { FetchManufacturerRequest, UpdateManufacturerRequest } from "./type";
const requestUrl = "Manufacturer/";

const fetchManufacturers = () => {
  return request<IManufacturer>({ requestUrl: requestUrl, apiType: "get" });
};
const fetchManufacturer = (id: string) => {
  return request<IManufacturer>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const createManufacturer = (manufacturer: IManufacturer) => {
  return request<IManufacturer>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: manufacturer,
  });
};
const updateManufacturer = (manufacturer: IManufacturer) => {
  return request<IManufacturer>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: manufacturer,
  });
};
const removeManufacturer = (id: string) => {
  return request<IManufacturer>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

function* fetchManufacturersSaga() {
  try {
    const { data, message, success, status }: BackendResponse<IManufacturer> =
      yield call(fetchManufacturers);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        manufacturerActions.getAllSuccess({
          manufacturers: data as IManufacturer[],
        })
      );
    }
  } catch (e) {
    yield put(
      manufacturerActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchManufacturerSaga(action: FetchManufacturerRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IManufacturer> =
      yield call(fetchManufacturer, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        manufacturerActions.getSuccess({
          manufacturer: data as IManufacturer,
        })
      );
    }
  } catch (e) {
    yield put(
      manufacturerActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createManufacturerSaga(action: UpdateManufacturerRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IManufacturer> =
      yield call(createManufacturer, action.payload.manufacturer);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(manufacturerActions.createSuccess());
    }
  } catch (e) {
    yield put(
      manufacturerActions.createFailure({
        error: e.message as string,
      })
    );
  }
}
function* updateManufacturerSaga(action: UpdateManufacturerRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IManufacturer> =
      yield call(updateManufacturer, action.payload.manufacturer);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(manufacturerActions.updateSuccess());
    }
  } catch (e) {
    yield put(
      manufacturerActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeManufacturerSaga(action: FetchManufacturerRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IManufacturer> =
      yield call(removeManufacturer, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(manufacturerActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      manufacturerActions.removeFailure({
        error: e.message as string,
      })
    );
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
