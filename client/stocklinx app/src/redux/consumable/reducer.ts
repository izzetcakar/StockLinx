import {
  closeNotification,
  openNotification,
} from "../../components/notification/notification";
import { consumableConst } from "./constant";
import { ConsumableActions, ConsumableState } from "./type";

const initialState: ConsumableState = {
  consumable: null,
  consumables: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: ConsumableActions) => {
  switch (action.type) {
    case consumableConst.FETCH_CONSUMABLES_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case consumableConst.FETCH_CONSUMABLES_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        consumables: action.payload.consumables,
        selectData: action.payload.consumables.map((consumable) => ({
          value: consumable.id as string,
          label: consumable.name,
        })),
      };
    case consumableConst.FETCH_CONSUMABLES_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        consumables: [],
        error: action.payload.error,
      };
    case consumableConst.FETCH_CONSUMABLE_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case consumableConst.FETCH_CONSUMABLE_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        consumable: action.payload.consumable,
      };
    case consumableConst.FETCH_CONSUMABLE_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        consumable: null,
        error: action.payload.error,
      };
    case consumableConst.CREATE_CONSUMABLE_REQUEST:
      openNotification("Creating", true);
      return {
        ...state,
        pending: true,
      };
    case consumableConst.CREATE_CONSUMABLE_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case consumableConst.CREATE_CONSUMABLE_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case consumableConst.UPDATE_CONSUMABLE_REQUEST:
      openNotification("Updating", true);
      return {
        ...state,
        pending: true,
      };
    case consumableConst.UPDATE_CONSUMABLE_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case consumableConst.UPDATE_CONSUMABLE_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case consumableConst.REMOVE_CONSUMABLE_REQUEST:
      openNotification("Removing", true);
      return {
        ...state,
        pending: true,
      };
    case consumableConst.REMOVE_CONSUMABLE_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case consumableConst.REMOVE_CONSUMABLE_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
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
