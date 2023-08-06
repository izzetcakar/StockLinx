import { IUser, IUserLoginDto, SelectData } from "../../interfaces/interfaces";
import { userConst } from "./constant";

export interface UserState {
  user: IUser | null;
  users: IUser[];
  selectData: SelectData[];
  pending: boolean;
  error: string | null;
}

export interface FetchUserSucccessPayload {
  user: IUser;
}
export interface FetchUsersSucccessPayload {
  users: IUser[];
}
export interface FetchUserFailurePayload {
  error: string;
}
export interface SignInSuccessPayload {
  token: string;
}
export interface SignInRequestPayload {
  user: IUserLoginDto;
}

//GET
export interface FetchUsersRequest {
  type: typeof userConst.FETCH_USERS_REQUEST;
}
export type FetchUsersSuccess = {
  type: typeof userConst.FETCH_USERS_SUCCESS;
  payload: FetchUsersSucccessPayload;
};
export type FetchUsersFailure = {
  type: typeof userConst.FETCH_USERS_FAILURE;
  payload: FetchUserFailurePayload;
};

export interface GetWithTokenRequest {
  type: typeof userConst.GET_WITH_TOKEN_REQUEST;
}
export type GetWithTokenSuccess = {
  type: typeof userConst.GET_WITH_TOKEN_SUCCESS;
  payload: FetchUserSucccessPayload;
};
export type GetWithTokenFailure = {
  type: typeof userConst.GET_WITH_TOKEN_FAILURE;
  payload: FetchUserFailurePayload;
};

//GET:/ID
export interface FetchUserRequest {
  type: typeof userConst.FETCH_USER_REQUEST;
}
export type FetchUsersuccess = {
  type: typeof userConst.FETCH_USER_SUCCESS;
  payload: FetchUserSucccessPayload;
};
export type FetchUserFailure = {
  type: typeof userConst.FETCH_USER_FAILURE;
  payload: FetchUserFailurePayload;
};

//POST
export interface CreateUserRequest {
  type: typeof userConst.CREATE_USER_REQUEST;
}
export type CreateUsersuccess = {
  type: typeof userConst.CREATE_USER_SUCCESS;
};
export type CreateUserFailure = {
  type: typeof userConst.CREATE_USER_FAILURE;
  payload: FetchUserFailurePayload;
};

export interface SignInRequest {
  type: typeof userConst.SIGN_IN_REQUEST;
  payload: SignInRequestPayload;
}
export type SignInSuccess = {
  type: typeof userConst.SIGN_IN_SUCCESS;
};
export type SignInFailure = {
  type: typeof userConst.SIGN_IN_FAILURE;
  payload: FetchUserFailurePayload;
};

//PUT
export interface UpdateUserRequest {
  type: typeof userConst.UPDATE_USER_REQUEST;
}
export type UpdateUsersuccess = {
  type: typeof userConst.UPDATE_USER_SUCCESS;
};
export type UpdateUserFailure = {
  type: typeof userConst.UPDATE_USER_FAILURE;
  payload: FetchUserFailurePayload;
};

//REMOVE
export interface RemoveUserRequest {
  type: typeof userConst.REMOVE_USER_REQUEST;
}
export type RemoveUsersuccess = {
  type: typeof userConst.REMOVE_USER_SUCCESS;
};
export type RemoveUserFailure = {
  type: typeof userConst.REMOVE_USER_FAILURE;
  payload: FetchUserFailurePayload;
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
  | UpdateUserRequest
  | UpdateUsersuccess
  | UpdateUserFailure
  | RemoveUserRequest
  | RemoveUsersuccess
  | RemoveUserFailure
  | SignInRequest
  | SignInSuccess
  | SignInFailure
  | GetWithTokenRequest
  | GetWithTokenSuccess
  | GetWithTokenFailure;
