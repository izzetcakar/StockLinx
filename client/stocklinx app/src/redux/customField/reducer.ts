import { customFieldConst } from "./constant";
import { CustomFieldActions, CustomFieldState } from "./type";

const initialState: CustomFieldState = {
  customField: null,
  customFields: [],
  selectData: [],
};

export default (state = initialState, action: CustomFieldActions) => {
  switch (action.type) {
    case customFieldConst.FETCH_CUSTOMFIELDS_REQUEST:
      return {
        ...state,
      };
    case customFieldConst.FETCH_CUSTOMFIELDS_SUCCESS:
      return {
        ...state,
        customFields: action.payload.customFields,
        selectData: action.payload.customFields.map((customField) => ({
          value: customField.id as string,
          label: customField.name,
        })),
      };
    case customFieldConst.FETCH_CUSTOMFIELDS_FAILURE:
      return {
        ...state,
        customFields: [],
      };
    case customFieldConst.FETCH_CUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case customFieldConst.FETCH_CUSTOMFIELD_SUCCESS:
      return {
        ...state,
        customField: action.payload.customField,
      };
    case customFieldConst.FETCH_CUSTOMFIELD_FAILURE:
      return {
        ...state,
        customField: null,
      };
    case customFieldConst.CREATE_CUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case customFieldConst.CREATE_CUSTOMFIELD_SUCCESS:
      return {
        ...state,
        customFields: [...state.customFields, action.payload.customField],
      };
    case customFieldConst.CREATE_CUSTOMFIELD_FAILURE:
      return {
        ...state,
      };
    case customFieldConst.CREATE_RANGE_CUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case customFieldConst.CREATE_RANGE_CUSTOMFIELD_SUCCESS:
      return {
        ...state,
        customFields: [...state.customFields, ...action.payload.customFields],
      };
    case customFieldConst.CREATE_RANGE_CUSTOMFIELD_FAILURE:
      return {
        ...state,
      };
    case customFieldConst.UPDATE_CUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case customFieldConst.UPDATE_CUSTOMFIELD_SUCCESS:
      return {
        ...state,
      };
    case customFieldConst.UPDATE_CUSTOMFIELD_FAILURE:
      return {
        ...state,
      };
    case customFieldConst.REMOVE_CUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case customFieldConst.REMOVE_CUSTOMFIELD_SUCCESS:
      return {
        ...state,
        customFields: state.customFields.filter(
          (customField) => customField.id !== action.payload.id
        ),
      };
    case customFieldConst.REMOVE_CUSTOMFIELD_FAILURE:
      return {
        ...state,
      };
    case customFieldConst.REMOVE_RANGE_CUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case customFieldConst.REMOVE_RANGE_CUSTOMFIELD_SUCCESS:
      return {
        ...state,
        customFields: state.customFields.filter(
          (customField) => !action.payload.ids.includes(customField.id)
        ),
      };
    case customFieldConst.REMOVE_RANGE_CUSTOMFIELD_FAILURE:
      return {
        ...state,
      };
    case customFieldConst.SET_CUSTOMFIELD:
      return {
        ...state,
        customField: action.payload,
      };
    case customFieldConst.CLEAR_CUSTOMFIELD:
      return {
        ...state,
        customField: null,
      };
    case customFieldConst.SET_CUSTOMFIELDS:
      return {
        ...state,
        customFields: action.payload,
      };
    case customFieldConst.CLEAR_CUSTOMFIELDS:
      return {
        ...state,
        customFields: [],
      };
    default:
      return { ...state };
  }
};
