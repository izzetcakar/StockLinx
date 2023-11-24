import { call, put, takeEvery } from "redux-saga/effects";
import { licenseActions } from "./actions";
import { ILicense } from "../../interfaces/interfaces";
import { licenseConst } from "./constant";
import {
  CreateLicenseRequest,
  CreateRangeLicenseRequest,
  FetchLicenseRequest,
  RemoveLicenseRequest,
  RemoveRangeLicenseRequest,
  UpdateLicenseRequest,
} from "./type";
import { licenseRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: ILicense[] | ILicense | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchLicensesSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      licenseRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        licenseActions.getAllSuccess({
          licenses: data as ILicense[],
        })
      );
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchLicenseSaga(action: FetchLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      licenseRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        licenseActions.getSuccess({
          license: data as ILicense,
        })
      );
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createLicenseSaga(action: CreateLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.create,
      action.payload.license
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("License Created");
      yield put(licenseActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createRangeLicenseSaga(action: CreateRangeLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.createRange,
      action.payload.licenses
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Licenses Created");
      yield put(licenseActions.createRangeSuccess());
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateLicenseSaga(action: UpdateLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.update,
      action.payload.license
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("License Updated");
      yield put(licenseActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeLicenseSaga(action: RemoveLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("License Removed");
      yield put(licenseActions.removeSuccess({ id: action.payload.id }));
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeLicenseSaga(action: RemoveRangeLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Licenses Removed");
      yield put(licenseActions.removeRangeSuccess({ ids: action.payload.ids }));
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.removeRangeFailure());
  }
}

function* licensesaga() {
  // yield all([
  //   takeLatest(licenseConst.FETCH_LICENSES_REQUEST, fetchLicensesSaga),
  // ]);
  yield takeEvery(licenseConst.FETCH_LICENSES_REQUEST, fetchLicensesSaga);
  yield takeEvery(licenseConst.FETCH_LICENSE_REQUEST, fetchLicenseSaga);
  yield takeEvery(licenseConst.CREATE_LICENSE_REQUEST, createLicenseSaga);
  yield takeEvery(
    licenseConst.CREATE_RANGE_LICENSE_REQUEST,
    createRangeLicenseSaga
  );
  yield takeEvery(licenseConst.UPDATE_LICENSE_REQUEST, updateLicenseSaga);
  yield takeEvery(licenseConst.REMOVE_LICENSE_REQUEST, removeLicenseSaga);
  yield takeEvery(
    licenseConst.REMOVE_RANGE_LICENSE_REQUEST,
    removeRangeLicenseSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default licensesaga;
