import { call, put, takeEvery } from "redux-saga/effects";
import { consumableActions } from "./actions";
import { IConsumable } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { consumableConst } from "./constant";
import { FetchConsumableRequest, UpdateConsumableRequest } from "./type";
const requestUrl = "Consumable/";

const fetchConsumables = () => {
  return request<IConsumable>({ requestUrl: requestUrl, apiType: "get" });
};
const fetchConsumable = (id: string) => {
  return request<IConsumable>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const createConsumable = (consumable: IConsumable) => {
  return request<IConsumable>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: consumable,
  });
};
const updateConsumable = (consumable: IConsumable) => {
  return request<IConsumable>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: consumable,
  });
};
const removeConsumable = (id: string) => {
  return request<IConsumable>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

function* fetchConsumablesSaga() {
  try {
    const { data, message, success, status }: BackendResponse<IConsumable> =
      yield call(fetchConsumables);
    if (success !== undefined && !success) {
      throw new Error(message as string);
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
    const { data, message, success, status }: BackendResponse<IConsumable> =
      yield call(fetchConsumable, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
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
    const { data, message, success, status }: BackendResponse<IConsumable> =
      yield call(createConsumable, action.payload.consumable);
    if (success !== undefined && !success) {
      throw new Error(message as string);
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
    const { data, message, success, status }: BackendResponse<IConsumable> =
      yield call(updateConsumable, action.payload.consumable);
    if (success !== undefined && !success) {
      throw new Error(message as string);
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
    const { data, message, success, status }: BackendResponse<IConsumable> =
      yield call(removeConsumable, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
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
