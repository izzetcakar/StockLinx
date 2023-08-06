import { call, put, takeEvery } from "redux-saga/effects";
import { departmentActions } from "./actions";
import { IDepartment } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { departmentConst } from "./constant";
import { FetchDepartmentRequest, UpdateDepartmentRequest } from "./type";
const requestUrl = "Department/";

const fetchDepartments = () => {
  return request<IDepartment>({ requestUrl: requestUrl, apiType: "get" });
};
const fetchDepartment = (id: string) => {
  return request<IDepartment>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const createDepartment = (department: IDepartment) => {
  return request<IDepartment>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: department,
  });
};
const updateDepartment = (department: IDepartment) => {
  return request<IDepartment>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: department,
  });
};
const removeDepartment = (id: string) => {
  return request<IDepartment>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

function* fetchDepartmentsSaga() {
  try {
    const { data, message, success, status }: BackendResponse<IDepartment> =
      yield call(fetchDepartments);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        departmentActions.getAllSuccess({
          departments: data as IDepartment[],
        })
      );
    }
  } catch (e) {
    yield put(
      departmentActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchDepartmentSaga(action: FetchDepartmentRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IDepartment> =
      yield call(fetchDepartment, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        departmentActions.getSuccess({
          department: data as IDepartment,
        })
      );
    }
  } catch (e) {
    yield put(
      departmentActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createDepartmentSaga(action: UpdateDepartmentRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IDepartment> =
      yield call(createDepartment, action.payload.department);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(departmentActions.createSuccess());
    }
  } catch (e) {
    yield put(
      departmentActions.createFailure({
        error: e.message as string,
      })
    );
  }
}
function* updateDepartmentSaga(action: UpdateDepartmentRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IDepartment> =
      yield call(updateDepartment, action.payload.department);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(departmentActions.updateSuccess());
    }
  } catch (e) {
    yield put(
      departmentActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeDepartmentSaga(action: FetchDepartmentRequest) {
  try {
    const { data, message, success, status }: BackendResponse<IDepartment> =
      yield call(removeDepartment, action.payload.id);
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(departmentActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      departmentActions.removeFailure({
        error: e.message as string,
      })
    );
  }
}

function* departmentsaga() {
  // yield all([
  //   takeLatest(departmentConst.FETCH_DEPARTMENTS_REQUEST, fetchDepartmentsSaga),
  // ]);
  yield takeEvery(
    departmentConst.FETCH_DEPARTMENTS_REQUEST,
    fetchDepartmentsSaga
  );
  yield takeEvery(
    departmentConst.FETCH_DEPARTMENT_REQUEST,
    fetchDepartmentSaga
  );
  yield takeEvery(
    departmentConst.CREATE_DEPARTMENT_REQUEST,
    createDepartmentSaga
  );
  yield takeEvery(
    departmentConst.UPDATE_DEPARTMENT_REQUEST,
    updateDepartmentSaga
  );
  yield takeEvery(
    departmentConst.REMOVE_DEPARTMENT_REQUEST,
    removeDepartmentSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default departmentsaga;
