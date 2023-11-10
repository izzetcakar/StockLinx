import { call, put, takeEvery } from "redux-saga/effects";
import { userActions } from "./actions";
import { userConst } from "./constant";
import {
  CreateUserRequest,
  RemoveUserRequest,
  SignInRequest,
  UpdateUserRequest,
} from "./type";
import { userRequests } from "./requests";
import { IUser } from "../../interfaces/interfaces";
import { openNotificationError } from "../../components/notification/Notification";

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
}
function* fetchUsersSaga() {
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
}
function* createUserSaga(action: CreateUserRequest) {
  try {
    const { message, success }: IResponse = yield call(
      userRequests.create,
      action.payload.user
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(userActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
}
function* updateUserSaga(action: UpdateUserRequest) {
  try {
    const { message, success }: IResponse = yield call(
      userRequests.update,
      action.payload.user
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(userActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
}
function* removeUserSaga(action: RemoveUserRequest) {
  try {
    const { message, success }: IResponse = yield call(
      userRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(userActions.removeSuccess());
    }
  } catch (e) {
    openNotificationError("User", (e as Error).message);
  }
}
function* signInSaga(action: SignInRequest) {
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
}
function* getUserWithTokenSaga() {
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
  yield takeEvery(userConst.UPDATE_USER_REQUEST, updateUserSaga);
  yield takeEvery(userConst.REMOVE_USER_REQUEST, removeUserSaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default usersaga;
