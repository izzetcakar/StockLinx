import { call, put, takeEvery } from "redux-saga/effects";
import { IAssetProduct } from "../../interfaces/serverInterfaces";
import { assetProductConst } from "./constant";
import {
  CreateAssetProductRequest,
  CreateRangeAssetProductRequest,
  FetchAssetProductRequest,
  RemoveAssetProductRequest,
  RemoveRangeAssetProductRequest,
  UpdateAssetProductRequest,
} from "./type";
import { assetProductRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";
import { assetProductActions } from "./actions";

type IResponse = {
  data: IAssetProduct[] | IAssetProduct | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchAssetProductsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(assetProductRequests.getAll);
    yield put(
      assetProductActions.getAllSuccess({
        assetProducts: data as IAssetProduct[],
      })
    );
  } catch (e) {
    openNotificationError("AssetProduct", (e as Error).message);
    yield put(assetProductActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchAssetProductSaga(action: FetchAssetProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      assetProductRequests.get,
      action.payload.id
    );
    yield put(
      assetProductActions.getSuccess({
        assetProduct: data as IAssetProduct,
      })
    );
  } catch (e) {
    openNotificationError("AssetProduct", (e as Error).message);
    yield put(assetProductActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createAssetProductSaga(action: CreateAssetProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      assetProductRequests.create,
      action.payload.assetProduct
    );
    openNotificationSuccess("AssetProduct Created");
    yield put(
      assetProductActions.createSuccess({
        assetProduct: data as IAssetProduct,
      })
    );
  } catch (e) {
    openNotificationError("AssetProduct", (e as Error).message);
    yield put(assetProductActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeAssetProductSaga(action: CreateRangeAssetProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      assetProductRequests.createRange,
      action.payload.assetProducts
    );
    openNotificationSuccess("AssetProducts Created");
    yield put(
      assetProductActions.createRangeSuccess({
        assetProducts: data as IAssetProduct[],
      })
    );
  } catch (e) {
    openNotificationError("AssetProduct", (e as Error).message);
    yield put(assetProductActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateAssetProductSaga(action: UpdateAssetProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      assetProductRequests.update,
      action.payload.assetProduct
    );

    openNotificationSuccess("AssetProduct Updated");
    yield put(
      assetProductActions.updateSuccess({
        assetProduct: data as IAssetProduct,
      })
    );
  } catch (e) {
    openNotificationError("AssetProduct", (e as Error).message);
    yield put(assetProductActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeAssetProductSaga(action: RemoveAssetProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(assetProductRequests.remove, action.payload.id);
    openNotificationSuccess("AssetProduct Removed");
    yield put(assetProductActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("AssetProduct", (e as Error).message);
    yield put(assetProductActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeAssetProductSaga(action: RemoveRangeAssetProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(assetProductRequests.removeRange, action.payload.ids);
    openNotificationSuccess("AssetProducts Removed");
    yield put(
      assetProductActions.removeRangeSuccess({ ids: action.payload.ids })
    );
  } catch (e) {
    openNotificationError("AssetProduct", (e as Error).message);
    yield put(assetProductActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* assetProductSaga() {
  yield takeEvery(
    assetProductConst.FETCH_ASSETPRODUCTS_REQUEST,
    fetchAssetProductsSaga
  );
  yield takeEvery(
    assetProductConst.FETCH_ASSETPRODUCT_REQUEST,
    fetchAssetProductSaga
  );
  yield takeEvery(
    assetProductConst.CREATE_ASSETPRODUCT_REQUEST,
    createAssetProductSaga
  );
  yield takeEvery(
    assetProductConst.CREATE_RANGE_ASSETPRODUCT_REQUEST,
    createRangeAssetProductSaga
  );
  yield takeEvery(
    assetProductConst.UPDATE_ASSETPRODUCT_REQUEST,
    updateAssetProductSaga
  );
  yield takeEvery(
    assetProductConst.REMOVE_ASSETPRODUCT_REQUEST,
    removeAssetProductSaga
  );
  yield takeEvery(
    assetProductConst.REMOVE_RANGE_ASSETPRODUCT_REQUEST,
    removeRangeAssetProductSaga
  );
}

export default assetProductSaga;
