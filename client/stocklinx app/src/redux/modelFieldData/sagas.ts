import { call, put, takeEvery } from "redux-saga/effects";
import { modelFieldDataActions } from "./actions";
import { IModelFieldData } from "../../interfaces/interfaces";
import { modelFieldDataConst } from "./constant";
import {
  CreateModelFieldDataRequest,
  CreateRangeModelFieldDataRequest,
  FetchModelFieldDataRequest,
  RemoveModelFieldDataRequest,
  RemoveRangeModelFieldDataRequest,
  UpdateModelFieldDataRequest,
} from "./type";
import { modelFieldDataRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: IModelFieldData[] | IModelFieldData | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchModelFieldDatasSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      modelFieldDataRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        modelFieldDataActions.getAllSuccess({
          modelFieldDatas: data as IModelFieldData[],
        })
      );
    }
  } catch (e) {
    openNotificationError("ModelFieldData", (e as Error).message);
    yield put(modelFieldDataActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchModelFieldDataSaga(action: FetchModelFieldDataRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      modelFieldDataRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        modelFieldDataActions.getSuccess({
          modelFieldData: data as IModelFieldData,
        })
      );
    }
  } catch (e) {
    openNotificationError("ModelFieldData", (e as Error).message);
    yield put(modelFieldDataActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createModelFieldDataSaga(action: CreateModelFieldDataRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      modelFieldDataRequests.create,
      action.payload.modelFieldData
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("ModelFieldData Created");
      yield put(modelFieldDataActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("ModelFieldData", (e as Error).message);
    yield put(modelFieldDataActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createRangeModelFieldDataSaga(
  action: CreateRangeModelFieldDataRequest
) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      modelFieldDataRequests.createRange,
      action.payload.modelFieldDatas
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("ModelFieldDatas Created");
      yield put(modelFieldDataActions.createRangeSuccess());
    }
  } catch (e) {
    openNotificationError("ModelFieldData", (e as Error).message);
    yield put(modelFieldDataActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateModelFieldDataSaga(action: UpdateModelFieldDataRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      modelFieldDataRequests.update,
      action.payload.modelFieldData
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("ModelFieldData Updated");
      yield put(modelFieldDataActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("ModelFieldData", (e as Error).message);
    yield put(modelFieldDataActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeModelFieldDataSaga(action: RemoveModelFieldDataRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      modelFieldDataRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("ModelFieldData Removed");
      yield put(modelFieldDataActions.removeSuccess({ id: action.payload.id }));
    }
  } catch (e) {
    openNotificationError("ModelFieldData", (e as Error).message);
    yield put(modelFieldDataActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeModelFieldDataSaga(
  action: RemoveRangeModelFieldDataRequest
) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      modelFieldDataRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("ModelFieldDatas Removed");
      yield put(
        modelFieldDataActions.removeRangeSuccess({ ids: action.payload.ids })
      );
    }
  } catch (e) {
    openNotificationError("ModelFieldData", (e as Error).message);
    yield put(modelFieldDataActions.removeRangeFailure());
  }
}

function* modelFieldDatasaga() {
  // yield all([
  //   takeLatest(modelFieldDataConst.FETCH_MODELFIELDDATAS_REQUEST, fetchModelFieldDatasSaga),
  // ]);
  yield takeEvery(
    modelFieldDataConst.FETCH_MODELFIELDDATAS_REQUEST,
    fetchModelFieldDatasSaga
  );
  yield takeEvery(
    modelFieldDataConst.FETCH_MODELFIELDDATA_REQUEST,
    fetchModelFieldDataSaga
  );
  yield takeEvery(
    modelFieldDataConst.CREATE_MODELFIELDDATA_REQUEST,
    createModelFieldDataSaga
  );
  yield takeEvery(
    modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_REQUEST,
    createRangeModelFieldDataSaga
  );
  yield takeEvery(
    modelFieldDataConst.UPDATE_MODELFIELDDATA_REQUEST,
    updateModelFieldDataSaga
  );
  yield takeEvery(
    modelFieldDataConst.REMOVE_MODELFIELDDATA_REQUEST,
    removeModelFieldDataSaga
  );
  yield takeEvery(
    modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_REQUEST,
    removeRangeModelFieldDataSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default modelFieldDatasaga;
