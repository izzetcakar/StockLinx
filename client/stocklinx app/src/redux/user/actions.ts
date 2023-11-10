import { userConst } from "./constant";
import {
  CreateUserFailure,
  CreateUserRequest,
  CreateUsersuccess,
  RemoveUserFailure,
  RemoveUserRequest,
  RemoveUsersuccess,
  FetchUsersFailure,
  FetchUsersRequest,
  FetchUsersSucccessPayload,
  FetchUsersSuccess,
  FetchUserFailure,
  FetchUserRequest,
  FetchUserSucccessPayload,
  FetchUsersuccess,
  UpdateUserFailure,
  UpdateUserRequest,
  UpdateUsersuccess,
  GetWithTokenRequest,
  GetWithTokenSuccess,
  GetWithTokenFailure,
  SignInRequest,
  SignInRequestPayload,
  SignInSuccess,
  SignInFailure,
  LogoutUser,
  EditUserReuqestPayload,
  RemoveUserRequestPayload,
} from "./type";

//GET
const getAll = (): FetchUsersRequest => ({
  type: userConst.FETCH_USERS_REQUEST,
});
const getAllSuccess = (
  payload: FetchUsersSucccessPayload
): FetchUsersSuccess => ({
  type: userConst.FETCH_USERS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchUsersFailure => ({
  type: userConst.FETCH_USERS_FAILURE,
});
const getWithToken = (): GetWithTokenRequest => ({
  type: userConst.GET_WITH_TOKEN_REQUEST,
});
const getWithTokenSuccess = (
  payload: FetchUserSucccessPayload
): GetWithTokenSuccess => ({
  type: userConst.GET_WITH_TOKEN_SUCCESS,
  payload,
});
const getWithTokenFailure = (): GetWithTokenFailure => ({
  type: userConst.GET_WITH_TOKEN_FAILURE,
});

//GET:/ID
const get = (): FetchUserRequest => ({
  type: userConst.FETCH_USER_REQUEST,
});
const getSuccess = (payload: FetchUserSucccessPayload): FetchUsersuccess => ({
  type: userConst.FETCH_USER_SUCCESS,
  payload,
});
const getFailure = (): FetchUserFailure => ({
  type: userConst.FETCH_USER_FAILURE,
});

//POST
const create = (payload: EditUserReuqestPayload): CreateUserRequest => ({
  type: userConst.CREATE_USER_REQUEST,
  payload,
});
const createSuccess = (): CreateUsersuccess => ({
  type: userConst.CREATE_USER_SUCCESS,
});
const createFailure = (): CreateUserFailure => ({
  type: userConst.CREATE_USER_FAILURE,
});

const signIn = (payload: SignInRequestPayload): SignInRequest => ({
  type: userConst.SIGN_IN_REQUEST,
  payload,
});
const signInSuccess = (): SignInSuccess => ({
  type: userConst.SIGN_IN_SUCCESS,
});
const signInFailure = (): SignInFailure => ({
  type: userConst.SIGN_IN_FAILURE,
});

//PUT
const update = (payload: EditUserReuqestPayload): UpdateUserRequest => ({
  type: userConst.UPDATE_USER_REQUEST,
  payload,
});
const updateSuccess = (): UpdateUsersuccess => ({
  type: userConst.UPDATE_USER_SUCCESS,
});
const updateFailure = (): UpdateUserFailure => ({
  type: userConst.UPDATE_USER_FAILURE,
});

//REMOVE
const remove = (payload: RemoveUserRequestPayload): RemoveUserRequest => ({
  type: userConst.REMOVE_USER_REQUEST,
  payload,
});
const removeSuccess = (): RemoveUsersuccess => ({
  type: userConst.REMOVE_USER_SUCCESS,
});
const removeFailure = (): RemoveUserFailure => ({
  type: userConst.REMOVE_USER_FAILURE,
});

//CLIENT ACTIONS
const logoutUser = (): LogoutUser => ({
  type: userConst.LOGOUT_USER,
});

export const userActions = {
  getAll,
  getAllSuccess,
  getAllFailure,
  get,
  getSuccess,
  getFailure,
  create,
  createSuccess,
  createFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  getWithToken,
  getWithTokenSuccess,
  getWithTokenFailure,
  signIn,
  signInSuccess,
  signInFailure,
  logoutUser,
};
