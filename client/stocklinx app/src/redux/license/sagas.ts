import { call, put, takeEvery } from "redux-saga/effects";
import { licenseActions } from "./actions";
import { ILicense } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { licenseConst } from "./constant";
import { FetchLicenseRequest, UpdateLicenseRequest } from "./type";
const requestUrl = "License/";

const fetchLicenses = () => {
  return request<ILicense>({ requestUrl: requestUrl, apiType: "get" });
};
const fetchLicense = (id: string) => {
  return request<ILicense>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const createLicense = (license: ILicense) => {
  return request<ILicense>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: license,
  });
};
const updateLicense = (license: ILicense) => {
  return request<ILicense>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: license,
  });
};
const removeLicense = (id: string) => {
  return request<ILicense>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

function* fetchLicensesSaga() {
  try {
    const { data, message, success, status }: BackendResponse<ILicense> =
      yield call(fetchLicenses);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        licenseActions.getAllSuccess({
          licenses: data as ILicense[],
        })
      );
    }
  } catch (e) {
    yield put(
      licenseActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchLicenseSaga(action: FetchLicenseRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ILicense> =
      yield call(fetchLicense, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        licenseActions.getSuccess({
          license: data as ILicense,
        })
      );
    }
  } catch (e) {
    yield put(
      licenseActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createLicenseSaga(action: UpdateLicenseRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ILicense> =
      yield call(createLicense, action.payload.license);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(licenseActions.createSuccess());
    }
  } catch (e) {
    yield put(
      licenseActions.createFailure({
        error: e.message as string,
      })
    );
  }
}
function* updateLicenseSaga(action: UpdateLicenseRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ILicense> =
      yield call(updateLicense, action.payload.license);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(licenseActions.updateSuccess());
    }
  } catch (e) {
    yield put(
      licenseActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeLicenseSaga(action: FetchLicenseRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ILicense> =
      yield call(removeLicense, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(licenseActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      licenseActions.removeFailure({
        error: e.message as string,
      })
    );
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
