import { call, put, takeEvery } from "redux-saga/effects";
import { consumableActions } from "./actions";
import { IConsumable, IUserProduct } from "../../interfaces/serverInterfaces";
import { consumableConst } from "./constant";
import {
  CheckInConsumableRequest,
  CheckOutConsumableRequest,
  CreateConsumableRequest,
  CreateRangeConsumableRequest,
  FetchConsumableRequest,
  RemoveConsumableRequest,
  RemoveRangeConsumableRequest,
  UpdateConsumableRequest,
} from "./type";
import { consumableRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";
import { userProductActions } from "../userProduct/actions";

type IResponse = {
  data: IConsumable[] | IConsumable | IUserProduct | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchConsumablesSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(consumableRequests.getAll);
    yield put(
      consumableActions.getAllSuccess({
        consumables: data as IConsumable[],
      })
    );
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchConsumableSaga(action: FetchConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      consumableRequests.get,
      action.payload.id
    );
    yield put(
      consumableActions.getSuccess({
        consumable: data as IConsumable,
      })
    );
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createConsumableSaga(action: CreateConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      consumableRequests.create,
      action.payload.consumable
    );
    openNotificationSuccess("Consumable Created");
    yield put(
      consumableActions.createSuccess({ consumable: data as IConsumable })
    );
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeConsumableSaga(action: CreateRangeConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      consumableRequests.createRange,
      action.payload.consumables
    );
    openNotificationSuccess("Consumables Created");
    yield put(
      consumableActions.createRangeSuccess({
        consumables: data as IConsumable[],
      })
    );
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateConsumableSaga(action: UpdateConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      consumableRequests.update,
      action.payload.consumable
    );
    openNotificationSuccess("Consumable Updated");
    yield put(
      consumableActions.updateSuccess({ consumable: data as IConsumable })
    );
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeConsumableSaga(action: RemoveConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(consumableRequests.remove, action.payload.id);
    openNotificationSuccess("Consumable Removed");
    yield put(consumableActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeConsumableSaga(action: RemoveRangeConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(consumableRequests.removeRange, action.payload.ids);
    openNotificationSuccess("Consumables Removed");
    yield put(
      consumableActions.removeRangeSuccess({ ids: action.payload.ids })
    );
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* checkInConsumableSaga(action: CheckInConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      consumableRequests.checkIn,
      action.payload.checkInDto
    );
    openNotificationSuccess("Consumable Checked In");
    yield put(
      consumableActions.checkInSuccess({
        id: action.payload.checkInDto.productId,
        quantity: action.payload.checkInDto.quantity,
      })
    );
    yield put(
      userProductActions.createSuccess({
        userProduct: data as IUserProduct,
      })
    );
    if (action.payload.onSubmit) action.payload.onSubmit();
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.checkInFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* checkOutConsumableSaga(action: CheckOutConsumableRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(consumableRequests.checkOut, action.payload.checkOutDto);
    openNotificationSuccess("Consumable Checked Out");
    yield put(
      consumableActions.checkOutSuccess({
        id: action.payload.checkOutDto.productId,
        quantity: action.payload.checkOutDto.quantity,
      })
    );
    yield put(
      userProductActions.removeSuccess({
        id: action.payload.checkOutDto.userProductId,
      })
    );
    if (action.payload.onSubmit) action.payload.onSubmit();
  } catch (e) {
    openNotificationError("Consumable", (e as Error).message);
    yield put(consumableActions.checkOutFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* consumablesaga() {
  yield takeEvery(
    consumableConst.FETCH_CONSUMABLES_REQUEST,
    fetchConsumablesSaga
  );
  yield takeEvery(
    consumableConst.FETCH_CONSUMABLE_REQUEST,
    fetchConsumableSaga
  );
  yield takeEvery(
    consumableConst.CREATE_CONSUMABLE_REQUEST,
    createConsumableSaga
  );
  yield takeEvery(
    consumableConst.CREATE_RANGE_CONSUMABLE_REQUEST,
    createRangeConsumableSaga
  );
  yield takeEvery(
    consumableConst.UPDATE_CONSUMABLE_REQUEST,
    updateConsumableSaga
  );
  yield takeEvery(
    consumableConst.REMOVE_CONSUMABLE_REQUEST,
    removeConsumableSaga
  );
  yield takeEvery(
    consumableConst.REMOVE_RANGE_CONSUMABLE_REQUEST,
    removeRangeConsumableSaga
  );
  yield takeEvery(
    consumableConst.CHECK_IN_CONSUMABLE_REQUEST,
    checkInConsumableSaga
  );
  yield takeEvery(
    consumableConst.CHECK_OUT_CONSUMABLE_REQUEST,
    checkOutConsumableSaga
  );
}

export default consumablesaga;
