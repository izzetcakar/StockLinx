import {
  closeNotification,
  openNotification,
} from "../../components/notification/notification";
import { manufacturerConst } from "./constant";
import { ManufacturerActions, ManufacturerState } from "./type";

const initialState: ManufacturerState = {
  manufacturer: null,
  manufacturers: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: ManufacturerActions) => {
  switch (action.type) {
    case manufacturerConst.FETCH_MANUFACTURERS_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case manufacturerConst.FETCH_MANUFACTURERS_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        manufacturers: action.payload.manufacturers,
        selectData: action.payload.manufacturers.map((manufacturer) => ({
          value: manufacturer.id as string,
          label: manufacturer.name,
        })),
      };
    case manufacturerConst.FETCH_MANUFACTURERS_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        manufacturers: [],
        error: action.payload.error,
      };
    case manufacturerConst.FETCH_MANUFACTURER_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case manufacturerConst.FETCH_MANUFACTURER_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        manufacturer: action.payload.manufacturer,
      };
    case manufacturerConst.FETCH_MANUFACTURER_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        manufacturer: null,
        error: action.payload.error,
      };
    case manufacturerConst.CREATE_MANUFACTURER_REQUEST:
      openNotification("Creating", true);
      return {
        ...state,
        pending: true,
      };
    case manufacturerConst.CREATE_MANUFACTURER_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case manufacturerConst.CREATE_MANUFACTURER_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case manufacturerConst.UPDATE_MANUFACTURER_REQUEST:
      openNotification("Updating", true);
      return {
        ...state,
        pending: true,
      };
    case manufacturerConst.UPDATE_MANUFACTURER_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case manufacturerConst.UPDATE_MANUFACTURER_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case manufacturerConst.REMOVE_MANUFACTURER_REQUEST:
      openNotification("Removing", true);
      return {
        ...state,
        pending: true,
      };
    case manufacturerConst.REMOVE_MANUFACTURER_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case manufacturerConst.REMOVE_MANUFACTURER_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case manufacturerConst.SET_MANUFACTURER:
      return {
        ...state,
        manufacturer: action.payload,
      };
    case manufacturerConst.CLEAR_MANUFACTURER:
      return {
        ...state,
        manufacturer: null,
      };
    case manufacturerConst.SET_MANUFACTURERS:
      return {
        ...state,
        manufacturers: action.payload,
      };
    case manufacturerConst.CLEAR_MANUFACTURERS:
      return {
        ...state,
        manufacturers: [],
      };
    default:
      return { ...state };
  }
};
