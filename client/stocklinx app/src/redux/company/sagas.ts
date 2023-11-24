import { call, put, takeEvery } from "redux-saga/effects";
import { companyActions } from "./actions";
import { ICompany } from "../../interfaces/interfaces";
import { companyConst } from "./constant";
import {
  CreateCompanyRequest,
  CreateRangeCompanyRequest,
  FetchCompanyRequest,
  RemoveCompanyRequest,
  RemoveRangeCompanyRequest,
  UpdateCompanyRequest,
} from "./type";
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
      throw new Error(message);
    } else {
      yield put(
        companyActions.getAllSuccess({
          companies: data as ICompany[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchCompanySaga(action: FetchCompanyRequest) {
  yield put(genericActions.increaseLoading());
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
    yield put(companyActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createCompanySaga(action: CreateCompanyRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      companyRequests.create,
      action.payload.company
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Company Created");
      yield put(companyActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.createFailure());
  }
}
function* createRangeCompanySaga(action: CreateRangeCompanyRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      companyRequests.createRange,
      action.payload.companies
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Companies Created");
      yield put(companyActions.createRangeSuccess());
    }
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateCompanySaga(action: UpdateCompanyRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      companyRequests.update,
      action.payload.company
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Company Updated");
      yield put(companyActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeCompanySaga(action: RemoveCompanyRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      companyRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Company Removed");
      yield put(companyActions.removeSuccess({ id: action.payload.id }));
    }
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeCompanySaga(action: RemoveRangeCompanyRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      companyRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Companies Removed");
      yield put(companyActions.removeRangeSuccess({ ids: action.payload.ids }));
    }
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* companysaga() {
  // yield all([
  //   takeLatest(companyConst.FETCH_COMPANIES_REQUEST, fetchCompaniesSaga),
  // ]);
  yield takeEvery(companyConst.FETCH_COMPANIES_REQUEST, fetchCompaniesSaga);
  yield takeEvery(companyConst.FETCH_COMPANY_REQUEST, fetchCompanySaga);
  yield takeEvery(companyConst.CREATE_COMPANY_REQUEST, createCompanySaga);
  yield takeEvery(
    companyConst.CREATE_RANGE_COMPANY_REQUEST,
    createRangeCompanySaga
  );
  yield takeEvery(companyConst.UPDATE_COMPANY_REQUEST, updateCompanySaga);
  yield takeEvery(companyConst.REMOVE_COMPANY_REQUEST, removeCompanySaga);
  yield takeEvery(
    companyConst.REMOVE_RANGE_COMPANY_REQUEST,
    removeRangeCompanySaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default companysaga;
