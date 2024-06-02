import { call, put, takeEvery } from "redux-saga/effects";
import { companyActions } from "./actions";
import { ICompany } from "@interfaces/serverInterfaces";
import { companyConst } from "./constant";
import {
  CreateCompanyRequest,
  CreateRangeCompanyRequest,
  FetchCompanyRequest,
  FilterCompaniesRequest,
  RemoveCompanyRequest,
  RemoveRangeCompanyRequest,
  UpdateCompanyRequest,
} from "./type";
import { companyRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "@/notification/Notification";

type IResponse = {
  data: ICompany[] | ICompany | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchCompaniesSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(companyRequests.getAll);

    yield put(
      companyActions.getAllSuccess({
        companies: data as ICompany[],
      })
    );
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchCompanySaga(action: FetchCompanyRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      companyRequests.get,
      action.payload.id
    );

    yield put(
      companyActions.getSuccess({
        company: data as ICompany,
      })
    );
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createCompanySaga(action: CreateCompanyRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      companyRequests.create,
      action.payload.company
    );

    openNotificationSuccess("Company Created");
    yield put(companyActions.createSuccess({ company: data as ICompany }));
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeCompanySaga(action: CreateRangeCompanyRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      companyRequests.createRange,
      action.payload.companies
    );

    openNotificationSuccess("Companies Created");
    yield put(
      companyActions.createRangeSuccess({ companies: data as ICompany[] })
    );
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateCompanySaga(action: UpdateCompanyRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      companyRequests.update,
      action.payload.company
    );

    openNotificationSuccess("Company Updated");
    yield put(companyActions.updateSuccess({ company: data as ICompany }));
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeCompanySaga(action: RemoveCompanyRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(companyRequests.remove, action.payload.id);

    openNotificationSuccess("Company Removed");
    yield put(companyActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeCompanySaga(action: RemoveRangeCompanyRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(companyRequests.removeRange, action.payload.ids);

    openNotificationSuccess("Companies Removed");
    yield put(companyActions.removeRangeSuccess({ ids: action.payload.ids }));
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* filterCompaniesSaga(action: FilterCompaniesRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      companyRequests.filter,
      action.payload
    );
    yield put(
      companyActions.filterSuccess({
        companies: data as ICompany[],
      })
    );
  } catch (e) {
    openNotificationError("Company", (e as Error).message);
    yield put(companyActions.filterFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* companysaga() {
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
  yield takeEvery(companyConst.FILTER_COMPANIES_REQUEST, filterCompaniesSaga);
}

export default companysaga;
