import { locationConst } from "./constant";
import { LocationActions, LocationState } from "./type";

const initialState: LocationState = {
  location: null,
  locations: [],
  selectData: [],
};

export default (state = initialState, action: LocationActions) => {
  switch (action.type) {
    case locationConst.FETCH_LOCATIONS_REQUEST:
      return {
        ...state,
      };
    case locationConst.FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload.locations,
        selectData: action.payload.locations.map((location) => ({
          value: location.id as string,
          label: location.name,
        })),
      };
    case locationConst.FETCH_LOCATIONS_FAILURE:
      return {
        ...state,
        locations: [],
      };
    case locationConst.FETCH_LOCATION_REQUEST:
      return {
        ...state,
      };
    case locationConst.FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload.location,
      };
    case locationConst.FETCH_LOCATION_FAILURE:
      return {
        ...state,
        location: null,
      };
    case locationConst.CREATE_LOCATION_REQUEST:
      return {
        ...state,
      };
    case locationConst.CREATE_LOCATION_SUCCESS:
      return {
        ...state,
      };
    case locationConst.CREATE_LOCATION_FAILURE:
      return {
        ...state,
      };
    case locationConst.UPDATE_LOCATION_REQUEST:
      return {
        ...state,
      };
    case locationConst.UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
      };
    case locationConst.UPDATE_LOCATION_FAILURE:
      return {
        ...state,
      };
    case locationConst.REMOVE_LOCATION_REQUEST:
      return {
        ...state,
      };
    case locationConst.REMOVE_LOCATION_SUCCESS:
      return {
        ...state,
      };
    case locationConst.REMOVE_LOCATION_FAILURE:
      return {
        ...state,
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
