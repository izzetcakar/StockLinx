import { call, put, takeEvery } from "redux-saga/effects";
import { consumableActions } from "./actions";
import { IConsumable } from "../../interfaces/interfaces";
import { consumableConst } from "./constant";
import { FetchConsumableRequest, UpdateConsumableRequest } from "./type";
import { consumableRequests } from "./requests";
import { genericActions } from "../generic/actions";

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
    console.log(e);
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
    console.log(e);
  }
}
function* createConsumableSaga(action: UpdateConsumableRequest) {
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.create,
      action.payload.consumable
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(consumableActions.createSuccess());
    }
  } catch (e) {
    console.log(e);
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
    }
  } catch (e) {
    console.log(e);
  }
}
function* removeConsumableSaga(action: FetchConsumableRequest) {
  try {
    const { message, success }: IResponse = yield call(
      consumableRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(consumableActions.removeSuccess());
    }
  } catch (e) {
    console.log(e);
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
