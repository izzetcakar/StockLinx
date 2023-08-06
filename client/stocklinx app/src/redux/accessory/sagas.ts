import { call, put, takeEvery } from "redux-saga/effects";
import { accessoryActions } from "./actions";
import { IAccessory } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { accessoryConst } from "./constant";
import { FetchAccessoryRequest, UpdateAccessoryRequest } from "./type";
const requestUrl = "Accessory/";

const fetchAccessories = () => {
  return request<IAccessory>({ requestUrl: requestUrl, apiType: "get" });
};
const fetchAccessory = (id: string) => {
  return request<IAccessory>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const createAccessory = (accessory: IAccessory) => {
  return request<IAccessory>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: accessory,
  });
};
const updateAccessory = (accessory: IAccessory) => {
  return request<IAccessory>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: accessory,
  });
};
const removeAccessory = (id: string) => {
  return request<IAccessory>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

function* fetchAccessoriesSaga() {
  try {
    const { data, message, success, status }: BackendResponse<IAccessory> =
      yield call(fetchAccessories);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        accessoryActions.getAllSuccess({
          accessories: data as IAccessory[],
        })
      );
    }
  } catch (e) {
    yield put(
      accessoryActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchAccessorySaga(action: FetchAccessoryRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IAccessory> =
      yield call(fetchAccessory, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        accessoryActions.getSuccess({
          accessory: data as IAccessory,
        })
      );
    }
  } catch (e) {
    yield put(
      accessoryActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createAccessorySaga(action: UpdateAccessoryRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IAccessory> =
      yield call(createAccessory, action.payload.accessory);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(accessoryActions.createSuccess());
    }
  } catch (e) {
    yield put(
      accessoryActions.createFailure({
        error: e.message as string,
      })
    );
  }
}
function* updateAccessorySaga(action: UpdateAccessoryRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IAccessory> =
      yield call(updateAccessory, action.payload.accessory);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(accessoryActions.updateSuccess());
    }
  } catch (e) {
    yield put(
      accessoryActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeAccessorySaga(action: FetchAccessoryRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IAccessory> =
      yield call(removeAccessory, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(accessoryActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      accessoryActions.removeFailure({
        error: e.message as string,
      })
    );
  }
}

function* accessoriesaga() {
  // yield all([
  //   takeLatest(accessoryConst.FETCH_ACCESSORIES_REQUEST, fetchAccessoriesSaga),
  // ]);
  yield takeEvery(
    accessoryConst.FETCH_ACCESSORIES_REQUEST,
    fetchAccessoriesSaga
  );
  yield takeEvery(accessoryConst.FETCH_ACCESSORY_REQUEST, fetchAccessorySaga);
  yield takeEvery(accessoryConst.CREATE_ACCESSORY_REQUEST, createAccessorySaga);
  yield takeEvery(accessoryConst.UPDATE_ACCESSORY_REQUEST, updateAccessorySaga);
  yield takeEvery(accessoryConst.REMOVE_ACCESSORY_REQUEST, removeAccessorySaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default accessoriesaga;
