import { call, put, takeEvery } from "redux-saga/effects";
import { accessoryActions } from "./actions";
import { IAccessory } from "../../interfaces/interfaces";
import { accessoryConst } from "./constant";
import { FetchAccessoryRequest, UpdateAccessoryRequest } from "./type";
import { accessoryRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";
interface IResponse {
  data: IAccessory[] | IAccessory | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchAccessoriesSaga() {
  yield put(genericActions.increaseLoading());
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
    openNotificationError("Accessory", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
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
    openNotificationError("Accessory", (e as Error).message);
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
      openNotificationSuccess("Accessory Created");
    }
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
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
      openNotificationSuccess("Accessory Updated");
    }
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
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
      openNotificationSuccess("Accessory Removed");
    }
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
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
