import { licenseConst } from "./constant";
import { LicenseActions, LicenseState } from "./type";

const initialState: LicenseState = {
  license: null,
  licenses: [],
};

export default (state = initialState, action: LicenseActions) => {
  switch (action.type) {
    case licenseConst.FETCH_LICENSES_REQUEST:
      return {
        ...state,
      };
    case licenseConst.FETCH_LICENSES_SUCCESS:
      return {
        ...state,
        licenses: action.payload.licenses,
      };
    case licenseConst.FETCH_LICENSES_FAILURE:
      return {
        ...state,
        licenses: [],
      };
    case licenseConst.FETCH_LICENSE_REQUEST:
      return {
        ...state,
      };
    case licenseConst.FETCH_LICENSE_SUCCESS:
      return {
        ...state,
        license: action.payload.license,
      };
    case licenseConst.FETCH_LICENSE_FAILURE:
      return {
        ...state,
        license: null,
      };
    case licenseConst.CREATE_LICENSE_REQUEST:
      return {
        ...state,
      };
    case licenseConst.CREATE_LICENSE_SUCCESS:
      return {
        ...state,
        licenses: [...state.licenses, action.payload.license],
      };
    case licenseConst.CREATE_LICENSE_FAILURE:
      return {
        ...state,
      };
    case licenseConst.CREATE_RANGE_LICENSE_REQUEST:
      return {
        ...state,
      };
    case licenseConst.CREATE_RANGE_LICENSE_SUCCESS:
      return {
        ...state,
        licenses: [...state.licenses, ...action.payload.licenses],
      };
    case licenseConst.CREATE_RANGE_LICENSE_FAILURE:
      return {
        ...state,
      };
    case licenseConst.UPDATE_LICENSE_REQUEST:
      return {
        ...state,
      };
    case licenseConst.UPDATE_LICENSE_SUCCESS:
      return {
        ...state,
        licenses: state.licenses.map((license) =>
          license.id === action.payload.license.id
            ? action.payload.license
            : license
        ),
      };
    case licenseConst.UPDATE_LICENSE_FAILURE:
      return {
        ...state,
      };
    case licenseConst.REMOVE_LICENSE_REQUEST:
      return {
        ...state,
      };
    case licenseConst.REMOVE_LICENSE_SUCCESS:
      return {
        ...state,
        licenses: state.licenses.filter(
          (license) => license.id !== action.payload.id
        ),
      };
    case licenseConst.REMOVE_LICENSE_FAILURE:
      return {
        ...state,
      };
    case licenseConst.REMOVE_RANGE_LICENSE_REQUEST:
      return {
        ...state,
      };
    case licenseConst.REMOVE_RANGE_LICENSE_SUCCESS:
      return {
        ...state,
        licenses: state.licenses.filter(
          (license) => !action.payload.ids.includes(license.id)
        ),
      };
    case licenseConst.REMOVE_RANGE_LICENSE_FAILURE:
      return {
        ...state,
      };
    case licenseConst.USER_CHECK_IN_LICENSE_REQUEST:
      return {
        ...state,
      };
    case licenseConst.USER_CHECK_IN_LICENSE_FAILURE:
      return {
        ...state,
      };
    case licenseConst.USER_CHECK_IN_LICENSE_SUCCESS:
      return {
        ...state,
        licenses: state.licenses.map((license) =>
          license.id === action.payload.id
            ? {
                ...license,
                availableQuantity: license.availableQuantity
                  ? license.availableQuantity - action.payload.quantity
                  : 0,
              }
            : license
        ),
      };
    case licenseConst.USER_CHECK_OUT_LICENSE_REQUEST:
      return {
        ...state,
      };
    case licenseConst.USER_CHECK_OUT_LICENSE_SUCCESS:
      return {
        ...state,
        licenses: state.licenses.map((license) =>
          license.id === action.payload.id
            ? {
                ...license,
                availableQuantity: license.availableQuantity
                  ? license.availableQuantity + action.payload.quantity
                  : 0,
              }
            : license
        ),
      };
    case licenseConst.USER_CHECK_OUT_LICENSE_FAILURE:
      return {
        ...state,
      };
    case licenseConst.ASSET_CHECK_IN_LICENSE_REQUEST:
      return {
        ...state,
      };
    case licenseConst.ASSET_CHECK_IN_LICENSE_SUCCESS:
      return {
        ...state,
        licenses: state.licenses.map((license) =>
          license.id === action.payload.id
            ? {
                ...license,
                availableQuantity: license.availableQuantity
                  ? license.availableQuantity + action.payload.quantity
                  : action.payload.quantity,
              }
            : license
        ),
      };
    case licenseConst.ASSET_CHECK_IN_LICENSE_FAILURE:
      return {
        ...state,
      };
    case licenseConst.ASSET_CHECK_OUT_LICENSE_REQUEST:
      return {
        ...state,
      };
    case licenseConst.ASSET_CHECK_OUT_LICENSE_SUCCESS:
      return {
        ...state,
        licenses: state.licenses.map((license) =>
          license.id === action.payload.id
            ? {
                ...license,
                availableQuantity: license.availableQuantity
                  ? license.availableQuantity + action.payload.quantity
                  : action.payload.quantity,
              }
            : license
        ),
      };
    case licenseConst.ASSET_CHECK_OUT_LICENSE_FAILURE:
      return {
        ...state,
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
