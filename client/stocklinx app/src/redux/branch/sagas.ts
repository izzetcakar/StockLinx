import { call, put, takeEvery } from "redux-saga/effects";
import { branchActions } from "./actions";
import { IBranch } from "../../interfaces/interfaces";
import { branchConst } from "./constant";
import {
  CreateBranchRequest,
  CreateRangeBranchRequest,
  FetchBranchRequest,
  RemoveBranchRequest,
  RemoveRangeBranchRequest,
  UpdateBranchRequest,
} from "./type";
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
      throw new Error(message);
    } else {
      yield put(
        branchActions.getAllSuccess({
          branches: data as IBranch[],
        })
      );
    }
  } catch (e) {
    openNotificationError("Branch", (e as Error).message);
    yield put(branchActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchBranchSaga(action: FetchBranchRequest) {
  yield put(genericActions.increaseLoading());
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
    yield put(branchActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createBranchSaga(action: CreateBranchRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      branchRequests.create,
      action.payload.branch
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Branch Created");
      yield put(branchActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("Branch", (e as Error).message);
    yield put(branchActions.createFailure());
  }
}
function* createRangeBranchSaga(action: CreateRangeBranchRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      branchRequests.createRange,
      action.payload.branches
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Branches Created");
      yield put(branchActions.createRangeSuccess());
    }
  } catch (e) {
    openNotificationError("Branch", (e as Error).message);
    yield put(branchActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateBranchSaga(action: UpdateBranchRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      branchRequests.update,
      action.payload.branch
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Branch Updated");
      yield put(branchActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("Branch", (e as Error).message);
    yield put(branchActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeBranchSaga(action: RemoveBranchRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      branchRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Branch Removed");
      yield put(branchActions.removeSuccess({ id: action.payload.id }));
    }
  } catch (e) {
    openNotificationError("Branch", (e as Error).message);
    yield put(branchActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeBranchSaga(action: RemoveRangeBranchRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      branchRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("Branches Removed");
      yield put(branchActions.removeRangeSuccess({ ids: action.payload.ids }));
    }
  } catch (e) {
    openNotificationError("Branch", (e as Error).message);
    yield put(branchActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* branchsaga() {
  // yield all([
  //   takeLatest(branchConst.FETCH_BRANCHES_REQUEST, fetchBranchesSaga),
  // ]);
  yield takeEvery(branchConst.FETCH_BRANCHES_REQUEST, fetchBranchesSaga);
  yield takeEvery(branchConst.FETCH_BRANCH_REQUEST, fetchBranchSaga);
  yield takeEvery(branchConst.CREATE_BRANCH_REQUEST, createBranchSaga);
  yield takeEvery(
    branchConst.CREATE_RANGE_BRANCH_REQUEST,
    createRangeBranchSaga
  );
  yield takeEvery(branchConst.UPDATE_BRANCH_REQUEST, updateBranchSaga);
  yield takeEvery(branchConst.REMOVE_BRANCH_REQUEST, removeBranchSaga);
  yield takeEvery(
    branchConst.REMOVE_RANGE_BRANCH_REQUEST,
    removeRangeBranchSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default branchsaga;
