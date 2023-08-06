import { call, put, takeEvery } from "redux-saga/effects";
import { companyActions } from "./actions";
import { ICompany } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { companyConst } from "./constant";
import { FetchCompanyRequest, UpdateCompanyRequest } from "./type";
const requestUrl = "Company/";

const fetchCompanies = () => {
  return request<ICompany>({ requestUrl: requestUrl, apiType: "get" });
};
const fetchCompany = (id: string) => {
  return request<ICompany>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const createCompany = (company: ICompany) => {
  return request<ICompany>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: company,
  });
};
const updateCompany = (company: ICompany) => {
  return request<ICompany>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: company,
  });
};
const removeCompany = (id: string) => {
  return request<ICompany>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

function* fetchCompaniesSaga() {
  try {
    const { data, message, success, status }: BackendResponse<ICompany> =
      yield call(fetchCompanies);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        companyActions.getAllSuccess({
          companies: data as ICompany[],
        })
      );
    }
  } catch (e) {
    yield put(
      companyActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchCompanySaga(action: FetchCompanyRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ICompany> =
      yield call(fetchCompany, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        companyActions.getSuccess({
          company: data as ICompany,
        })
      );
    }
  } catch (e) {
    yield put(
      companyActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createCompanySaga(action: UpdateCompanyRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ICompany> =
      yield call(createCompany, action.payload.company);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(companyActions.createSuccess());
    }
  } catch (e) {
    yield put(
      companyActions.createFailure({
        error: e.message as string,
      })
    );
  }
}
function* updateCompanySaga(action: UpdateCompanyRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ICompany> =
      yield call(updateCompany, action.payload.company);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(companyActions.updateSuccess());
    }
  } catch (e) {
    yield put(
      companyActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeCompanySaga(action: FetchCompanyRequest) {
  try {
    const { data, message, success, status }: BackendResponse<ICompany> =
      yield call(removeCompany, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(companyActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      companyActions.removeFailure({
        error: e.message as string,
      })
    );
  }
}

function* companiesaga() {
  // yield all([
  //   takeLatest(companyConst.FETCH_COMPANIES_REQUEST, fetchCompaniesSaga),
  // ]);
  yield takeEvery(companyConst.FETCH_COMPANIES_REQUEST, fetchCompaniesSaga);
  yield takeEvery(companyConst.FETCH_COMPANY_REQUEST, fetchCompanySaga);
  yield takeEvery(companyConst.CREATE_COMPANY_REQUEST, createCompanySaga);
  yield takeEvery(companyConst.UPDATE_COMPANY_REQUEST, updateCompanySaga);
  yield takeEvery(companyConst.REMOVE_COMPANY_REQUEST, removeCompanySaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default companiesaga;
