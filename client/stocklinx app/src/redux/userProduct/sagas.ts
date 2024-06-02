import { call, put, takeEvery } from "redux-saga/effects";
import { IUserProduct } from "@interfaces/serverInterfaces";
import { userProductConst } from "./constant";
import {
  CreateUserProductRequest,
  CreateRangeUserProductRequest,
  FetchUserProductRequest,
  RemoveUserProductRequest,
  RemoveRangeUserProductRequest,
  UpdateUserProductRequest,
  FilterUserProductsRequest,
} from "./type";
import { userProductRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "@/notification/Notification";
import { userProductActions } from "./actions";

type IResponse = {
  data: IUserProduct[] | IUserProduct | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchUserProductsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(userProductRequests.getAll);
    yield put(
      userProductActions.getAllSuccess({
        userProducts: data as IUserProduct[],
      })
    );
  } catch (e) {
    openNotificationError("UserProduct", (e as Error).message);
    yield put(userProductActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchUserProductSaga(action: FetchUserProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      userProductRequests.get,
      action.payload.id
    );
    yield put(
      userProductActions.getSuccess({
        userProduct: data as IUserProduct,
      })
    );
  } catch (e) {
    openNotificationError("UserProduct", (e as Error).message);
    yield put(userProductActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createUserProductSaga(action: CreateUserProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      userProductRequests.create,
      action.payload.userProduct
    );
    openNotificationSuccess("UserProduct Created");
    yield put(
      userProductActions.createSuccess({
        userProduct: data as IUserProduct,
      })
    );
  } catch (e) {
    openNotificationError("UserProduct", (e as Error).message);
    yield put(userProductActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeUserProductSaga(action: CreateRangeUserProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      userProductRequests.createRange,
      action.payload.userProducts
    );
    openNotificationSuccess("UserProducts Created");
    yield put(
      userProductActions.createRangeSuccess({
        userProducts: data as IUserProduct[],
      })
    );
  } catch (e) {
    openNotificationError("UserProduct", (e as Error).message);
    yield put(userProductActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateUserProductSaga(action: UpdateUserProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      userProductRequests.update,
      action.payload.userProduct
    );
    openNotificationSuccess("UserProduct Updated");
    yield put(
      userProductActions.updateSuccess({
        userProduct: data as IUserProduct,
      })
    );
  } catch (e) {
    openNotificationError("UserProduct", (e as Error).message);
    yield put(userProductActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeUserProductSaga(action: RemoveUserProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(userProductRequests.remove, action.payload.id);
    openNotificationSuccess("UserProduct Removed");
    yield put(userProductActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("UserProduct", (e as Error).message);
    yield put(userProductActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeUserProductSaga(action: RemoveRangeUserProductRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(userProductRequests.removeRange, action.payload.ids);
    openNotificationSuccess("UserProducts Removed");
    yield put(
      userProductActions.removeRangeSuccess({ ids: action.payload.ids })
    );
  } catch (e) {
    openNotificationError("UserProduct", (e as Error).message);
    yield put(userProductActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* filterUserProductsSaga(action: FilterUserProductsRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      userProductRequests.filter,
      action.payload
    );
    yield put(
      userProductActions.filterSuccess({
        userProducts: data as IUserProduct[],
      })
    );
  } catch (e) {
    openNotificationError("UserProduct", (e as Error).message);
    yield put(userProductActions.filterFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* userProductSaga() {
  yield takeEvery(
    userProductConst.FETCH_USERPRODUCTS_REQUEST,
    fetchUserProductsSaga
  );
  yield takeEvery(
    userProductConst.FETCH_USERPRODUCT_REQUEST,
    fetchUserProductSaga
  );
  yield takeEvery(
    userProductConst.CREATE_USERPRODUCT_REQUEST,
    createUserProductSaga
  );
  yield takeEvery(
    userProductConst.CREATE_RANGE_USERPRODUCT_REQUEST,
    createRangeUserProductSaga
  );
  yield takeEvery(
    userProductConst.UPDATE_USERPRODUCT_REQUEST,
    updateUserProductSaga
  );
  yield takeEvery(
    userProductConst.REMOVE_USERPRODUCT_REQUEST,
    removeUserProductSaga
  );
  yield takeEvery(
    userProductConst.REMOVE_RANGE_USERPRODUCT_REQUEST,
    removeRangeUserProductSaga
  );
  yield takeEvery(
    userProductConst.FILTER_USERPRODUCTS_REQUEST,
    filterUserProductsSaga
  );
}

export default userProductSaga;
