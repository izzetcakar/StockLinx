import { call, put, takeEvery } from "redux-saga/effects";
import { assetActions } from "./actions";
import { IAsset } from "../../interfaces/interfaces";
import { assetConst } from "./constant";
import {
  CreateAssetRequest,
  CreateRangeAssetRequest,
  FetchAssetRequest,
  RemoveAssetRequest,
  RemoveRangeAssetRequest,
  UpdateAssetRequest,
} from "./type";
import { assetRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: IAsset[] | IAsset | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchAssetsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      assetRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        assetActions.getAllSuccess({
          assets: data as IAsset[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchAssetSaga(action: FetchAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      assetRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        assetActions.getSuccess({
          asset: data as IAsset,
        })
      );
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createAssetSaga(action: CreateAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.create,
      action.payload.asset
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Asset Created");
      yield put(assetActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createRangeAssetSaga(action: CreateRangeAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.createRange,
      action.payload.assets
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Assets Created");
      yield put(assetActions.createRangeSuccess());
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateAssetSaga(action: UpdateAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.update,
      action.payload.asset
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Asset Updated");
      yield put(assetActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeAssetSaga(action: RemoveAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Asset Removed");
      yield put(assetActions.removeSuccess({ id: action.payload.id }));
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeAssetSaga(action: RemoveRangeAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Assets Removed");
      yield put(assetActions.removeRangeSuccess({ ids: action.payload.ids }));
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* assetsaga() {
  // yield all([
  //   takeLatest(assetConst.FETCH_ASSETS_REQUEST, fetchAssetsSaga),
  // ]);
  yield takeEvery(assetConst.FETCH_ASSETS_REQUEST, fetchAssetsSaga);
  yield takeEvery(assetConst.FETCH_ASSET_REQUEST, fetchAssetSaga);
  yield takeEvery(assetConst.CREATE_ASSET_REQUEST, createAssetSaga);
  yield takeEvery(assetConst.CREATE_RANGE_ASSET_REQUEST, createRangeAssetSaga);
  yield takeEvery(assetConst.UPDATE_ASSET_REQUEST, updateAssetSaga);
  yield takeEvery(assetConst.REMOVE_ASSET_REQUEST, removeAssetSaga);
  yield takeEvery(assetConst.REMOVE_RANGE_ASSET_REQUEST, removeRangeAssetSaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default assetsaga;
