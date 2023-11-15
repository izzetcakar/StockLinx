import { call, put, takeEvery } from "redux-saga/effects";
import { companyActions } from "./actions";
import { ICompany } from "../../interfaces/interfaces";
import { companyConst } from "./constant";
import { FetchCompanyRequest, UpdateCompanyRequest } from "./type";
import { companyRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: ICompany[] | ICompany | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchCompaniesSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      companyRequests.getAll
    );
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
    openNotificationError("Company", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchCompanySaga(action: FetchCompanyRequest) {
  try {
    const { data, message, success }: IResponse = yield call(
      companyRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        companyActions.getSuccess({
          company: data as ICompany,
        })
      );
    }
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
  }
}
function* createCompanySaga(action: UpdateCompanyRequest) {
  try {
    const { message, success }: IResponse = yield call(
      companyRequests.create,
      action.payload.company
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(companyActions.createSuccess());
      openNotificationSuccess("Company Created");
    }
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
  }
}
function* updateCompanySaga(action: UpdateCompanyRequest) {
  try {
    const { message, success }: IResponse = yield call(
      companyRequests.update,
      action.payload.company
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(companyActions.updateSuccess());
      openNotificationSuccess("Company Updated");
    }
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
  }
}
function* removeCompanySaga(action: FetchCompanyRequest) {
  try {
    const { message, success }: IResponse = yield call(
      companyRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(companyActions.removeSuccess());
      openNotificationSuccess("Company Removed");
    }
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
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
