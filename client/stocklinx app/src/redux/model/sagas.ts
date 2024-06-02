import { call, put, takeEvery } from "redux-saga/effects";
import { modelActions } from "./actions";
import { IModel } from "@interfaces/serverInterfaces";
import { modelConst } from "./constant";
import {
  CreateModelRequest,
  CreateRangeModelRequest,
  FetchModelRequest,
  FilterModelsRequest,
  RemoveModelRequest,
  RemoveRangeModelRequest,
  UpdateModelRequest,
} from "./type";
import { modelRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "@/notification/Notification";

type IResponse = {
  data: IModel[] | IModel | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchModelsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(modelRequests.getAll);
    yield put(
      modelActions.getAllSuccess({
        models: data as IModel[],
      })
    );
  } catch (e) {
    openNotificationError("Model", (e as Error).message);
    yield put(modelActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchModelSaga(action: FetchModelRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      modelRequests.get,
      action.payload.id
    );
    yield put(
      modelActions.getSuccess({
        model: data as IModel,
      })
    );
  } catch (e) {
    openNotificationError("Model", (e as Error).message);
    yield put(modelActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createModelSaga(action: CreateModelRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      modelRequests.create,
      action.payload.model
    );
    openNotificationSuccess("Model Created");
    yield put(modelActions.createSuccess({ model: data as IModel }));
  } catch (e) {
    openNotificationError("Model", (e as Error).message);
    yield put(modelActions.createFailure());
    yield put(genericActions.decreaseLoading());
  }
}

function* createRangeModelSaga(action: CreateRangeModelRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      modelRequests.createRange,
      action.payload.models
    );
    openNotificationSuccess("Models Created");
    yield put(modelActions.createRangeSuccess({ models: data as IModel[] }));
  } catch (e) {
    openNotificationError("Model", (e as Error).message);
    yield put(modelActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateModelSaga(action: UpdateModelRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(modelRequests.update, action.payload.model);
    openNotificationSuccess("Model Updated");
    yield put(modelActions.updateSuccess());
  } catch (e) {
    openNotificationError("Model", (e as Error).message);
    yield put(modelActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeModelSaga(action: RemoveModelRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(modelRequests.remove, action.payload.id);
    openNotificationSuccess("Model Removed");
    yield put(modelActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("Model", (e as Error).message);
    yield put(modelActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeModelSaga(action: RemoveRangeModelRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(modelRequests.removeRange, action.payload.ids);
    openNotificationSuccess("Models Removed");
    yield put(modelActions.removeRangeSuccess({ ids: action.payload.ids }));
  } catch (e) {
    openNotificationError("Model", (e as Error).message);
    yield put(modelActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* filterModelsSaga(action: FilterModelsRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      modelRequests.filter,
      action.payload
    );
    yield put(
      modelActions.filterSuccess({
        models: data as IModel[],
      })
    );
  } catch (e) {
    openNotificationError("Model", (e as Error).message);
    yield put(modelActions.filterFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* modelsaga() {
  yield takeEvery(modelConst.FETCH_MODELS_REQUEST, fetchModelsSaga);
  yield takeEvery(modelConst.FETCH_MODEL_REQUEST, fetchModelSaga);
  yield takeEvery(modelConst.CREATE_MODEL_REQUEST, createModelSaga);
  yield takeEvery(modelConst.CREATE_RANGE_MODEL_REQUEST, createRangeModelSaga);
  yield takeEvery(modelConst.UPDATE_MODEL_REQUEST, updateModelSaga);
  yield takeEvery(modelConst.REMOVE_MODEL_REQUEST, removeModelSaga);
  yield takeEvery(modelConst.REMOVE_RANGE_MODEL_REQUEST, removeRangeModelSaga);
  yield takeEvery(modelConst.FILTER_MODELS_REQUEST, filterModelsSaga);
}

export default modelsaga;
