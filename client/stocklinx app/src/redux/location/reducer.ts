import {
  closeNotification,
  openNotification,
} from "../../components/notification/notification";
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
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case locationConst.FETCH_LOCATIONS_SUCCESS:
      closeNotification();
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
      closeNotification();
      return {
        ...state,
        pending: false,
        locations: [],
        error: action.payload.error,
      };
    case locationConst.FETCH_LOCATION_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case locationConst.FETCH_LOCATION_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        location: action.payload.location,
      };
    case locationConst.FETCH_LOCATION_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        location: null,
        error: action.payload.error,
      };
    case locationConst.CREATE_LOCATION_REQUEST:
      openNotification("Creating", true);
      return {
        ...state,
        pending: true,
      };
    case locationConst.CREATE_LOCATION_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case locationConst.CREATE_LOCATION_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case locationConst.UPDATE_LOCATION_REQUEST:
      openNotification("Updating", true);
      return {
        ...state,
        pending: true,
      };
    case locationConst.UPDATE_LOCATION_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case locationConst.UPDATE_LOCATION_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case locationConst.REMOVE_LOCATION_REQUEST:
      openNotification("Removing", true);
      return {
        ...state,
        pending: true,
      };
    case locationConst.REMOVE_LOCATION_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case locationConst.REMOVE_LOCATION_FAILURE:
      closeNotification();
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
