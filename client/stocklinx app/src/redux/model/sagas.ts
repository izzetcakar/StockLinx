import { call, put, takeEvery } from "redux-saga/effects";
import { modelActions } from "./actions";
import { IModel } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { modelConst } from "./constant";
import { FetchModelRequest, UpdateModelRequest } from "./type";
const requestUrl = "Model/";

const fetchModels = () => {
  return request<IModel>({ requestUrl: requestUrl, apiType: "get" });
};
const fetchModel = (id: string) => {
  return request<IModel>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const createModel = (model: IModel) => {
  return request<IModel>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: model,
  });
};
const updateModel = (model: IModel) => {
  return request<IModel>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: model,
  });
};
const removeModel = (id: string) => {
  return request<IModel>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

function* fetchModelsSaga() {
  try {
    const { data, message, success, status }: BackendResponse<IModel> =
      yield call(fetchModels);
    if (success !== undefined && !success) {
      throw new Error(message as string);
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
    const { data, message, success, status }: BackendResponse<IModel> =
      yield call(fetchModel, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
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
    const { data, message, success, status }: BackendResponse<IModel> =
      yield call(createModel, action.payload.model);
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
    const { data, message, success, status }: BackendResponse<IModel> =
      yield call(updateModel, action.payload.model);
    if (success !== undefined && !success) {
      throw new Error(message as string);
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
    const { data, message, success, status }: BackendResponse<IModel> =
      yield call(removeModel, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
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
