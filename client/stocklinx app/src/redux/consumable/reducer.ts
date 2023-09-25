import { consumableConst } from "./constant";
import { ConsumableActions, ConsumableState } from "./type";

const initialState: ConsumableState = {
  consumable: null,
  consumables: [],
  selectData: [],
};

export default (state = initialState, action: ConsumableActions) => {
  switch (action.type) {
    case consumableConst.FETCH_CONSUMABLES_REQUEST:
      return {
        ...state,
      };
    case consumableConst.FETCH_CONSUMABLES_SUCCESS:
      return {
        ...state,
        consumables: action.payload.consumables,
        selectData: action.payload.consumables.map((consumable) => ({
          value: consumable.id as string,
          label: consumable.name,
        })),
      };
    case consumableConst.FETCH_CONSUMABLES_FAILURE:
      return {
        ...state,
        consumables: [],
      };
    case consumableConst.FETCH_CONSUMABLE_REQUEST:
      return {
        ...state,
      };
    case consumableConst.FETCH_CONSUMABLE_SUCCESS:
      return {
        ...state,
        consumable: action.payload.consumable,
      };
    case consumableConst.FETCH_CONSUMABLE_FAILURE:
      return {
        ...state,
        consumable: null,
      };
    case consumableConst.CREATE_CONSUMABLE_REQUEST:
      return {
        ...state,
      };
    case consumableConst.CREATE_CONSUMABLE_SUCCESS:
      return {
        ...state,
      };
    case consumableConst.CREATE_CONSUMABLE_FAILURE:
      return {
        ...state,
      };
    case consumableConst.UPDATE_CONSUMABLE_REQUEST:
      return {
        ...state,
      };
    case consumableConst.UPDATE_CONSUMABLE_SUCCESS:
      return {
        ...state,
      };
    case consumableConst.UPDATE_CONSUMABLE_FAILURE:
      return {
        ...state,
      };
    case consumableConst.REMOVE_CONSUMABLE_REQUEST:
      return {
        ...state,
      };
    case consumableConst.REMOVE_CONSUMABLE_SUCCESS:
      return {
        ...state,
      };
    case consumableConst.REMOVE_CONSUMABLE_FAILURE:
      return {
        ...state,
      };
    case consumableConst.SET_CONSUMABLE:
      return {
        ...state,
        consumable: action.payload,
      };
    case consumableConst.CLEAR_CONSUMABLE:
      return {
        ...state,
        consumable: null,
      };
    case consumableConst.SET_CONSUMABLES:
      return {
        ...state,
        consumables: action.payload,
      };
    case consumableConst.CLEAR_CONSUMABLES:
      return {
        ...state,
        consumables: [],
      };
    default:
      return { ...state };
  }
};
