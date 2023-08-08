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
      return {
        ...state,
        pending: true,
      };
    case manufacturerConst.FETCH_MANUFACTURERS_SUCCESS:
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
      return {
        ...state,
        pending: false,
        manufacturers: [],
        error: action.payload.error,
      };
    case manufacturerConst.FETCH_MANUFACTURER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case manufacturerConst.FETCH_MANUFACTURER_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        manufacturer: action.payload.manufacturer,
      };
    case manufacturerConst.FETCH_MANUFACTURER_FAILURE:
      return {
        ...state,
        pending: false,
        manufacturer: null,
        error: action.payload.error,
      };
    case manufacturerConst.CREATE_MANUFACTURER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case manufacturerConst.CREATE_MANUFACTURER_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case manufacturerConst.CREATE_MANUFACTURER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case manufacturerConst.UPDATE_MANUFACTURER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case manufacturerConst.UPDATE_MANUFACTURER_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case manufacturerConst.UPDATE_MANUFACTURER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case manufacturerConst.REMOVE_MANUFACTURER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case manufacturerConst.REMOVE_MANUFACTURER_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case manufacturerConst.REMOVE_MANUFACTURER_FAILURE:
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
