import { call, put, takeEvery } from "redux-saga/effects";
import { assetActions } from "./actions";
import { IAsset } from "../../interfaces/interfaces";
import { assetConst } from "./constant";
import { FetchAssetRequest, UpdateAssetRequest } from "./type";
import { assetRequests } from "./requests";
import { genericActions } from "../generic/actions";

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
    console.log(e);
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
      throw new Error(message as string);
    } else {
      yield put(
        assetActions.getSuccess({
          asset: data as IAsset,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}
function* createAssetSaga(action: UpdateAssetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.create,
      action.payload.asset
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(assetActions.createSuccess());
    }
  } catch (e) {
    console.log(e);
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
    }
  } catch (e) {
    console.log(e);
  }
}
function* removeAssetSaga(action: FetchAssetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      assetRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(assetActions.removeSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}

function* assetsaga() {
  // yield all([
  //   takeLatest(assetConst.FETCH_ASSETS_REQUEST, fetchAssetsSaga),
  // ]);
  yield takeEvery(assetConst.FETCH_ASSETS_REQUEST, fetchAssetsSaga);
  yield takeEvery(assetConst.FETCH_ASSET_REQUEST, fetchAssetSaga);
  yield takeEvery(assetConst.CREATE_ASSET_REQUEST, createAssetSaga);
  yield takeEvery(assetConst.UPDATE_ASSET_REQUEST, updateAssetSaga);
  yield takeEvery(assetConst.REMOVE_ASSET_REQUEST, removeAssetSaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default assetsaga;
