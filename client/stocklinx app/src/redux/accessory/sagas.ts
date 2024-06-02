import { call, put, takeEvery } from "redux-saga/effects";
import { accessoryActions } from "./actions";
import { IAccessory, IUserProduct } from "@interfaces/serverInterfaces";
import { accessoryConst } from "./constant";
import {
  CheckInAccessoryRequest,
  CheckOutAccessoryRequest,
  CreateAccessoryRequest,
  CreateRangeAccessoryRequest,
  FetchAccessoryRequest,
  FilterAccessoriesRequest,
  RemoveAccessoryRequest,
  RemoveRangeAccessoryRequest,
  UpdateAccessoryRequest,
} from "./type";
import { accessoryRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "@/notification/Notification";
import { userProductActions } from "../userProduct/actions";

type IResponse = {
  data: IAccessory[] | IAccessory | IUserProduct | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchAccessoriesSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(accessoryRequests.getAll);
    yield put(
      accessoryActions.getAllSuccess({
        accessories: data as IAccessory[],
      })
    );
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchAccessorySaga(action: FetchAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      accessoryRequests.get,
      action.payload.id
    );
    yield put(
      accessoryActions.getSuccess({
        accessory: data as IAccessory,
      })
    );
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createAccessorySaga(action: CreateAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      accessoryRequests.create,
      action.payload.accessory
    );
    openNotificationSuccess("Accessory Created");
    yield put(
      accessoryActions.createSuccess({ accessory: data as IAccessory })
    );
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeAccessorySaga(action: CreateRangeAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      accessoryRequests.createRange,
      action.payload.accessories
    );
    openNotificationSuccess("Accessories Created");
    yield put(
      accessoryActions.createRangeSuccess({
        accessories: data as IAccessory[],
      })
    );
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateAccessorySaga(action: UpdateAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      accessoryRequests.update,
      action.payload.accessory
    );
    openNotificationSuccess("Accessory Updated");
    yield put(
      accessoryActions.updateSuccess({ accessory: data as IAccessory })
    );
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeAccessorySaga(action: RemoveAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(accessoryRequests.remove, action.payload.id);
    openNotificationSuccess("Accessory Removed");
    yield put(accessoryActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeAccessorySaga(action: RemoveRangeAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(accessoryRequests.removeRange, action.payload.ids);
    openNotificationSuccess("Accessories Removed");
    yield put(accessoryActions.removeRangeSuccess({ ids: action.payload.ids }));
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* checkInAccessorySaga(action: CheckInAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      accessoryRequests.checkIn,
      action.payload.checkInDto
    );
    openNotificationSuccess("Accessory Checked In");
    yield put(
      userProductActions.createSuccess({
        userProduct: data as IUserProduct,
      })
    );
    yield put(
      accessoryActions.checkInSuccess({
        id: action.payload.checkInDto.productId,
        quantity: action.payload.checkInDto.quantity,
      })
    );
    if (action.payload.onSubmit) action.payload.onSubmit();
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.checkInFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* checkOutAccessorySaga(action: CheckOutAccessoryRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(accessoryRequests.checkOut, action.payload.checkOutDto);
    openNotificationSuccess("Accessory Checked Out");
    yield put(
      userProductActions.removeSuccess({
        id: action.payload.checkOutDto.userProductId,
      })
    );
    yield put(
      accessoryActions.checkOutSuccess({
        id: action.payload.checkOutDto.productId,
        quantity: action.payload.checkOutDto.quantity,
      })
    );
    if (action.payload.onSubmit) action.payload.onSubmit();
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.checkOutFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* filterAccessoriesSaga(action: FilterAccessoriesRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      accessoryRequests.filter,
      action.payload
    );
    yield put(
      accessoryActions.filterSuccess({
        accessories: data as IAccessory[],
      })
    );
  } catch (e) {
    openNotificationError("Accessory", (e as Error).message);
    yield put(accessoryActions.filterFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* accessorysaga() {
  yield takeEvery(
    accessoryConst.FETCH_ACCESSORIES_REQUEST,
    fetchAccessoriesSaga
  );
  yield takeEvery(accessoryConst.FETCH_ACCESSORY_REQUEST, fetchAccessorySaga);
  yield takeEvery(accessoryConst.CREATE_ACCESSORY_REQUEST, createAccessorySaga);
  yield takeEvery(
    accessoryConst.CREATE_RANGE_ACCESSORY_REQUEST,
    createRangeAccessorySaga
  );
  yield takeEvery(accessoryConst.UPDATE_ACCESSORY_REQUEST, updateAccessorySaga);
  yield takeEvery(accessoryConst.REMOVE_ACCESSORY_REQUEST, removeAccessorySaga);
  yield takeEvery(
    accessoryConst.REMOVE_RANGE_ACCESSORY_REQUEST,
    removeRangeAccessorySaga
  );
  yield takeEvery(
    accessoryConst.CHECK_IN_ACCESSORY_REQUEST,
    checkInAccessorySaga
  );
  yield takeEvery(
    accessoryConst.CHECK_OUT_ACCESSORY_REQUEST,
    checkOutAccessorySaga
  );
  yield takeEvery(
    accessoryConst.FILTER_ACCESSORIES_REQUEST,
    filterAccessoriesSaga
  );
}

export default accessorysaga;
