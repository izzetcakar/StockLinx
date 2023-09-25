import { call, put, takeEvery } from "redux-saga/effects";
import { userActions } from "./actions";
import { userConst } from "./constant";
import { SignInRequest } from "./type";
import { userRequests } from "./requests";
import { IUser } from "../../interfaces/interfaces";

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
    console.log(e);
  }
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
    console.log(e);
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
    }
  } catch (e) {
    console.log(e);
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
    console.log(e);
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
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default usersaga;
