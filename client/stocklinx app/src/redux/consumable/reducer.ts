import { consumableConst } from "./constant";
import { ConsumableActions, ConsumableState } from "./type";

const initialState: ConsumableState = {
  consumable: null,
  consumables: [],
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
        consumables: [...state.consumables, action.payload.consumable],
      };
    case consumableConst.CREATE_CONSUMABLE_FAILURE:
      return {
        ...state,
      };
    case consumableConst.CREATE_RANGE_CONSUMABLE_REQUEST:
      return {
        ...state,
      };
    case consumableConst.CREATE_RANGE_CONSUMABLE_SUCCESS:
      return {
        ...state,
        consumables: [...state.consumables, ...action.payload.consumables],
      };
    case consumableConst.CREATE_RANGE_CONSUMABLE_FAILURE:
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
        consumables: state.consumables.map((consumable) =>
          consumable.id === action.payload.consumable.id
            ? action.payload.consumable
            : consumable
        ),
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
        consumables: state.consumables.filter(
          (consumable) => consumable.id !== action.payload.id
        ),
      };
    case consumableConst.REMOVE_CONSUMABLE_FAILURE:
      return {
        ...state,
      };
    case consumableConst.REMOVE_RANGE_CONSUMABLE_REQUEST:
      return {
        ...state,
      };
    case consumableConst.REMOVE_RANGE_CONSUMABLE_SUCCESS:
      return {
        ...state,
        consumables: state.consumables.filter(
          (consumable) => !action.payload.ids.includes(consumable.id)
        ),
      };
    case consumableConst.REMOVE_RANGE_CONSUMABLE_FAILURE:
      return {
        ...state,
      };
    case consumableConst.CHECK_IN_CONSUMABLE_REQUEST:
      return {
        ...state,
      };
    case consumableConst.CHECK_IN_CONSUMABLE_SUCCESS:
      return {
        ...state,
        consumables: state.consumables.map((consumable) =>
          consumable.id === action.payload.id
            ? {
                ...consumable,
                quantity: consumable.availableQuantity
                  ? consumable.availableQuantity - action.payload.quantity
                  : 0,
              }
            : consumable
        ),
      };
    case consumableConst.CHECK_IN_CONSUMABLE_FAILURE:
      return {
        ...state,
      };
    case consumableConst.CHECK_OUT_CONSUMABLE_REQUEST:
      return {
        ...state,
      };
    case consumableConst.CHECK_OUT_CONSUMABLE_SUCCESS:
      return {
        ...state,
        consumables: state.consumables.map((consumable) =>
          consumable.id === action.payload.id
            ? {
                ...consumable,
                availableQuantity: consumable.availableQuantity
                  ? consumable.availableQuantity + action.payload.quantity
                  : action.payload.quantity,
              }
            : consumable
        ),
      };
    case consumableConst.CHECK_OUT_CONSUMABLE_FAILURE:
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
