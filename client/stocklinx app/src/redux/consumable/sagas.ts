import { call, put, takeEvery } from "redux-saga/effects";
import { consumableActions } from "./actions";
import { IConsumable } from "../../interfaces/interfaces";
import { consumableConst } from "./constant";
import {
  CreateConsumableRequest,
  CreateRangeConsumableRequest,
  FetchConsumableRequest,
  RemoveConsumableRequest,
  RemoveRangeConsumableRequest,
  UpdateConsumableRequest,
} from "./type";
import { consumableRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: IConsumable[] | IConsumable | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchConsumablesSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      consumableRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        consumableActions.getAllSuccess({
          consumables: data as IConsumable[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchConsumableSaga(action: FetchConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      consumableRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        consumableActions.getSuccess({
          consumable: data as IConsumable,
        })
      );
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createConsumableSaga(action: CreateConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.create,
      action.payload.consumable
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Consumable Created");
      yield put(consumableActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createRangeConsumableSaga(action: CreateRangeConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.createRange,
      action.payload.consumables
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Consumables Created");
      yield put(consumableActions.createRangeSuccess());
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateConsumableSaga(action: UpdateConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.update,
      action.payload.consumable
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Consumable Updated");
      yield put(consumableActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeConsumableSaga(action: RemoveConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Consumable Removed");
      yield put(consumableActions.removeSuccess({ id: action.payload.id }));
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeConsumableSaga(action: RemoveRangeConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Consumables Removed");
      yield put(
        consumableActions.removeRangeSuccess({ ids: action.payload.ids })
      );
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* consumablesaga() {
  // yield all([
  //   takeLatest(consumableConst.FETCH_CONSUMABLES_REQUEST, fetchConsumablesSaga),
  // ]);
  yield takeEvery(
    consumableConst.FETCH_CONSUMABLES_REQUEST,
    fetchConsumablesSaga
  );
  yield takeEvery(
    consumableConst.FETCH_CONSUMABLE_REQUEST,
    fetchConsumableSaga
  );
  yield takeEvery(
    consumableConst.CREATE_CONSUMABLE_REQUEST,
    createConsumableSaga
  );
  yield takeEvery(
    consumableConst.CREATE_RANGE_CONSUMABLE_REQUEST,
    createRangeConsumableSaga
  );
  yield takeEvery(
    consumableConst.UPDATE_CONSUMABLE_REQUEST,
    updateConsumableSaga
  );
  yield takeEvery(
    consumableConst.REMOVE_CONSUMABLE_REQUEST,
    removeConsumableSaga
  );
  yield takeEvery(
    consumableConst.REMOVE_RANGE_CONSUMABLE_REQUEST,
    removeRangeConsumableSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default consumablesaga;
