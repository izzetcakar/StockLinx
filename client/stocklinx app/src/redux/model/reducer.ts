import { modelConst } from "./constant";
import { ModelActions, ModelState } from "./type";

const initialState: ModelState = {
  model: null,
  models: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: ModelActions) => {
  switch (action.type) {
    case modelConst.FETCH_MODELS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case modelConst.FETCH_MODELS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        models: action.payload.models,
        selectData: action.payload.models.map((model) => ({
          value: model.id as string,
          label: model.name,
        })),
      };
    case modelConst.FETCH_MODELS_FAILURE:
      return {
        ...state,
        pending: false,
        models: [],
        error: action.payload.error,
      };
    case modelConst.FETCH_MODEL_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case modelConst.FETCH_MODEL_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        model: action.payload.model,
      };
    case modelConst.FETCH_MODEL_FAILURE:
      return {
        ...state,
        pending: false,
        model: null,
        error: action.payload.error,
      };
    case modelConst.CREATE_MODEL_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case modelConst.CREATE_MODEL_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case modelConst.CREATE_MODEL_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case modelConst.UPDATE_MODEL_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case modelConst.UPDATE_MODEL_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case modelConst.UPDATE_MODEL_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case modelConst.REMOVE_MODEL_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case modelConst.REMOVE_MODEL_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case modelConst.REMOVE_MODEL_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case modelConst.SET_MODEL:
      return {
        ...state,
        model: action.payload,
      };
    case modelConst.CLEAR_MODEL:
      return {
        ...state,
        model: null,
      };
    case modelConst.SET_MODELS:
      return {
        ...state,
        models: action.payload,
      };
    case modelConst.CLEAR_MODELS:
      return {
        ...state,
        models: [],
      };
    default:
      return { ...state };
  }
};
