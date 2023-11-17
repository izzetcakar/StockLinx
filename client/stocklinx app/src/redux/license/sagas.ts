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
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchLicenseSaga(action: FetchLicenseRequest) {
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
  }
}
function* createLicenseSaga(action: CreateLicenseRequest) {
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.create,
      action.payload.license
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(licenseActions.createSuccess());
      openNotificationSuccess("License Created");
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
  }
}
function* createRangeLicenseSaga(action: CreateRangeLicenseRequest) {
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.createRange,
      action.payload.licenses
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(licenseActions.createRangeSuccess());
      openNotificationSuccess("Licenses Created");
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
  }
}

function* updateLicenseSaga(action: UpdateLicenseRequest) {
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.update,
      action.payload.license
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(licenseActions.updateSuccess());
      openNotificationSuccess("License Updated");
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
  }
}
function* removeLicenseSaga(action: RemoveLicenseRequest) {
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(licenseActions.removeSuccess({ id: action.payload.id }));
      openNotificationSuccess("License Removed");
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
  }
}
function* removeRangeLicenseSaga(action: RemoveRangeLicenseRequest) {
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(licenseActions.removeRangeSuccess({ ids: action.payload.ids }));
      openNotificationSuccess("Licenses Removed");
    }
  } catch (e) {
    openNotificationError("License", (e as Error).message);
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
