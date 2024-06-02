import { call, put, takeEvery } from "redux-saga/effects";
import { userActions } from "./actions";
import { userConst } from "./constant";
import {
  CreateRangeUserRequest,
  CreateUserRequest,
  FetchUserRequest,
  FilterUsersRequest,
  RemoveRangeUserRequest,
  RemoveUserRequest,
  SignInRequest,
  UpdateUserRequest,
} from "./type";
import { userRequests } from "./requests";
import { IUser } from "@interfaces/serverInterfaces";
import {
  openNotificationError,
  openNotificationSuccess,
} from "@/notification/Notification";
import { genericActions } from "../generic/actions";

type IResponse = {
  data: IUser[] | IUser | null;
  message: string;
  success: boolean;
  status: number;
};
type ISignInResponse = {
  data: { token: string } | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchUsersaga(action: FetchUserRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(userRequests.get, action.payload.id);
    yield put(
      userActions.getSuccess({
        user: data as IUser,
      })
    );
  } catch (e) {
    openNotificationError("User", (e as Error).message);
    yield put(userActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchUsersSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(userRequests.getAll);
    yield put(
      userActions.getAllSuccess({
        users: data as IUser[],
      })
    );
  } catch (e) {
    openNotificationError("User", (e as Error).message);
    yield put(userActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createUserSaga(action: CreateUserRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      userRequests.create,
      action.payload.user
    );
    yield put(userActions.createSuccess({ user: data as IUser }));
    openNotificationSuccess("User Created");
  } catch (e) {
    openNotificationError("User", (e as Error).message);
    yield put(userActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeUserSaga(action: CreateRangeUserRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      userRequests.createRange,
      action.payload.users
    );
    yield put(userActions.createRangeSuccess({ users: data as IUser[] }));
    openNotificationSuccess("Users Created");
  } catch (e) {
    openNotificationError("User", (e as Error).message);
    yield put(userActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateUserSaga(action: UpdateUserRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      userRequests.update,
      action.payload.user
    );
    openNotificationSuccess("User Updated");
    yield put(userActions.updateSuccess({ user: data as IUser }));
  } catch (e) {
    openNotificationError("User", (e as Error).message);
    yield put(userActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeUserSaga(action: RemoveUserRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(userRequests.remove, action.payload.id);
    openNotificationSuccess("User Removed");
    yield put(userActions.removeSuccess());
  } catch (e) {
    openNotificationError("User", (e as Error).message);
    yield put(userActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeUserSaga(action: RemoveRangeUserRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(userRequests.removeRange, action.payload.ids);
    openNotificationSuccess("Users Removed");
    yield put(userActions.removeRangeSuccess({ ids: action.payload.ids }));
  } catch (e) {
    openNotificationError("User", (e as Error).message);
    yield put(userActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* signInSaga(action: SignInRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const response: ISignInResponse = yield call(
      userRequests.signIn,
      action.payload.user
    );
    localStorage.setItem("token", JSON.stringify(response.data?.token));
    yield put(userActions.signInSuccess());
    yield put(userActions.getWithToken());
  } catch (e) {
    openNotificationError("User", (e as Error).message);
    yield put(userActions.signInFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* getUserWithTokenSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(userRequests.getWithToken);
    yield put(
      userActions.getSuccess({
        user: data as IUser,
      })
    );
  } catch (e) {
    openNotificationError("User", (e as Error).message);
    yield put(userActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* filterUsersSaga(action: FilterUsersRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(userRequests.filter, action.payload);
    yield put(
      userActions.filterSuccess({
        users: data as IUser[],
      })
    );
  } catch (e) {
    openNotificationError("User", (e as Error).message);
    yield put(userActions.filterFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* usersaga() {
  yield takeEvery(userConst.FETCH_USERS_REQUEST, fetchUsersSaga);
  yield takeEvery(userConst.FETCH_USER_REQUEST, fetchUsersaga);
  yield takeEvery(userConst.SIGN_IN_REQUEST, signInSaga);
  yield takeEvery(userConst.GET_WITH_TOKEN_REQUEST, getUserWithTokenSaga);
  yield takeEvery(userConst.CREATE_USER_REQUEST, createUserSaga);
  yield takeEvery(userConst.CREATE_RANGE_USER_REQUEST, createRangeUserSaga);
  yield takeEvery(userConst.UPDATE_USER_REQUEST, updateUserSaga);
  yield takeEvery(userConst.REMOVE_USER_REQUEST, removeUserSaga);
  yield takeEvery(userConst.REMOVE_RANGE_USER_REQUEST, removeRangeUserSaga);
  yield takeEvery(userConst.FILTER_USERS_REQUEST, filterUsersSaga);
}

export default usersaga;
