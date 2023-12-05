import { call, put, takeEvery } from "redux-saga/effects";
import { departmentActions } from "./actions";
import { IDepartment } from "../../interfaces/interfaces";
import { departmentConst } from "./constant";
import {
  CreateDepartmentRequest,
  CreateRangeDepartmentRequest,
  FetchDepartmentRequest,
  RemoveDepartmentRequest,
  RemoveRangeDepartmentRequest,
  UpdateDepartmentRequest,
} from "./type";
import { departmentRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

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
    openNotificationError("Department", (e as Error).message);
    yield put(departmentActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchDepartmentSaga(action: FetchDepartmentRequest) {
  yield put(genericActions.increaseLoading());
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
    openNotificationError("Department", (e as Error).message);
    yield put(departmentActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createDepartmentSaga(action: CreateDepartmentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      departmentRequests.create,
      action.payload.department
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Department Created");
      yield put(
        departmentActions.createSuccess({ department: data as IDepartment })
      );
    }
  } catch (e) {
    openNotificationError("Department", (e as Error).message);
    yield put(departmentActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createRangeDepartmentSaga(action: CreateRangeDepartmentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      departmentRequests.createRange,
      action.payload.departments
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Departments Created");
      yield put(
        departmentActions.createRangeSuccess({
          departments: data as IDepartment[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Department", (e as Error).message);
    yield put(departmentActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateDepartmentSaga(action: UpdateDepartmentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      departmentRequests.update,
      action.payload.department
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Department Updated");
      yield put(departmentActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("Department", (e as Error).message);
    yield put(departmentActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeDepartmentSaga(action: RemoveDepartmentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      departmentRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Department Removed");
      yield put(departmentActions.removeSuccess({ id: action.payload.id }));
    }
  } catch (e) {
    openNotificationError("Department", (e as Error).message);
    yield put(departmentActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeDepartmentSaga(action: RemoveRangeDepartmentRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      departmentRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Departments Removed");
      yield put(
        departmentActions.removeRangeSuccess({ ids: action.payload.ids })
      );
    }
  } catch (e) {
    openNotificationError("Department", (e as Error).message);
    yield put(departmentActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
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
    departmentConst.CREATE_RANGE_DEPARTMENT_REQUEST,
    createRangeDepartmentSaga
  );
  yield takeEvery(
    departmentConst.UPDATE_DEPARTMENT_REQUEST,
    updateDepartmentSaga
  );
  yield takeEvery(
    departmentConst.REMOVE_DEPARTMENT_REQUEST,
    removeDepartmentSaga
  );
  yield takeEvery(
    departmentConst.REMOVE_RANGE_DEPARTMENT_REQUEST,
    removeRangeDepartmentSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default departmentsaga;
