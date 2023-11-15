import { call, put, takeEvery } from "redux-saga/effects";
import { branchActions } from "./actions";
import { IBranch } from "../../interfaces/interfaces";
import { branchConst } from "./constant";
import { FetchBranchRequest, UpdateBranchRequest } from "./type";
import { branchRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: IBranch[] | IBranch | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchBranchesSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      branchRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message as string);
    } else {
      yield put(
        branchActions.getAllSuccess({
          branches: data as IBranch[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Branch", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchBranchSaga(action: FetchBranchRequest) {
  try {
    const { data, message, success }: IResponse = yield call(
      branchRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        branchActions.getSuccess({
          branch: data as IBranch,
        })
      );
    }
  } catch (e) {
    openNotificationError("Branch", (e as Error).message);
  }
}
function* createBranchSaga(action: UpdateBranchRequest) {
  try {
    const { message, success }: IResponse = yield call(
      branchRequests.create,
      action.payload.branch
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(branchActions.createSuccess());
      openNotificationSuccess("Branch Created");
    }
  } catch (e) {
    openNotificationError("Branch", (e as Error).message);
  }
}
function* updateBranchSaga(action: UpdateBranchRequest) {
  try {
    const { message, success }: IResponse = yield call(
      branchRequests.update,
      action.payload.branch
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(branchActions.updateSuccess());
      openNotificationSuccess("Branch Updated");
    }
  } catch (e) {
    openNotificationError("Branch", (e as Error).message);
  }
}
function* removeBranchSaga(action: FetchBranchRequest) {
  try {
    const { message, success }: IResponse = yield call(
      branchRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(branchActions.removeSuccess());
      openNotificationSuccess("Branch Removed");
    }
  } catch (e) {
    openNotificationError("Branch", (e as Error).message);
  }
}

function* branchSaga() {
  // yield all([
  //   takeLatest(branchConst.FETCH_BRANCHES_REQUEST, fetchBranchesSaga),
  // ]);
  yield takeEvery(branchConst.FETCH_BRANCHES_REQUEST, fetchBranchesSaga);
  yield takeEvery(branchConst.FETCH_BRANCH_REQUEST, fetchBranchSaga);
  yield takeEvery(branchConst.CREATE_BRANCH_REQUEST, createBranchSaga);
  yield takeEvery(branchConst.UPDATE_BRANCH_REQUEST, updateBranchSaga);
  yield takeEvery(branchConst.REMOVE_BRANCH_REQUEST, removeBranchSaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default branchSaga;
