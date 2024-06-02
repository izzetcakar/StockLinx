import { call, put, takeEvery } from "redux-saga/effects";
import { componentActions } from "./actions";
import { IComponent } from "@interfaces/serverInterfaces";
import { componentConst } from "./constant";
import {
  CheckInComponentRequest,
  CheckOutComponentRequest,
  ComponentCheckInSuccessPayload,
  CreateComponentRequest,
  CreateRangeComponentRequest,
  FetchComponentRequest,
  FilterComponentsRequest,
  RemoveComponentRequest,
  RemoveRangeComponentRequest,
  UpdateComponentRequest,
} from "./type";
import { componentRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "@/notification/Notification";
import { userProductActions } from "../userProduct/actions";
import { assetProductActions } from "../assetProduct/actions";

type IResponse = {
  data: IComponent[] | IComponent | ComponentCheckInSuccessPayload | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchComponentsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(componentRequests.getAll);
    yield put(
      componentActions.getAllSuccess({
        components: data as IComponent[],
      })
    );
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
    yield put(componentActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchComponentSaga(action: FetchComponentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      componentRequests.get,
      action.payload.id
    );
    yield put(
      componentActions.getSuccess({
        component: data as IComponent,
      })
    );
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
    yield put(componentActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createComponentSaga(action: CreateComponentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      componentRequests.create,
      action.payload.component
    );

    openNotificationSuccess("Component Created");
    yield put(
      componentActions.createSuccess({ component: data as IComponent })
    );
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
    yield put(componentActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeComponentSaga(action: CreateRangeComponentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      componentRequests.createRange,
      action.payload.components
    );
    openNotificationSuccess("Components Created");
    yield put(
      componentActions.createRangeSuccess({
        components: data as IComponent[],
      })
    );
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
    yield put(componentActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateComponentSaga(action: UpdateComponentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      componentRequests.update,
      action.payload.component
    );
    openNotificationSuccess("Component Updated");
    yield put(
      componentActions.updateSuccess({ component: data as IComponent })
    );
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
    yield put(componentActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeComponentSaga(action: RemoveComponentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(componentRequests.remove, action.payload.id);
    openNotificationSuccess("Component Removed");
    yield put(componentActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
    yield put(componentActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeComponentSaga(action: RemoveRangeComponentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(componentRequests.removeRange, action.payload.ids);
    openNotificationSuccess("Components Removed");
    yield put(componentActions.removeRangeSuccess({ ids: action.payload.ids }));
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
    yield put(componentActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* checkInComponentSaga(action: CheckInComponentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      componentRequests.checkIn,
      action.payload.checkInDto
    );
    openNotificationSuccess("Component Checked In");
    yield put(
      componentActions.checkInSuccess({
        id: action.payload.checkInDto.productId,
        quantity: action.payload.checkInDto.quantity,
      })
    );
    yield put(
      userProductActions.createSuccess({
        userProduct: (data as ComponentCheckInSuccessPayload).userProduct,
      })
    );
    if (action.payload.onSubmit) action.payload.onSubmit();
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
    yield put(componentActions.checkInFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* checkOutComponentSaga(action: CheckOutComponentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(componentRequests.checkOut, action.payload.checkOutDto);
    openNotificationSuccess("Component Checked Out");
    yield put(
      componentActions.checkOutSuccess({
        id: action.payload.checkOutDto.productId,
        quantity: action.payload.checkOutDto.quantity,
      })
    );
    yield put(
      assetProductActions.removeSuccess({
        id: action.payload.checkOutDto.assetProductId,
      })
    );
    if (action.payload.onSubmit) action.payload.onSubmit();
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
    yield put(componentActions.checkOutFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* filterComponentsSaga(action: FilterComponentsRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      componentRequests.filter,
      action.payload
    );
    yield put(
      componentActions.filterSuccess({
        components: data as IComponent[],
      })
    );
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
    yield put(componentActions.filterFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* componentsaga() {
  yield takeEvery(componentConst.FETCH_COMPONENTS_REQUEST, fetchComponentsSaga);
  yield takeEvery(componentConst.FETCH_COMPONENT_REQUEST, fetchComponentSaga);
  yield takeEvery(componentConst.CREATE_COMPONENT_REQUEST, createComponentSaga);
  yield takeEvery(
    componentConst.CREATE_RANGE_COMPONENT_REQUEST,
    createRangeComponentSaga
  );
  yield takeEvery(componentConst.UPDATE_COMPONENT_REQUEST, updateComponentSaga);
  yield takeEvery(componentConst.REMOVE_COMPONENT_REQUEST, removeComponentSaga);
  yield takeEvery(
    componentConst.REMOVE_RANGE_COMPONENT_REQUEST,
    removeRangeComponentSaga
  );
  yield takeEvery(
    componentConst.CHECK_IN_COMPONENT_REQUEST,
    checkInComponentSaga
  );
  yield takeEvery(
    componentConst.CHECK_OUT_COMPONENT_REQUEST,
    checkOutComponentSaga
  );
  yield takeEvery(
    componentConst.FILTER_COMPONENTS_REQUEST,
    filterComponentsSaga
  );
}

export default componentsaga;
