import { call, put, takeEvery } from "redux-saga/effects";
import { userActions } from "./actions";
import { userConst } from "./constant";
import {
  CreateRangeUserRequest,
  CreateUserRequest,
  RemoveRangeUserRequest,
  RemoveUserRequest,
  SignInRequest,
  UpdateUserRequest,
} from "./type";
import { userRequests } from "./requests";
import { IUser } from "../../interfaces/interfaces";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";
import { genericActions } from "../generic/actions";

interface IResponse {
  data: IUser[] | IUser | null;
  message: string;
  success: boolean;
  status: number;
}
interface ISignInResponse {
  data: { token: string } | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchUsersaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(userRequests.get);
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        userActions.getSuccess({
          user: data as IUser,
        })
      );
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchUsersSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      userRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        userActions.getAllSuccess({
          users: data as IUser[],
        })
      );
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* createUserSaga(action: CreateUserRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      userRequests.create,
      action.payload.user
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(userActions.createSuccess());
      openNotificationSuccess("User Created");
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* createRangeUserSaga(action: CreateRangeUserRequest) {
  try {
    const { message, success }: IResponse = yield call(
      userRequests.createRange,
      action.payload.users
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(userActions.createRangeSuccess());
      openNotificationSuccess("Users Created");
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
}
function* updateUserSaga(action: UpdateUserRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      userRequests.update,
      action.payload.user
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(userActions.updateSuccess());
      openNotificationSuccess("User Updated");
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* removeUserSaga(action: RemoveUserRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      userRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(userActions.removeSuccess());
      openNotificationSuccess("User Removed");
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeUserSaga(action: RemoveRangeUserRequest) {
  try {
    const { message, success }: IResponse = yield call(
      userRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(userActions.removeRangeSuccess({ ids: action.payload.ids }));
      openNotificationSuccess("Users Removed");
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
}
function* signInSaga(action: SignInRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const response: ISignInResponse = yield call(
      userRequests.signIn,
      action.payload.user
    );
    if (!response.success) {
      throw new Error(response.message);
    } else {
      localStorage.setItem("token", JSON.stringify(response.data?.token));
      yield put(userActions.signInSuccess());
      yield put(userActions.getWithToken());
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* getUserWithTokenSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      userRequests.getWithToken
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        userActions.getSuccess({
          user: data as IUser,
        })
      );
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}

function* usersaga() {
  // yield all([
  //   takeLatest(userConst.FETCH_USERS_REQUEST, fetchUsersSaga),
  // ]);
  yield takeEvery(userConst.FETCH_USERS_REQUEST, fetchUsersSaga);
  yield takeEvery(userConst.FETCH_USER_REQUEST, fetchUsersaga);
  yield takeEvery(userConst.SIGN_IN_REQUEST, signInSaga);
  yield takeEvery(userConst.GET_WITH_TOKEN_REQUEST, getUserWithTokenSaga);
  yield takeEvery(userConst.CREATE_USER_REQUEST, createUserSaga);
  yield takeEvery(userConst.CREATE_RANGE_USER_REQUEST, createRangeUserSaga);
  yield takeEvery(userConst.UPDATE_USER_REQUEST, updateUserSaga);
  yield takeEvery(userConst.REMOVE_USER_REQUEST, removeUserSaga);
  yield takeEvery(userConst.REMOVE_RANGE_USER_REQUEST, removeRangeUserSaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default usersaga;
