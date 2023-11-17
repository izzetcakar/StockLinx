import { modelConst } from "./constant";
import { ModelActions, ModelState } from "./type";

const initialState: ModelState = {
  model: null,
  models: [],
  selectData: [],
};

export default (state = initialState, action: ModelActions) => {
  switch (action.type) {
    case modelConst.FETCH_MODELS_REQUEST:
      return {
        ...state,
      };
    case modelConst.FETCH_MODELS_SUCCESS:
      return {
        ...state,
        models: action.payload.models,
        selectData: action.payload.models.map((model) => ({
          value: model.id as string,
          label: model.name,
        })),
      };
    case modelConst.FETCH_MODELS_FAILURE:
      return {
        ...state,
        models: [],
      };
    case modelConst.FETCH_MODEL_REQUEST:
      return {
        ...state,
      };
    case modelConst.FETCH_MODEL_SUCCESS:
      return {
        ...state,
        model: action.payload.model,
      };
    case modelConst.FETCH_MODEL_FAILURE:
      return {
        ...state,
        model: null,
      };
    case modelConst.CREATE_MODEL_REQUEST:
      return {
        ...state,
      };
    case modelConst.CREATE_MODEL_SUCCESS:
      return {
        ...state,
      };
    case modelConst.CREATE_MODEL_FAILURE:
      return {
        ...state,
      };
    case modelConst.CREATE_RANGE_MODEL_REQUEST:
      return {
        ...state,
      };
    case modelConst.CREATE_RANGE_MODEL_SUCCESS:
      return {
        ...state,
      };
    case modelConst.CREATE_RANGE_MODEL_FAILURE:
      return {
        ...state,
      };
    case modelConst.UPDATE_MODEL_REQUEST:
      return {
        ...state,
      };
    case modelConst.UPDATE_MODEL_SUCCESS:
      return {
        ...state,
      };
    case modelConst.UPDATE_MODEL_FAILURE:
      return {
        ...state,
      };
    case modelConst.REMOVE_MODEL_REQUEST:
      return {
        ...state,
      };
    case modelConst.REMOVE_MODEL_SUCCESS:
      return {
        ...state,
        models: state.models.filter(
          (model) => model.id !== action.payload.id
        ),
      };
    case modelConst.REMOVE_MODEL_FAILURE:
      return {
        ...state,
      };
    case modelConst.REMOVE_RANGE_MODEL_REQUEST:
      return {
        ...state,
      };
    case modelConst.REMOVE_RANGE_MODEL_SUCCESS:
      return {
        ...state,
        models: state.models.filter(
          (model) => !action.payload.ids.includes(model.id)
        ),
      };
    case modelConst.REMOVE_RANGE_MODEL_FAILURE:
      return {
        ...state,
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
