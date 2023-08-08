import { call, put, takeEvery } from "redux-saga/effects";
import { modelActions } from "./actions";
import { IModel } from "../../interfaces/interfaces";
import { modelConst } from "./constant";
import { FetchModelRequest, UpdateModelRequest } from "./type";
import { modelRequests } from "./requests";

interface IResponse {
  data: IModel[] | IModel | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchModelsSaga() {
  try {
    const { data, message, success }: IResponse = yield call(
      modelRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        modelActions.getAllSuccess({
          models: data as IModel[],
        })
      );
    }
  } catch (e) {
    yield put(
      modelActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchModelSaga(action: FetchModelRequest) {
  try {
    const { data, message, success }: IResponse = yield call(
      modelRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        modelActions.getSuccess({
          model: data as IModel,
        })
      );
    }
  } catch (e) {
    yield put(
      modelActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createModelSaga(action: UpdateModelRequest) {
  try {
    const { message, success }: IResponse = yield call(
      createModel,
      action.payload.model
    );
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(modelActions.createSuccess());
    }
  } catch (e) {
    yield put(
      modelActions.createFailure({
        error: e.message as string,
      })
    );
  }
}
function* updateModelSaga(action: UpdateModelRequest) {
  try {
    const { message, success }: IResponse = yield call(
      modelRequests.update,
      action.payload.model
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(modelActions.updateSuccess());
    }
  } catch (e) {
    yield put(
      modelActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeModelSaga(action: FetchModelRequest) {
  try {
    const { message, success }: IResponse = yield call(
      modelRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(modelActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      modelActions.removeFailure({
        error: e.message as string,
      })
    );
  }
}

function* modelsaga() {
  // yield all([
  //   takeLatest(modelConst.FETCH_MODELS_REQUEST, fetchModelsSaga),
  // ]);
  yield takeEvery(modelConst.FETCH_MODELS_REQUEST, fetchModelsSaga);
  yield takeEvery(modelConst.FETCH_MODEL_REQUEST, fetchModelSaga);
  yield takeEvery(modelConst.CREATE_MODEL_REQUEST, createModelSaga);
  yield takeEvery(modelConst.UPDATE_MODEL_REQUEST, updateModelSaga);
  yield takeEvery(modelConst.REMOVE_MODEL_REQUEST, removeModelSaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default modelsaga;
