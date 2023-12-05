import { fieldSetConst } from "./constant";
import { FieldSetActions, FieldSetState } from "./type";

const initialState: FieldSetState = {
  fieldSet: null,
  fieldSets: [],
  selectData: [],
};

export default (state = initialState, action: FieldSetActions) => {
  switch (action.type) {
    case fieldSetConst.FETCH_FIELDSETS_REQUEST:
      return {
        ...state,
      };
    case fieldSetConst.FETCH_FIELDSETS_SUCCESS:
      return {
        ...state,
        fieldSets: action.payload.fieldSets,
        selectData: action.payload.fieldSets.map((fieldSet) => ({
          value: fieldSet.id as string,
          label: fieldSet.name,
        })),
      };
    case fieldSetConst.FETCH_FIELDSETS_FAILURE:
      return {
        ...state,
        fieldSets: [],
      };
    case fieldSetConst.FETCH_FIELDSET_REQUEST:
      return {
        ...state,
      };
    case fieldSetConst.FETCH_FIELDSET_SUCCESS:
      return {
        ...state,
        fieldSet: action.payload.fieldSet,
      };
    case fieldSetConst.FETCH_FIELDSET_FAILURE:
      return {
        ...state,
        fieldSet: null,
      };
    case fieldSetConst.CREATE_FIELDSET_REQUEST:
      return {
        ...state,
      };
    case fieldSetConst.CREATE_FIELDSET_SUCCESS:
      return {
        ...state,
        fieldSets: [...state.fieldSets, action.payload.fieldSet],
      };
    case fieldSetConst.CREATE_FIELDSET_FAILURE:
      return {
        ...state,
      };
    case fieldSetConst.CREATE_RANGE_FIELDSET_REQUEST:
      return {
        ...state,
      };
    case fieldSetConst.CREATE_RANGE_FIELDSET_SUCCESS:
      return {
        ...state,
        fieldSets: [...state.fieldSets, ...action.payload.fieldSets],
      };
    case fieldSetConst.CREATE_RANGE_FIELDSET_FAILURE:
      return {
        ...state,
      };
    case fieldSetConst.UPDATE_FIELDSET_REQUEST:
      return {
        ...state,
      };
    case fieldSetConst.UPDATE_FIELDSET_SUCCESS:
      return {
        ...state,
      };
    case fieldSetConst.UPDATE_FIELDSET_FAILURE:
      return {
        ...state,
      };
    case fieldSetConst.REMOVE_FIELDSET_REQUEST:
      return {
        ...state,
      };
    case fieldSetConst.REMOVE_FIELDSET_SUCCESS:
      return {
        ...state,
        fieldSets: state.fieldSets.filter(
          (fieldSet) => fieldSet.id !== action.payload.id
        ),
      };
    case fieldSetConst.REMOVE_FIELDSET_FAILURE:
      return {
        ...state,
      };
    case fieldSetConst.REMOVE_RANGE_FIELDSET_REQUEST:
      return {
        ...state,
      };
    case fieldSetConst.REMOVE_RANGE_FIELDSET_SUCCESS:
      return {
        ...state,
        fieldSets: state.fieldSets.filter(
          (fieldSet) => !action.payload.ids.includes(fieldSet.id)
        ),
      };
    case fieldSetConst.REMOVE_RANGE_FIELDSET_FAILURE:
      return {
        ...state,
      };
    case fieldSetConst.SET_FIELDSET:
      return {
        ...state,
        fieldSet: action.payload,
      };
    case fieldSetConst.CLEAR_FIELDSET:
      return {
        ...state,
        fieldSet: null,
      };
    case fieldSetConst.SET_FIELDSETS:
      return {
        ...state,
        fieldSets: action.payload,
      };
    case fieldSetConst.CLEAR_FIELDSETS:
      return {
        ...state,
        fieldSets: [],
      };
    default:
      return { ...state };
  }
};
