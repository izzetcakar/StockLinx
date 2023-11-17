import { IUser, IUserLoginDto, SelectData } from "../../interfaces/interfaces";
import { userConst } from "./constant";

export interface UserState {
  user: IUser | null;
  users: IUser[];
  selectData: SelectData[];
}

export interface UserRequestPayload {
  id: string;
}
export interface UserPayload {
  user: IUser;
}
export interface UsersPayload {
  users: IUser[];
}
export interface SignInSuccessPayload {
  token: string;
}
export interface SignInRequestPayload {
  user: IUserLoginDto;
}
export interface RemoveUserRequestPayload {
  id: string;
}
export interface UserRemoveRangePayload {
  ids: string[];
}

//GET
export interface FetchUsersRequest {
  type: typeof userConst.FETCH_USERS_REQUEST;
}
export type FetchUsersSuccess = {
  type: typeof userConst.FETCH_USERS_SUCCESS;
  payload: UsersPayload;
};
export type FetchUsersFailure = {
  type: typeof userConst.FETCH_USERS_FAILURE;
};
//GET WITH TOKEN
export interface GetWithTokenRequest {
  type: typeof userConst.GET_WITH_TOKEN_REQUEST;
}
export type GetWithTokenSuccess = {
  type: typeof userConst.GET_WITH_TOKEN_SUCCESS;
  payload: UserPayload;
};
export type GetWithTokenFailure = {
  type: typeof userConst.GET_WITH_TOKEN_FAILURE;
};
//GET:/ID
export interface FetchUserRequest {
  type: typeof userConst.FETCH_USER_REQUEST;
}
export type FetchUsersuccess = {
  type: typeof userConst.FETCH_USER_SUCCESS;
  payload: UserPayload;
};
export type FetchUserFailure = {
  type: typeof userConst.FETCH_USER_FAILURE;
};
//POST
export interface CreateUserRequest {
  type: typeof userConst.CREATE_USER_REQUEST;
  payload: UserPayload;
}
export type CreateUsersuccess = {
  type: typeof userConst.CREATE_USER_SUCCESS;
};
export type CreateUserFailure = {
  type: typeof userConst.CREATE_USER_FAILURE;
};
//POST RANGE
export interface CreateRangeUserRequest {
  type: typeof userConst.CREATE_RANGE_USER_REQUEST;
  payload: UsersPayload;
}
export type CreateRangeUserSuccess = {
  type: typeof userConst.CREATE_RANGE_USER_SUCCESS;
};
export type CreateRangeUserFailure = {
  type: typeof userConst.CREATE_RANGE_USER_FAILURE;
};
//PUT
export interface UpdateUserRequest {
  type: typeof userConst.UPDATE_USER_REQUEST;
  payload: UserPayload;
}
export type UpdateUsersuccess = {
  type: typeof userConst.UPDATE_USER_SUCCESS;
};
export type UpdateUserFailure = {
  type: typeof userConst.UPDATE_USER_FAILURE;
};
//REMOVE
export interface RemoveUserRequest {
  type: typeof userConst.REMOVE_USER_REQUEST;
  payload: RemoveUserRequestPayload;
}
export type RemoveUsersuccess = {
  type: typeof userConst.REMOVE_USER_SUCCESS;
};
export type RemoveUserFailure = {
  type: typeof userConst.REMOVE_USER_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeUserRequest {
  type: typeof userConst.REMOVE_RANGE_USER_REQUEST;
  payload: UserRemoveRangePayload;
}
export type RemoveRangeUserSuccess = {
  type: typeof userConst.REMOVE_RANGE_USER_SUCCESS;
  payload: UserRemoveRangePayload;
};
export type RemoveRangeUserFailure = {
  type: typeof userConst.REMOVE_RANGE_USER_FAILURE;
};
//LOGIN
export interface SignInRequest {
  type: typeof userConst.SIGN_IN_REQUEST;
  payload: SignInRequestPayload;
}
export type SignInSuccess = {
  type: typeof userConst.SIGN_IN_SUCCESS;
};
export type SignInFailure = {
  type: typeof userConst.SIGN_IN_FAILURE;
};
//CLIENT ACTION TYPES
export interface LogoutUser {
  type: typeof userConst.LOGOUT_USER;
}

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
