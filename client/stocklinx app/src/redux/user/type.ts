import { IUser, IUserLoginDto } from "../../interfaces/serverInterfaces";
import { userConst } from "./constant";

export type UserState = {
  user: IUser | null;
  users: IUser[];
};

export type UserRequestPayload = {
  id: string;
};
export type UserPayload = {
  user: IUser;
};
export type UsersPayload = {
  users: IUser[];
};
export type SignInSuccessPayload = {
  token: string;
};
export type SignInRequestPayload = {
  user: IUserLoginDto;
};
export type RemoveUserRequestPayload = {
  id: string;
};
export type UserRemoveRangePayload = {
  ids: string[];
};

//GET
export type FetchUsersRequest = {
  type: typeof userConst.FETCH_USERS_REQUEST;
};
export type FetchUsersSuccess = {
  type: typeof userConst.FETCH_USERS_SUCCESS;
  payload: UsersPayload;
};
export type FetchUsersFailure = {
  type: typeof userConst.FETCH_USERS_FAILURE;
};
//GET WITH TOKEN
export type GetWithTokenRequest = {
  type: typeof userConst.GET_WITH_TOKEN_REQUEST;
};
export type GetWithTokenSuccess = {
  type: typeof userConst.GET_WITH_TOKEN_SUCCESS;
  payload: UserPayload;
};
export type GetWithTokenFailure = {
  type: typeof userConst.GET_WITH_TOKEN_FAILURE;
};
//GET:/ID
export type FetchUserRequest = {
  type: typeof userConst.FETCH_USER_REQUEST;
  payload: UserRequestPayload;
};
export type FetchUsersuccess = {
  type: typeof userConst.FETCH_USER_SUCCESS;
  payload: UserPayload;
};
export type FetchUserFailure = {
  type: typeof userConst.FETCH_USER_FAILURE;
};
//POST
export type CreateUserRequest = {
  type: typeof userConst.CREATE_USER_REQUEST;
  payload: UserPayload;
};
export type CreateUsersuccess = {
  type: typeof userConst.CREATE_USER_SUCCESS;
  payload: UserPayload;
};
export type CreateUserFailure = {
  type: typeof userConst.CREATE_USER_FAILURE;
};
//POST RANGE
export type CreateRangeUserRequest = {
  type: typeof userConst.CREATE_RANGE_USER_REQUEST;
  payload: UsersPayload;
};
export type CreateRangeUserSuccess = {
  type: typeof userConst.CREATE_RANGE_USER_SUCCESS;
  payload: UsersPayload;
};
export type CreateRangeUserFailure = {
  type: typeof userConst.CREATE_RANGE_USER_FAILURE;
};
//PUT
export type UpdateUserRequest = {
  type: typeof userConst.UPDATE_USER_REQUEST;
  payload: UserPayload;
};
export type UpdateUsersuccess = {
  type: typeof userConst.UPDATE_USER_SUCCESS;
  payload: UserPayload;
};
export type UpdateUserFailure = {
  type: typeof userConst.UPDATE_USER_FAILURE;
};
//REMOVE
export type RemoveUserRequest = {
  type: typeof userConst.REMOVE_USER_REQUEST;
  payload: RemoveUserRequestPayload;
};
export type RemoveUsersuccess = {
  type: typeof userConst.REMOVE_USER_SUCCESS;
};
export type RemoveUserFailure = {
  type: typeof userConst.REMOVE_USER_FAILURE;
};
//REMOVE RANGE
export type RemoveRangeUserRequest = {
  type: typeof userConst.REMOVE_RANGE_USER_REQUEST;
  payload: UserRemoveRangePayload;
};
export type RemoveRangeUserSuccess = {
  type: typeof userConst.REMOVE_RANGE_USER_SUCCESS;
  payload: UserRemoveRangePayload;
};
export type RemoveRangeUserFailure = {
  type: typeof userConst.REMOVE_RANGE_USER_FAILURE;
};
//LOGIN
export type SignInRequest = {
  type: typeof userConst.SIGN_IN_REQUEST;
  payload: SignInRequestPayload;
};
export type SignInSuccess = {
  type: typeof userConst.SIGN_IN_SUCCESS;
};
export type SignInFailure = {
  type: typeof userConst.SIGN_IN_FAILURE;
};
//CLIENT ACTION TYPES
export type LogoutUser = {
  type: typeof userConst.LOGOUT_USER;
};

export type UserActions =
  | FetchUsersRequest
  | FetchUsersSuccess
  | FetchUsersFailure
  | FetchUserRequest
  | FetchUsersuccess
  | FetchUserFailure
  | CreateUserRequest
  | CreateUsersuccess
  | CreateUserFailure
  | CreateRangeUserRequest
  | CreateRangeUserSuccess
  | CreateRangeUserFailure
  | UpdateUserRequest
  | UpdateUsersuccess
  | UpdateUserFailure
  | RemoveUserRequest
  | RemoveUsersuccess
  | RemoveUserFailure
  | RemoveRangeUserRequest
  | RemoveRangeUserSuccess
  | RemoveRangeUserFailure
  | SignInRequest
  | SignInSuccess
  | SignInFailure
  | GetWithTokenRequest
  | GetWithTokenSuccess
  | GetWithTokenFailure
  | LogoutUser;
