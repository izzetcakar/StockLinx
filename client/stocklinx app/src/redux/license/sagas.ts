import { call, put, takeEvery } from "redux-saga/effects";
import { licenseActions } from "./actions";
import { ILicense } from "../../interfaces/interfaces";
import { licenseConst } from "./constant";
import { FetchLicenseRequest, UpdateLicenseRequest } from "./type";
import { licenseRequests } from "./requests";

interface IResponse {
  data: ILicense[] | ILicense | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchLicensesSaga() {
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
    console.log(e);
  }
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
    console.log(e);
  }
}
function* createLicenseSaga(action: UpdateLicenseRequest) {
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.create,
      action.payload.license
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(licenseActions.createSuccess());
    }
  } catch (e) {
    console.log(e);
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
    }
  } catch (e) {
    console.log(e);
  }
}
function* removeLicenseSaga(action: FetchLicenseRequest) {
  try {
    const { message, success }: IResponse = yield call(
      licenseRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(licenseActions.removeSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}

function* licensesaga() {
  // yield all([
  //   takeLatest(licenseConst.FETCH_LICENSES_REQUEST, fetchLicensesSaga),
  // ]);
  yield takeEvery(licenseConst.FETCH_LICENSES_REQUEST, fetchLicensesSaga);
  yield takeEvery(licenseConst.FETCH_LICENSE_REQUEST, fetchLicenseSaga);
  yield takeEvery(licenseConst.CREATE_LICENSE_REQUEST, createLicenseSaga);
  yield takeEvery(licenseConst.UPDATE_LICENSE_REQUEST, updateLicenseSaga);
  yield takeEvery(licenseConst.REMOVE_LICENSE_REQUEST, removeLicenseSaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default licensesaga;
