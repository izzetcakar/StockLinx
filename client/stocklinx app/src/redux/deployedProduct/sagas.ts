import { call, put, takeEvery } from "redux-saga/effects";
import { IDeployedProduct } from "../../interfaces/serverInterfaces";
import { deployedProductConst } from "./constant";
import {
  CreateDeployedProductRequest,
  CreateRangeDeployedProductRequest,
  FetchDeployedProductRequest,
  RemoveDeployedProductRequest,
  RemoveRangeDeployedProductRequest,
  UpdateDeployedProductRequest,
} from "./type";
import { deployedProductRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";
import { deployedProductActions } from "../deployedProduct/actions";

interface IResponse {
  data: IDeployedProduct[] | IDeployedProduct | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchDeployedProductsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      deployedProductRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        deployedProductActions.getAllSuccess({
          deployedProducts: data as IDeployedProduct[],
        })
      );
    }
  } catch (e) {
    openNotificationError("DeployedProduct", (e as Error).message);
    yield put(deployedProductActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchDeployedProductSaga(action: FetchDeployedProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      deployedProductRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        deployedProductActions.getSuccess({
          deployedProduct: data as IDeployedProduct,
        })
      );
    }
  } catch (e) {
    openNotificationError("DeployedProduct", (e as Error).message);
    yield put(deployedProductActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createDeployedProductSaga(action: CreateDeployedProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      deployedProductRequests.create,
      action.payload.deployedProduct
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("DeployedProduct Created");
      yield put(
        deployedProductActions.createSuccess({
          deployedProduct: data as IDeployedProduct,
        })
      );
    }
  } catch (e) {
    openNotificationError("DeployedProduct", (e as Error).message);
    yield put(deployedProductActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createRangeDeployedProductSaga(
  action: CreateRangeDeployedProductRequest
) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      deployedProductRequests.createRange,
      action.payload.deployedProducts
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("DeployedProducts Created");
      yield put(
        deployedProductActions.createRangeSuccess({
          deployedProducts: data as IDeployedProduct[],
        })
      );
    }
  } catch (e) {
    openNotificationError("DeployedProduct", (e as Error).message);
    yield put(deployedProductActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* updateDeployedProductSaga(action: UpdateDeployedProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      deployedProductRequests.update,
      action.payload.deployedProduct
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("DeployedProduct Updated");
      yield put(
        deployedProductActions.updateSuccess({
          deployedProduct: data as IDeployedProduct,
        })
      );
    }
  } catch (e) {
    openNotificationError("DeployedProduct", (e as Error).message);
    yield put(deployedProductActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeDeployedProductSaga(action: RemoveDeployedProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      deployedProductRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("DeployedProduct Removed");
      yield put(
        deployedProductActions.removeSuccess({ id: action.payload.id })
      );
    }
  } catch (e) {
    openNotificationError("DeployedProduct", (e as Error).message);
    yield put(deployedProductActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeDeployedProductSaga(
  action: RemoveRangeDeployedProductRequest
) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      deployedProductRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("DeployedProducts Removed");
      yield put(
        deployedProductActions.removeRangeSuccess({ ids: action.payload.ids })
      );
    }
  } catch (e) {
    openNotificationError("DeployedProduct", (e as Error).message);
    yield put(deployedProductActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* deployedProductSaga() {
  // yield all([
  //   takeLatest(deployedProductConst.FETCH_DEPLOYEDPRODUCTS_REQUEST, fetchDeployedProductsSaga),
  // ]);
  yield takeEvery(
    deployedProductConst.FETCH_DEPLOYEDPRODUCTS_REQUEST,
    fetchDeployedProductsSaga
  );
  yield takeEvery(
    deployedProductConst.FETCH_DEPLOYEDPRODUCT_REQUEST,
    fetchDeployedProductSaga
  );
  yield takeEvery(
    deployedProductConst.CREATE_DEPLOYEDPRODUCT_REQUEST,
    createDeployedProductSaga
  );
  yield takeEvery(
    deployedProductConst.CREATE_RANGE_DEPLOYEDPRODUCT_REQUEST,
    createRangeDeployedProductSaga
  );
  yield takeEvery(
    deployedProductConst.UPDATE_DEPLOYEDPRODUCT_REQUEST,
    updateDeployedProductSaga
  );
  yield takeEvery(
    deployedProductConst.REMOVE_DEPLOYEDPRODUCT_REQUEST,
    removeDeployedProductSaga
  );
  yield takeEvery(
    deployedProductConst.REMOVE_RANGE_DEPLOYEDPRODUCT_REQUEST,
    removeRangeDeployedProductSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default deployedProductSaga;
