import {
  closeNotification,
  openNotification,
} from "../../components/notification/notification";
import { licenseConst } from "./constant";
import { LicenseActions, LicenseState } from "./type";

const initialState: LicenseState = {
  license: null,
  licenses: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: LicenseActions) => {
  switch (action.type) {
    case licenseConst.FETCH_LICENSES_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case licenseConst.FETCH_LICENSES_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        licenses: action.payload.licenses,
        selectData: action.payload.licenses.map((license) => ({
          value: license.id as string,
          label: license.name,
        })),
      };
    case licenseConst.FETCH_LICENSES_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        licenses: [],
        error: action.payload.error,
      };
    case licenseConst.FETCH_LICENSE_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case licenseConst.FETCH_LICENSE_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        license: action.payload.license,
      };
    case licenseConst.FETCH_LICENSE_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        license: null,
        error: action.payload.error,
      };
    case licenseConst.CREATE_LICENSE_REQUEST:
      openNotification("Creating", true);
      return {
        ...state,
        pending: true,
      };
    case licenseConst.CREATE_LICENSE_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case licenseConst.CREATE_LICENSE_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case licenseConst.UPDATE_LICENSE_REQUEST:
      openNotification("Updating", true);
      return {
        ...state,
        pending: true,
      };
    case licenseConst.UPDATE_LICENSE_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case licenseConst.UPDATE_LICENSE_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case licenseConst.REMOVE_LICENSE_REQUEST:
      openNotification("Removing", true);
      return {
        ...state,
        pending: true,
      };
    case licenseConst.REMOVE_LICENSE_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case licenseConst.REMOVE_LICENSE_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case licenseConst.SET_LICENSE:
      return {
        ...state,
        license: action.payload,
      };
    case licenseConst.CLEAR_LICENSE:
      return {
        ...state,
        license: null,
      };
    case licenseConst.SET_LICENSES:
      return {
        ...state,
        licenses: action.payload,
      };
    case licenseConst.CLEAR_LICENSES:
      return {
        ...state,
        licenses: [],
      };
    default:
      return { ...state };
  }
};
