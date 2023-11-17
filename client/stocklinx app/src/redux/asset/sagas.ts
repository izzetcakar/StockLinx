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
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchAssetSaga(action: FetchAssetRequest) {
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
  }
}
function* createAssetSaga(action: CreateAssetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.create,
      action.payload.asset
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(assetActions.createSuccess());
      openNotificationSuccess("Asset Created");
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
  }
}
function* createRangeAssetSaga(action: CreateRangeAssetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.createRange,
      action.payload.assets
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(assetActions.createRangeSuccess());
      openNotificationSuccess("Assets Created");
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
  }
}

function* updateAssetSaga(action: UpdateAssetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.update,
      action.payload.asset
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(assetActions.updateSuccess());
      openNotificationSuccess("Asset Updated");
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
  }
}
function* removeAssetSaga(action: RemoveAssetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(assetActions.removeSuccess({ id: action.payload.id }));
      openNotificationSuccess("Asset Removed");
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
  }
}
function* removeRangeAssetSaga(action: RemoveRangeAssetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(assetActions.removeRangeSuccess({ ids: action.payload.ids }));
      openNotificationSuccess("Assets Removed");
    }
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
  }
}

function* assetsaga() {
  // yield all([
  //   takeLatest(assetConst.FETCH_ASSETS_REQUEST, fetchAssetsSaga),
  // ]);
  yield takeEvery(assetConst.FETCH_ASSETS_REQUEST, fetchAssetsSaga);
  yield takeEvery(assetConst.FETCH_ASSET_REQUEST, fetchAssetSaga);
  yield takeEvery(assetConst.CREATE_ASSET_REQUEST, createAssetSaga);
  yield takeEvery(
    assetConst.CREATE_RANGE_ASSET_REQUEST,
    createRangeAssetSaga
  );
  yield takeEvery(assetConst.UPDATE_ASSET_REQUEST, updateAssetSaga);
  yield takeEvery(assetConst.REMOVE_ASSET_REQUEST, removeAssetSaga);
  yield takeEvery(
    assetConst.REMOVE_RANGE_ASSET_REQUEST,
    removeRangeAssetSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default assetsaga;
