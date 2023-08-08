import { locationConst } from "./constant";
import { LocationActions, LocationState } from "./type";

const initialState: LocationState = {
  location: null,
  locations: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: LocationActions) => {
  switch (action.type) {
    case locationConst.FETCH_LOCATIONS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case locationConst.FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        locations: action.payload.locations,
        selectData: action.payload.locations.map((location) => ({
          value: location.id as string,
          label: location.name,
        })),
      };
    case locationConst.FETCH_LOCATIONS_FAILURE:
      return {
        ...state,
        pending: false,
        locations: [],
        error: action.payload.error,
      };
    case locationConst.FETCH_LOCATION_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case locationConst.FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        location: action.payload.location,
      };
    case locationConst.FETCH_LOCATION_FAILURE:
      return {
        ...state,
        pending: false,
        location: null,
        error: action.payload.error,
      };
    case locationConst.CREATE_LOCATION_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case locationConst.CREATE_LOCATION_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case locationConst.CREATE_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case locationConst.UPDATE_LOCATION_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case locationConst.UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case locationConst.UPDATE_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case locationConst.REMOVE_LOCATION_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case locationConst.REMOVE_LOCATION_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case locationConst.REMOVE_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case locationConst.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case locationConst.CLEAR_LOCATION:
      return {
        ...state,
        location: null,
      };
    case locationConst.SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case locationConst.CLEAR_LOCATIONS:
      return {
        ...state,
        locations: [],
      };
    default:
      return { ...state };
  }
};
