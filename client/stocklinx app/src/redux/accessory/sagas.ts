import { call, put, takeEvery } from "redux-saga/effects";
import { accessoryActions } from "./actions";
import { IAccessory } from "../../interfaces/interfaces";
import { accessoryConst } from "./constant";
import { FetchAccessoryRequest, UpdateAccessoryRequest } from "./type";
import { accessoryRequests } from "./requests";
interface IResponse {
  data: IAccessory[] | IAccessory | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchAccessoriesSaga() {
  try {
    const { data, message, success }: IResponse = yield call(
      accessoryRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
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
    const { data, message, success }: IResponse = yield call(
      accessoryRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
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
    const { message, success }: IResponse = yield call(
      accessoryRequests.create,
      action.payload.accessory
    );
    if (success !== undefined && !success) {
      throw new Error(message);
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
    const { message, success }: IResponse = yield call(
      accessoryRequests.update,
      action.payload.accessory
    );
    if (success !== undefined && !success) {
      throw new Error(message);
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
    const { message, success }: IResponse = yield call(
      accessoryRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
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