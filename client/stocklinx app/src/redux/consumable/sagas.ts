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
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchConsumableSaga(action: FetchConsumableRequest) {
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
  }
}
function* createConsumableSaga(action: CreateConsumableRequest) {
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.create,
      action.payload.consumable
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(consumableActions.createSuccess());
      openNotificationSuccess("Consumable Created");
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
  }
}
function* createRangeConsumableSaga(action: CreateRangeConsumableRequest) {
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.createRange,
      action.payload.consumables
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(consumableActions.createRangeSuccess());
      openNotificationSuccess("Consumables Created");
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
  }
}

function* updateConsumableSaga(action: UpdateConsumableRequest) {
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.update,
      action.payload.consumable
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(consumableActions.updateSuccess());
      openNotificationSuccess("Consumable Updated");
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
  }
}
function* removeConsumableSaga(action: RemoveConsumableRequest) {
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(consumableActions.removeSuccess({ id: action.payload.id }));
      openNotificationSuccess("Consumable Removed");
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
  }
}
function* removeRangeConsumableSaga(action: RemoveRangeConsumableRequest) {
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(consumableActions.removeRangeSuccess({ ids: action.payload.ids }));
      openNotificationSuccess("Consumables Removed");
    }
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
  }
}

function* consumablesaga() {
  // yield all([
  //   takeLatest(consumableConst.FETCH_CONSUMABLES_REQUEST, fetchConsumablesSaga),
  // ]);
  yield takeEvery(consumableConst.FETCH_CONSUMABLES_REQUEST, fetchConsumablesSaga);
  yield takeEvery(consumableConst.FETCH_CONSUMABLE_REQUEST, fetchConsumableSaga);
  yield takeEvery(consumableConst.CREATE_CONSUMABLE_REQUEST, createConsumableSaga);
  yield takeEvery(
    consumableConst.CREATE_RANGE_CONSUMABLE_REQUEST,
    createRangeConsumableSaga
  );
  yield takeEvery(consumableConst.UPDATE_CONSUMABLE_REQUEST, updateConsumableSaga);
  yield takeEvery(consumableConst.REMOVE_CONSUMABLE_REQUEST, removeConsumableSaga);
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
