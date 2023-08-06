import { userConst } from "./constant";
import { UserActions, UserState } from "./type";

const initialState: UserState = {
  user: null,
  users: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: UserActions) => {
  switch (action.type) {
    case userConst.FETCH_USERS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConst.FETCH_USERS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        users: action.payload.users,
      };
    case userConst.FETCH_USERS_FAILURE:
      return {
        ...state,
        pending: false,
        users: [],
        error: action.payload.error,
      };
    case userConst.FETCH_USER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConst.FETCH_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        user: action.payload.user,
      };
    case userConst.FETCH_USER_FAILURE:
      return {
        ...state,
        pending: false,
        user: null,
        error: action.payload.error,
      };
    case userConst.CREATE_USER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConst.CREATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case userConst.CREATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case userConst.UPDATE_USER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConst.UPDATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case userConst.UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case userConst.REMOVE_USER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConst.REMOVE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case userConst.REMOVE_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case userConst.SIGN_IN_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConst.SIGN_IN_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case userConst.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case userConst.GET_WITH_TOKEN_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConst.GET_WITH_TOKEN_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
        user: action.payload.user,
      };
    case userConst.GET_WITH_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    default:
      return { ...state };
  }
};
