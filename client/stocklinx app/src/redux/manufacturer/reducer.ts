import { manufacturerConst } from "./constant";
import { ManufacturerActions, ManufacturerState } from "./type";

const initialState: ManufacturerState = {
  manufacturer: null,
  manufacturers: [],
};

export default (state = initialState, action: ManufacturerActions) => {
  switch (action.type) {
    case manufacturerConst.FETCH_MANUFACTURERS_REQUEST:
      return {
        ...state,
      };
    case manufacturerConst.FETCH_MANUFACTURERS_SUCCESS:
      return {
        ...state,
        manufacturers: action.payload.manufacturers,
      };
    case manufacturerConst.FETCH_MANUFACTURERS_FAILURE:
      return {
        ...state,
        manufacturers: [],
      };
    case manufacturerConst.FETCH_MANUFACTURER_REQUEST:
      return {
        ...state,
      };
    case manufacturerConst.FETCH_MANUFACTURER_SUCCESS:
      return {
        ...state,
        manufacturer: action.payload.manufacturer,
      };
    case manufacturerConst.FETCH_MANUFACTURER_FAILURE:
      return {
        ...state,
        manufacturer: null,
      };
    case manufacturerConst.CREATE_MANUFACTURER_REQUEST:
      return {
        ...state,
      };
    case manufacturerConst.CREATE_MANUFACTURER_SUCCESS:
      return {
        ...state,
        manufacturers: [...state.manufacturers, action.payload.manufacturer],
      };
    case manufacturerConst.CREATE_MANUFACTURER_FAILURE:
      return {
        ...state,
      };
    case manufacturerConst.CREATE_RANGE_MANUFACTURER_REQUEST:
      return {
        ...state,
      };
    case manufacturerConst.CREATE_RANGE_MANUFACTURER_SUCCESS:
      return {
        ...state,
        manufacturers: [
          ...state.manufacturers,
          ...action.payload.manufacturers,
        ],
      };
    case manufacturerConst.CREATE_RANGE_MANUFACTURER_FAILURE:
      return {
        ...state,
      };
    case manufacturerConst.UPDATE_MANUFACTURER_REQUEST:
      return {
        ...state,
      };
    case manufacturerConst.UPDATE_MANUFACTURER_SUCCESS:
      return {
        ...state,
      };
    case manufacturerConst.UPDATE_MANUFACTURER_FAILURE:
      return {
        ...state,
      };
    case manufacturerConst.REMOVE_MANUFACTURER_REQUEST:
      return {
        ...state,
      };
    case manufacturerConst.REMOVE_MANUFACTURER_SUCCESS:
      return {
        ...state,
        manufacturers: state.manufacturers.filter(
          (manufacturer) => manufacturer.id !== action.payload.id
        ),
      };
    case manufacturerConst.REMOVE_MANUFACTURER_FAILURE:
      return {
        ...state,
      };
    case manufacturerConst.REMOVE_RANGE_MANUFACTURER_REQUEST:
      return {
        ...state,
      };
    case manufacturerConst.REMOVE_RANGE_MANUFACTURER_SUCCESS:
      return {
        ...state,
        manufacturers: state.manufacturers.filter(
          (manufacturer) => !action.payload.ids.includes(manufacturer.id)
        ),
      };
    case manufacturerConst.REMOVE_RANGE_MANUFACTURER_FAILURE:
      return {
        ...state,
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
