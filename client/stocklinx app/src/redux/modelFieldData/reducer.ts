import { modelFieldDataConst } from "./constant";
import { ModelFieldDataActions, ModelFieldDataState } from "./type";

const initialState: ModelFieldDataState = {
  modelFieldData: null,
  modelFieldDatas: [],
};

export default (state = initialState, action: ModelFieldDataActions) => {
  switch (action.type) {
    case modelFieldDataConst.FETCH_MODELFIELDDATAS_REQUEST:
      return {
        ...state,
      };
    case modelFieldDataConst.FETCH_MODELFIELDDATAS_SUCCESS:
      return {
        ...state,
        modelFieldDatas: action.payload.modelFieldDatas,
      };
    case modelFieldDataConst.FETCH_MODELFIELDDATAS_FAILURE:
      return {
        ...state,
        modelFieldDatas: [],
      };
    case modelFieldDataConst.FETCH_MODELFIELDDATA_REQUEST:
      return {
        ...state,
      };
    case modelFieldDataConst.FETCH_MODELFIELDDATA_SUCCESS:
      return {
        ...state,
        modelFieldData: action.payload.modelFieldData,
      };
    case modelFieldDataConst.FETCH_MODELFIELDDATA_FAILURE:
      return {
        ...state,
        modelFieldData: null,
      };
    case modelFieldDataConst.CREATE_MODELFIELDDATA_REQUEST:
      return {
        ...state,
      };
    case modelFieldDataConst.CREATE_MODELFIELDDATA_SUCCESS:
      return {
        ...state,
        modelFieldDatas: [
          ...state.modelFieldDatas,
          action.payload.modelFieldData,
        ],
      };
    case modelFieldDataConst.CREATE_MODELFIELDDATA_FAILURE:
      return {
        ...state,
      };
    case modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_REQUEST:
      return {
        ...state,
      };
    case modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_SUCCESS:
      return {
        ...state,
        modelFieldDatas: [
          ...state.modelFieldDatas,
          ...action.payload.modelFieldDatas,
        ],
      };
    case modelFieldDataConst.CREATE_RANGE_MODELFIELDDATA_FAILURE:
      return {
        ...state,
      };
    case modelFieldDataConst.UPDATE_MODELFIELDDATA_REQUEST:
      return {
        ...state,
      };
    case modelFieldDataConst.UPDATE_MODELFIELDDATA_SUCCESS:
      return {
        ...state,
      };
    case modelFieldDataConst.UPDATE_MODELFIELDDATA_FAILURE:
      return {
        ...state,
      };
    case modelFieldDataConst.REMOVE_MODELFIELDDATA_REQUEST:
      return {
        ...state,
      };
    case modelFieldDataConst.REMOVE_MODELFIELDDATA_SUCCESS:
      return {
        ...state,
        modelFieldDatas: state.modelFieldDatas.filter(
          (modelFieldData) => modelFieldData.id !== action.payload.id
        ),
      };
    case modelFieldDataConst.REMOVE_MODELFIELDDATA_FAILURE:
      return {
        ...state,
      };
    case modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_REQUEST:
      return {
        ...state,
      };
    case modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_SUCCESS:
      return {
        ...state,
        modelFieldDatas: state.modelFieldDatas.filter(
          (modelFieldData) => !action.payload.ids.includes(modelFieldData.id)
        ),
      };
    case modelFieldDataConst.REMOVE_RANGE_MODELFIELDDATA_FAILURE:
      return {
        ...state,
      };
    case modelFieldDataConst.SET_MODELFIELDDATA:
      return {
        ...state,
        modelFieldData: action.payload,
      };
    case modelFieldDataConst.CLEAR_MODELFIELDDATA:
      return {
        ...state,
        modelFieldData: null,
      };
    case modelFieldDataConst.SET_MODELFIELDDATAS:
      return {
        ...state,
        modelFieldDatas: action.payload,
      };
    case modelFieldDataConst.CLEAR_MODELFIELDDATAS:
      return {
        ...state,
        modelFieldDatas: [],
      };
    default:
      return { ...state };
  }
};
