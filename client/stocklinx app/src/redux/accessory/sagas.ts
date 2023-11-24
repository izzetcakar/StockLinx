import { call, put, takeEvery } from "redux-saga/effects";
import { accessoryActions } from "./actions";
import { IAccessory } from "../../interfaces/interfaces";
import { accessoryConst } from "./constant";
import {
  CreateAccessoryRequest,
  CreateRangeAccessoryRequest,
  FetchAccessoryRequest,
  RemoveAccessoryRequest,
  RemoveRangeAccessoryRequest,
  UpdateAccessoryRequest,
} from "./type";
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
    yield put(accessoryActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchAccessorySaga(action: FetchAccessoryRequest) {
  yield put(genericActions.increaseLoading());
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
    yield put(accessoryActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createAccessorySaga(action: CreateAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      accessoryRequests.create,
      action.payload.accessory
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Accessory Created");
      yield put(accessoryActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.createFailure());
  }
}
function* createRangeAccessorySaga(action: CreateRangeAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      accessoryRequests.createRange,
      action.payload.accessories
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Accessories Created");
      yield put(accessoryActions.createRangeSuccess());
    }
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateAccessorySaga(action: UpdateAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      accessoryRequests.update,
      action.payload.accessory
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Accessory Updated");
      yield put(accessoryActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeAccessorySaga(action: RemoveAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      accessoryRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Accessory Removed");
      yield put(accessoryActions.removeSuccess({ id: action.payload.id }));
    }
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeAccessorySaga(action: RemoveRangeAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      accessoryRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Accessories Removed");
      yield put(
        accessoryActions.removeRangeSuccess({ ids: action.payload.ids })
      );
    }
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* accessorysaga() {
  // yield all([
  //   takeLatest(accessoryConst.FETCH_ACCESSORIES_REQUEST, fetchAccessoriesSaga),
  // ]);
  yield takeEvery(
    accessoryConst.FETCH_ACCESSORIES_REQUEST,
    fetchAccessoriesSaga
  );
  yield takeEvery(accessoryConst.FETCH_ACCESSORY_REQUEST, fetchAccessorySaga);
  yield takeEvery(accessoryConst.CREATE_ACCESSORY_REQUEST, createAccessorySaga);
  yield takeEvery(
    accessoryConst.CREATE_RANGE_ACCESSORY_REQUEST,
    createRangeAccessorySaga
  );
  yield takeEvery(accessoryConst.UPDATE_ACCESSORY_REQUEST, updateAccessorySaga);
  yield takeEvery(accessoryConst.REMOVE_ACCESSORY_REQUEST, removeAccessorySaga);
  yield takeEvery(
    accessoryConst.REMOVE_RANGE_ACCESSORY_REQUEST,
    removeRangeAccessorySaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default accessorysaga;
