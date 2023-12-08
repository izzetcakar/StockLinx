import { fieldSetCustomFieldConst } from "./constant";
import { FieldSetCustomFieldActions, FieldSetCustomFieldState } from "./type";

const initialState: FieldSetCustomFieldState = {
  fieldSetCustomField: null,
  fieldSetCustomFields: [],
};

export default (state = initialState, action: FieldSetCustomFieldActions) => {
  switch (action.type) {
    case fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_REQUEST:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_SUCCESS:
      return {
        ...state,
        fieldSetCustomFields: action.payload.fieldSetCustomFields,
      };
    case fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_FAILURE:
      return {
        ...state,
        fieldSetCustomFields: [],
      };
    case fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_SUCCESS:
      return {
        ...state,
        fieldSetCustomField: action.payload.fieldSetCustomField,
      };
    case fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_FAILURE:
      return {
        ...state,
        fieldSetCustomField: null,
      };
    case fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_SUCCESS:
      return {
        ...state,
        fieldSetCustomFields: [
          ...state.fieldSetCustomFields,
          action.payload.fieldSetCustomField,
        ],
      };
    case fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_FAILURE:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_SUCCESS:
      return {
        ...state,
        fieldSetCustomFields: [
          ...state.fieldSetCustomFields,
          ...action.payload.fieldSetCustomFields,
        ],
      };
    case fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_FAILURE:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_SUCCESS:
      return {
        ...state,
        fieldSetCustomFields: state.fieldSetCustomFields.map(
          (fieldSetCustomField) =>
            fieldSetCustomField.id === action.payload.fieldSetCustomField.id
              ? action.payload.fieldSetCustomField
              : fieldSetCustomField
        ),
      };
    case fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_FAILURE:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_SUCCESS:
      return {
        ...state,
        fieldSetCustomFields: state.fieldSetCustomFields.filter(
          (fieldSetCustomField) => fieldSetCustomField.id !== action.payload.id
        ),
      };
    case fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_FAILURE:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_SUCCESS:
      return {
        ...state,
        fieldSetCustomFields: state.fieldSetCustomFields.filter(
          (fieldSetCustomField) =>
            !action.payload.ids.includes(fieldSetCustomField.id)
        ),
      };
    case fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_FAILURE:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.SET_FIELDSETCUSTOMFIELD:
      return {
        ...state,
        fieldSetCustomField: action.payload,
      };
    case fieldSetCustomFieldConst.CLEAR_FIELDSETCUSTOMFIELD:
      return {
        ...state,
        fieldSetCustomField: null,
      };
    case fieldSetCustomFieldConst.SET_FIELDSETCUSTOMFIELDS:
      return {
        ...state,
        fieldSetCustomFields: action.payload,
      };
    case fieldSetCustomFieldConst.CLEAR_FIELDSETCUSTOMFIELDS:
      return {
        ...state,
        fieldSetCustomFields: [],
      };
    case fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_REQUEST:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_SUCCESS:
      return {
        ...state,
      };
    case fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_FAILURE:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
