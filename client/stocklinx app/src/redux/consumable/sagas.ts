import { call, put, takeEvery } from "redux-saga/effects";
import { consumableActions } from "./actions";
import { IConsumable } from "../../interfaces/interfaces";
import { consumableConst } from "./constant";
import { FetchConsumableRequest, UpdateConsumableRequest } from "./type";
import { consumableRequests } from "./requests";

interface IResponse {
  data: IConsumable[] | IConsumable | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchConsumablesSaga() {
  try {
    const { data, message, success, status }: IResponse = yield call(
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
    yield put(
      consumableActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchConsumableSaga(action: FetchConsumableRequest) {
  try {
    const { data, message, success, status }: IResponse = yield call(
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
    yield put(
      consumableActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createConsumableSaga(action: UpdateConsumableRequest) {
  try {
    const { data, message, success, status }: IResponse = yield call(
      consumableRequests.create,
      action.payload.consumable
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(consumableActions.createSuccess());
    }
  } catch (e) {
    yield put(
      consumableActions.createFailure({
        error: e.message as string,
      })
    );
  }
}
function* updateConsumableSaga(action: UpdateConsumableRequest) {
  try {
    const { data, message, success, status }: IResponse = yield call(
      consumableRequests.update,
      action.payload.consumable
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(consumableActions.updateSuccess());
    }
  } catch (e) {
    yield put(
      consumableActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeConsumableSaga(action: FetchConsumableRequest) {
  try {
    const { data, message, success, status }: IResponse = yield call(
      consumableRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(consumableActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      consumableActions.removeFailure({
        error: e.message as string,
      })
    );
  }
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
    consumableConst.UPDATE_CONSUMABLE_REQUEST,
    updateConsumableSaga
  );
  yield takeEvery(
    consumableConst.REMOVE_CONSUMABLE_REQUEST,
    removeConsumableSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default consumablesaga;
