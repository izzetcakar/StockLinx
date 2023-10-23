import { userConst } from "./constant";
import { UserActions, UserState } from "./type";

const initialState: UserState = {
  user: null,
  users: [],
  selectData: [],
};

export default (state = initialState, action: UserActions) => {
  switch (action.type) {
    case userConst.FETCH_USERS_REQUEST:
      return {
        ...state,
      };
    case userConst.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
      };
    case userConst.FETCH_USERS_FAILURE:
      return {
        ...state,
        users: [],
      };
    case userConst.FETCH_USER_REQUEST:
      return {
        ...state,
      };
    case userConst.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case userConst.FETCH_USER_FAILURE:
      return {
        ...state,
        user: null,
      };
    case userConst.CREATE_USER_REQUEST:
      return {
        ...state,
      };
    case userConst.CREATE_USER_SUCCESS:
      return {
        ...state,
      };
    case userConst.CREATE_USER_FAILURE:
      return {
        ...state,
      };
    case userConst.UPDATE_USER_REQUEST:
      return {
        ...state,
      };
    case userConst.UPDATE_USER_SUCCESS:
      return {
        ...state,
      };
    case userConst.UPDATE_USER_FAILURE:
      return {
        ...state,
      };
    case userConst.REMOVE_USER_REQUEST:
      return {
        ...state,
      };
    case userConst.REMOVE_USER_SUCCESS:
      return {
        ...state,
      };
    case userConst.REMOVE_USER_FAILURE:
      return {
        ...state,
      };
    case userConst.SIGN_IN_REQUEST:
      return {
        ...state,
      };
    case userConst.SIGN_IN_SUCCESS:
      return {
        ...state,
      };
    case userConst.SIGN_IN_FAILURE:
      return {
        ...state,
      };
    case userConst.GET_WITH_TOKEN_REQUEST:
      return {
        ...state,
      };
    case userConst.GET_WITH_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case userConst.GET_WITH_TOKEN_FAILURE:
      return {
        ...state,
      };
    case userConst.LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return { ...state };
  }
};
