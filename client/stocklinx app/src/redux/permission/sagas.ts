import { call, put, takeEvery } from "redux-saga/effects";
import { permissionActions } from "./actions";
import { IPermission } from "../../interfaces/serverInterfaces";
import { permissionConst } from "./constant";
import {
  CreatePermissionRequest,
  CreateRangePermissionRequest,
  FetchPermissionRequest,
  RemovePermissionRequest,
  RemoveRangePermissionRequest,
  SyncPermissionRequest,
} from "./type";
import { permissionRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

type IResponse = {
  data: IPermission[] | IPermission | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchPermissionsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(permissionRequests.getAll);
    yield put(
      permissionActions.getAllSuccess({
        permissions: data as IPermission[],
      })
    );
  } catch (e) {
    openNotificationError("Permission", (e as Error).message);
    yield put(permissionActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchPermissionSaga(action: FetchPermissionRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      permissionRequests.get,
      action.payload.id
    );
    yield put(
      permissionActions.getSuccess({
        permission: data as IPermission,
      })
    );
  } catch (e) {
    openNotificationError("Permission", (e as Error).message);
    yield put(permissionActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createPermissionSaga(action: CreatePermissionRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      permissionRequests.create,
      action.payload.permission
    );
    openNotificationSuccess("Permission Created");
    yield put(
      permissionActions.createSuccess({ permissions: data as IPermission[] })
    );
  } catch (e) {
    openNotificationError("Permission", (e as Error).message);
    yield put(permissionActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangePermissionSaga(action: CreateRangePermissionRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      permissionRequests.createRange,
      action.payload.permissions
    );
    openNotificationSuccess("Permissions Created");
    yield put(
      permissionActions.createRangeSuccess({
        permissions: data as IPermission[],
      })
    );
  } catch (e) {
    openNotificationError("Permission", (e as Error).message);
    yield put(permissionActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removePermissionSaga(action: RemovePermissionRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(permissionRequests.remove, action.payload.id);
    openNotificationSuccess("Permission Removed");
    yield put(permissionActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("Permission", (e as Error).message);
    yield put(permissionActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangePermissionSaga(action: RemoveRangePermissionRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(permissionRequests.removeRange, action.payload.ids);
    openNotificationSuccess("Permissions Removed");
    yield put(
      permissionActions.removeRangeSuccess({ ids: action.payload.ids })
    );
  } catch (e) {
    openNotificationError("Permission", (e as Error).message);
    yield put(permissionActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* syncPermissionSaga(action: SyncPermissionRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(permissionRequests.sync, action.payload.permissions);
    openNotificationSuccess("Permissions Synced");
    yield put(
      permissionActions.syncSuccess({
        permissions: action.payload.permissions,
      })
    );
  } catch (e) {
    openNotificationError("Permission", (e as Error).message);
    yield put(permissionActions.syncFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* permissionSaga() {
  yield takeEvery(
    permissionConst.FETCH_PERMISSIONS_REQUEST,
    fetchPermissionsSaga
  );
  yield takeEvery(
    permissionConst.FETCH_PERMISSION_REQUEST,
    fetchPermissionSaga
  );
  yield takeEvery(
    permissionConst.CREATE_PERMISSION_REQUEST,
    createPermissionSaga
  );
  yield takeEvery(
    permissionConst.CREATE_RANGE_PERMISSION_REQUEST,
    createRangePermissionSaga
  );
  yield takeEvery(
    permissionConst.REMOVE_PERMISSION_REQUEST,
    removePermissionSaga
  );
  yield takeEvery(
    permissionConst.REMOVE_RANGE_PERMISSION_REQUEST,
    removeRangePermissionSaga
  );
  yield takeEvery(permissionConst.SYNC_PERMISSION_REQUEST, syncPermissionSaga);
}

export default permissionSaga;
