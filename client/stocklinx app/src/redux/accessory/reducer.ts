import { accessoryConst } from "./constant";
import { AccessoryActions, AccessoryState } from "./type";

const initialState: AccessoryState = {
  accessory: null,
  accessories: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: AccessoryActions) => {
  switch (action.type) {
    case accessoryConst.FETCH_ACCESSORIES_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case accessoryConst.FETCH_ACCESSORIES_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        accessories: action.payload.accessories,
      };
    case accessoryConst.FETCH_ACCESSORIES_FAILURE:
      return {
        ...state,
        pending: false,
        accessories: [],
        error: action.payload.error,
      };
    case accessoryConst.FETCH_ACCESSORY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case accessoryConst.FETCH_ACCESSORY_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        accessory: action.payload.accessory,
      };
    case accessoryConst.FETCH_ACCESSORY_FAILURE:
      return {
        ...state,
        pending: false,
        accessory: null,
        error: action.payload.error,
      };
    case accessoryConst.CREATE_ACCESSORY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case accessoryConst.CREATE_ACCESSORY_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case accessoryConst.CREATE_ACCESSORY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case accessoryConst.UPDATE_ACCESSORY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case accessoryConst.UPDATE_ACCESSORY_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case accessoryConst.UPDATE_ACCESSORY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case accessoryConst.REMOVE_ACCESSORY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case accessoryConst.REMOVE_ACCESSORY_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case accessoryConst.REMOVE_ACCESSORY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case accessoryConst.SET_ACCESSORY:
      return {
        ...state,
        accessory: action.payload,
      };
    case accessoryConst.CLEAR_ACCESSORY:
      return {
        ...state,
        accessory: null,
      };
    case accessoryConst.SET_ACCESSORIES:
      return {
        ...state,
        accessories: action.payload,
      };
    case accessoryConst.CLEAR_ACCESSORIES:
      return {
        ...state,
        accessories: [],
      };
    default:
      return { ...state };
  }
};
