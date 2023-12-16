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
  FetchUsersSuccess,
  FetchUserFailure,
  FetchUserRequest,
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
  RemoveUserRequestPayload,
  UsersPayload,
  UserPayload,
  CreateRangeUserRequest,
  CreateRangeUserSuccess,
  CreateRangeUserFailure,
  UserRemoveRangePayload,
  RemoveRangeUserRequest,
  RemoveRangeUserSuccess,
  RemoveRangeUserFailure,
  UserRequestPayload,
} from "./type";

//GET
const getAll = (): FetchUsersRequest => ({
  type: userConst.FETCH_USERS_REQUEST,
});
const getAllSuccess = (payload: UsersPayload): FetchUsersSuccess => ({
  type: userConst.FETCH_USERS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchUsersFailure => ({
  type: userConst.FETCH_USERS_FAILURE,
});
const getWithToken = (): GetWithTokenRequest => ({
  type: userConst.GET_WITH_TOKEN_REQUEST,
});
const getWithTokenSuccess = (payload: UserPayload): GetWithTokenSuccess => ({
  type: userConst.GET_WITH_TOKEN_SUCCESS,
  payload,
});
const getWithTokenFailure = (): GetWithTokenFailure => ({
  type: userConst.GET_WITH_TOKEN_FAILURE,
});

//GET:/ID
const get = (payload: UserRequestPayload): FetchUserRequest => ({
  type: userConst.FETCH_USER_REQUEST,
  payload,
});
const getSuccess = (payload: UserPayload): FetchUsersuccess => ({
  type: userConst.FETCH_USER_SUCCESS,
  payload,
});
const getFailure = (): FetchUserFailure => ({
  type: userConst.FETCH_USER_FAILURE,
});

//POST
const create = (payload: UserPayload): CreateUserRequest => ({
  type: userConst.CREATE_USER_REQUEST,
  payload,
});
const createSuccess = (payload: UserPayload): CreateUsersuccess => ({
  type: userConst.CREATE_USER_SUCCESS,
  payload,
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

//POST RANGE
const createRange = (payload: UsersPayload): CreateRangeUserRequest => ({
  type: userConst.CREATE_RANGE_USER_REQUEST,
  payload,
});
const createRangeSuccess = (payload: UsersPayload): CreateRangeUserSuccess => ({
  type: userConst.CREATE_RANGE_USER_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeUserFailure => ({
  type: userConst.CREATE_RANGE_USER_FAILURE,
});

//PUT
const update = (payload: UserPayload): UpdateUserRequest => ({
  type: userConst.UPDATE_USER_REQUEST,
  payload,
});
const updateSuccess = (payload: UserPayload): UpdateUsersuccess => ({
  type: userConst.UPDATE_USER_SUCCESS,
  payload,
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

//REMOVE RANGE
const removeRange = (
  payload: UserRemoveRangePayload
): RemoveRangeUserRequest => ({
  type: userConst.REMOVE_RANGE_USER_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: UserRemoveRangePayload
): RemoveRangeUserSuccess => ({
  type: userConst.REMOVE_RANGE_USER_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeUserFailure => ({
  type: userConst.REMOVE_RANGE_USER_FAILURE,
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
  createRange,
  createRangeSuccess,
  createRangeFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  removeRange,
  removeRangeSuccess,
  removeRangeFailure,
  getWithToken,
  getWithTokenSuccess,
  getWithTokenFailure,
  signIn,
  signInSuccess,
  signInFailure,
  logoutUser,
};
