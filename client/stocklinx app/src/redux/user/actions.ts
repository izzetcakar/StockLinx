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
  FetchUserFailurePayload,
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
const getAllFailure = (
  payload: FetchUserFailurePayload
): FetchUsersFailure => ({
  type: userConst.FETCH_USERS_FAILURE,
  payload,
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
const getWithTokenFailure = (
  payload: FetchUserFailurePayload
): GetWithTokenFailure => ({
  type: userConst.GET_WITH_TOKEN_FAILURE,
  payload,
});

//GET:/ID
const get = (): FetchUserRequest => ({
  type: userConst.FETCH_USER_REQUEST,
});
const getSuccess = (payload: FetchUserSucccessPayload): FetchUsersuccess => ({
  type: userConst.FETCH_USER_SUCCESS,
  payload,
});
const getFailure = (payload: FetchUserFailurePayload): FetchUserFailure => ({
  type: userConst.FETCH_USER_FAILURE,
  payload,
});

//POST
const create = (): CreateUserRequest => ({
  type: userConst.CREATE_USER_REQUEST,
});
const createSuccess = (): CreateUsersuccess => ({
  type: userConst.CREATE_USER_SUCCESS,
});
const createFailure = (
  payload: FetchUserFailurePayload
): CreateUserFailure => ({
  type: userConst.CREATE_USER_FAILURE,
  payload,
});

const signIn = (payload: SignInRequestPayload): SignInRequest => ({
  type: userConst.SIGN_IN_REQUEST,
  payload,
});
const signInSuccess = (): SignInSuccess => ({
  type: userConst.SIGN_IN_SUCCESS,
});
const signInFailure = (payload: FetchUserFailurePayload): SignInFailure => ({
  type: userConst.SIGN_IN_FAILURE,
  payload,
});

//PUT
const update = (): UpdateUserRequest => ({
  type: userConst.UPDATE_USER_REQUEST,
});
const updateSuccess = (): UpdateUsersuccess => ({
  type: userConst.UPDATE_USER_SUCCESS,
});
const updateFailure = (
  payload: FetchUserFailurePayload
): UpdateUserFailure => ({
  type: userConst.UPDATE_USER_FAILURE,
  payload,
});

//REMOVE
const remove = (): RemoveUserRequest => ({
  type: userConst.REMOVE_USER_REQUEST,
});
const removeSuccess = (): RemoveUsersuccess => ({
  type: userConst.REMOVE_USER_SUCCESS,
});
const removeFailure = (
  payload: FetchUserFailurePayload
): RemoveUserFailure => ({
  type: userConst.REMOVE_USER_FAILURE,
  payload,
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
};
