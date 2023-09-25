import { call, put, takeEvery } from "redux-saga/effects";
import { departmentActions } from "./actions";
import { IDepartment } from "../../interfaces/interfaces";
import { departmentConst } from "./constant";
import { FetchDepartmentRequest, UpdateDepartmentRequest } from "./type";
import { departmentRequests } from "./requests";
import { genericActions } from "../generic/actions";

interface IResponse {
  data: IDepartment[] | IDepartment | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchDepartmentsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      departmentRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        departmentActions.getAllSuccess({
          departments: data as IDepartment[],
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchDepartmentSaga(action: FetchDepartmentRequest) {
  try {
    const { data, message, success }: IResponse = yield call(
      departmentRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        departmentActions.getSuccess({
          department: data as IDepartment,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}
function* createDepartmentSaga(action: UpdateDepartmentRequest) {
  try {
    const { message, success }: IResponse = yield call(
      departmentRequests.create,
      action.payload.department
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(departmentActions.createSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}
function* updateDepartmentSaga(action: UpdateDepartmentRequest) {
  try {
    const { message, success }: IResponse = yield call(
      departmentRequests.update,
      action.payload.department
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(departmentActions.updateSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}
function* removeDepartmentSaga(action: FetchDepartmentRequest) {
  try {
    const { message, success }: IResponse = yield call(
      departmentRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(departmentActions.removeSuccess());
    }
  } catch (e) {
    console.log(e);
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
