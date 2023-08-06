import { call, put, takeEvery } from "redux-saga/effects";
import { assetActions } from "./actions";
import { IAsset } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { assetConst } from "./constant";
import { FetchAssetRequest, UpdateAssetRequest } from "./type";
const requestUrl = "Asset/";

const fetchAssets = () => {
  return request<IAsset>({ requestUrl: requestUrl, apiType: "get" });
};
const fetchAsset = (id: string) => {
  return request<IAsset>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const createAsset = (asset: IAsset) => {
  return request<IAsset>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: asset,
  });
};
const updateAsset = (asset: IAsset) => {
  return request<IAsset>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: asset,
  });
};
const removeAsset = (id: string) => {
  return request<IAsset>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

function* fetchAssetsSaga() {
  try {
    const { data, message, success, status }: BackendResponse<IAsset> =
      yield call(fetchAssets);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        assetActions.getAllSuccess({
          assets: data as IAsset[],
        })
      );
    }
  } catch (e) {
    yield put(
      assetActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchAssetSaga(action: FetchAssetRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IAsset> =
      yield call(fetchAsset, action.payload.id);
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
    yield put(
      assetActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createAssetSaga(action: UpdateAssetRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IAsset> =
      yield call(createAsset, action.payload.asset);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(assetActions.createSuccess());
    }
  } catch (e) {
    yield put(
      assetActions.createFailure({
        error: e.message as string,
      })
    );
  }
}
function* updateAssetSaga(action: UpdateAssetRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IAsset> =
      yield call(updateAsset, action.payload.asset);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(assetActions.updateSuccess());
    }
  } catch (e) {
    yield put(
      assetActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeAssetSaga(action: FetchAssetRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IAsset> =
      yield call(removeAsset, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(assetActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      assetActions.removeFailure({
        error: e.message as string,
      })
    );
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
