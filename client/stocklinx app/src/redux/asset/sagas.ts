import { call, put, takeEvery } from "redux-saga/effects";
import { assetActions } from "./actions";
import { IAsset, IUserProduct } from "../../interfaces/serverInterfaces";
import { assetConst } from "./constant";
import {
  CheckInAssetRequest,
  CheckOutAssetRequest,
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
import { userProductActions } from "../userProduct/actions";

type IResponse = {
  data: IAsset[] | IAsset | IUserProduct | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchAssetsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(assetRequests.getAll);
    yield put(
      assetActions.getAllSuccess({
        assets: data as IAsset[],
      })
    );
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchAssetSaga(action: FetchAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      assetRequests.get,
      action.payload.id
    );
    yield put(
      assetActions.getSuccess({
        asset: data as IAsset,
      })
    );
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createAssetSaga(action: CreateAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      assetRequests.create,
      action.payload.asset
    );
    openNotificationSuccess("Asset Created");
    yield put(assetActions.createSuccess({ assets: data as IAsset[] }));
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeAssetSaga(action: CreateRangeAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      assetRequests.createRange,
      action.payload.assets
    );
    openNotificationSuccess("Assets Created");
    yield put(assetActions.createRangeSuccess({ assets: data as IAsset[] }));
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateAssetSaga(action: UpdateAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      assetRequests.update,
      action.payload.asset
    );
    openNotificationSuccess("Asset Updated");
    yield put(assetActions.updateSuccess({ asset: data as IAsset }));
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeAssetSaga(action: RemoveAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(assetRequests.remove, action.payload.id);
    openNotificationSuccess("Asset Removed");
    yield put(assetActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeAssetSaga(action: RemoveRangeAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(assetRequests.removeRange, action.payload.ids);
    openNotificationSuccess("Assets Removed");
    yield put(assetActions.removeRangeSuccess({ ids: action.payload.ids }));
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* checkInAssetSaga(action: CheckInAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      assetRequests.checkIn,
      action.payload.checkInDto
    );
    openNotificationSuccess("Asset Checked In");
    yield put(assetActions.checkInSuccess(action.payload));
    yield put(
      userProductActions.createSuccess({
        userProduct: data as IUserProduct,
      })
    );
    if (action.payload.onSubmit) action.payload.onSubmit();
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.checkInFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* checkOutAssetSaga(action: CheckOutAssetRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(assetRequests.checkOut, action.payload.checkOutDto);
    openNotificationSuccess("Asset Checked Out");
    yield put(assetActions.checkOutSuccess(action.payload));
    yield put(
      userProductActions.removeSuccess({
        id: action.payload.checkOutDto.userProductId,
      })
    );
    if (action.payload.onSubmit) action.payload.onSubmit();
  } catch (e) {
    openNotificationError("Asset", (e as Error).message);
    yield put(assetActions.checkOutFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* assetsaga() {
  yield takeEvery(assetConst.FETCH_ASSETS_REQUEST, fetchAssetsSaga);
  yield takeEvery(assetConst.FETCH_ASSET_REQUEST, fetchAssetSaga);
  yield takeEvery(assetConst.CREATE_ASSET_REQUEST, createAssetSaga);
  yield takeEvery(assetConst.CREATE_RANGE_ASSET_REQUEST, createRangeAssetSaga);
  yield takeEvery(assetConst.UPDATE_ASSET_REQUEST, updateAssetSaga);
  yield takeEvery(assetConst.REMOVE_ASSET_REQUEST, removeAssetSaga);
  yield takeEvery(assetConst.REMOVE_RANGE_ASSET_REQUEST, removeRangeAssetSaga);
  yield takeEvery(assetConst.CHECK_IN_ASSET_REQUEST, checkInAssetSaga);
  yield takeEvery(assetConst.CHECK_OUT_ASSET_REQUEST, checkOutAssetSaga);
}

export default assetsaga;
