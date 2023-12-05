import { accessoryConst } from "./constant";
import { AccessoryActions, AccessoryState } from "./type";

const initialState: AccessoryState = {
  accessory: null,
  accessories: [],
  selectData: [],
};

export default (state = initialState, action: AccessoryActions) => {
  switch (action.type) {
    case accessoryConst.FETCH_ACCESSORIES_REQUEST:
      return {
        ...state,
      };
    case accessoryConst.FETCH_ACCESSORIES_SUCCESS:
      return {
        ...state,
        accessories: action.payload.accessories,
        selectData: action.payload.accessories.map((accessory) => ({
          value: accessory.id as string,
          label: accessory.name,
        })),
      };
    case accessoryConst.FETCH_ACCESSORIES_FAILURE:
      return {
        ...state,
        accessories: [],
      };
    case accessoryConst.FETCH_ACCESSORY_REQUEST:
      return {
        ...state,
      };
    case accessoryConst.FETCH_ACCESSORY_SUCCESS:
      return {
        ...state,
        accessory: action.payload.accessory,
      };
    case accessoryConst.FETCH_ACCESSORY_FAILURE:
      return {
        ...state,
        accessory: null,
      };
    case accessoryConst.CREATE_ACCESSORY_REQUEST:
      return {
        ...state,
      };
    case accessoryConst.CREATE_ACCESSORY_SUCCESS:
      return {
        ...state,
        accessories: [...state.accessories, action.payload.accessory],
      };
    case accessoryConst.CREATE_ACCESSORY_FAILURE:
      return {
        ...state,
      };
    case accessoryConst.CREATE_RANGE_ACCESSORY_REQUEST:
      return {
        ...state,
      };
    case accessoryConst.CREATE_RANGE_ACCESSORY_SUCCESS:
      return {
        ...state,
        accessories: [...state.accessories, ...action.payload.accessories],
      };
    case accessoryConst.CREATE_RANGE_ACCESSORY_FAILURE:
      return {
        ...state,
      };
    case accessoryConst.UPDATE_ACCESSORY_REQUEST:
      return {
        ...state,
      };
    case accessoryConst.UPDATE_ACCESSORY_SUCCESS:
      return {
        ...state,
      };
    case accessoryConst.UPDATE_ACCESSORY_FAILURE:
      return {
        ...state,
      };
    case accessoryConst.REMOVE_ACCESSORY_REQUEST:
      return {
        ...state,
      };
    case accessoryConst.REMOVE_ACCESSORY_SUCCESS:
      return {
        ...state,
        accessories: state.accessories.filter(
          (accessory) => accessory.id !== action.payload.id
        ),
      };
    case accessoryConst.REMOVE_ACCESSORY_FAILURE:
      return {
        ...state,
      };
    case accessoryConst.REMOVE_RANGE_ACCESSORY_REQUEST:
      return {
        ...state,
      };
    case accessoryConst.REMOVE_RANGE_ACCESSORY_SUCCESS:
      return {
        ...state,
        accessories: state.accessories.filter(
          (accessory) => !action.payload.ids.includes(accessory.id)
        ),
      };
    case accessoryConst.REMOVE_RANGE_ACCESSORY_FAILURE:
      return {
        ...state,
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
