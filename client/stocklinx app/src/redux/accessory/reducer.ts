import { closeModal } from "@mantine/modals";
import { accessoryConst } from "./constant";
import { AccessoryActions, AccessoryState } from "./type";
import {
  closeNotification,
  openNotification,
} from "../../components/notification/notification";

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
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case accessoryConst.FETCH_ACCESSORIES_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        accessories: action.payload.accessories,
        selectData: action.payload.accessories.map((accessory) => ({
          value: accessory.id as string,
          label: accessory.name,
        })),
      };
    case accessoryConst.FETCH_ACCESSORIES_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        accessories: [],
        error: action.payload.error,
      };
    case accessoryConst.FETCH_ACCESSORY_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case accessoryConst.FETCH_ACCESSORY_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        accessory: action.payload.accessory,
      };
    case accessoryConst.FETCH_ACCESSORY_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        accessory: null,
        error: action.payload.error,
      };
    case accessoryConst.CREATE_ACCESSORY_REQUEST:
      openNotification("Creating", true);
      return {
        ...state,
        pending: true,
      };
    case accessoryConst.CREATE_ACCESSORY_SUCCESS:
      closeNotification();
      closeModal("accessory-modal");
      return {
        ...state,
        error: null,
        pending: false,
      };
    case accessoryConst.CREATE_ACCESSORY_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case accessoryConst.UPDATE_ACCESSORY_REQUEST:
      openNotification("Updating", true);
      return {
        ...state,
        pending: true,
      };
    case accessoryConst.UPDATE_ACCESSORY_SUCCESS:
      closeNotification();
      closeModal("accessory-modal");
      return {
        ...state,
        error: null,
        pending: false,
      };
    case accessoryConst.UPDATE_ACCESSORY_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case accessoryConst.REMOVE_ACCESSORY_REQUEST:
      openNotification("Removing", true);
      return {
        ...state,
        pending: true,
      };
    case accessoryConst.REMOVE_ACCESSORY_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case accessoryConst.REMOVE_ACCESSORY_FAILURE:
      closeNotification();
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
