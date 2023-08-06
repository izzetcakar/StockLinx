import { componentConst } from "./constant";
import { ComponentActions, ComponentState } from "./type";

const initialState: ComponentState = {
  component: null,
  components: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: ComponentActions) => {
  switch (action.type) {
    case componentConst.FETCH_COMPONENTS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case componentConst.FETCH_COMPONENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        components: action.payload.components,
      };
    case componentConst.FETCH_COMPONENTS_FAILURE:
      return {
        ...state,
        pending: false,
        components: [],
        error: action.payload.error,
      };
    case componentConst.FETCH_COMPONENT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case componentConst.FETCH_COMPONENT_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        component: action.payload.component,
      };
    case componentConst.FETCH_COMPONENT_FAILURE:
      return {
        ...state,
        pending: false,
        component: null,
        error: action.payload.error,
      };
    case componentConst.CREATE_COMPONENT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case componentConst.CREATE_COMPONENT_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case componentConst.CREATE_COMPONENT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case componentConst.UPDATE_COMPONENT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case componentConst.UPDATE_COMPONENT_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case componentConst.UPDATE_COMPONENT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case componentConst.REMOVE_COMPONENT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case componentConst.REMOVE_COMPONENT_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case componentConst.REMOVE_COMPONENT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case componentConst.SET_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };
    case componentConst.CLEAR_COMPONENT:
      return {
        ...state,
        component: null,
      };
    case componentConst.SET_COMPONENTS:
      return {
        ...state,
        components: action.payload,
      };
    case componentConst.CLEAR_COMPONENTS:
      return {
        ...state,
        components: [],
      };
    default:
      return { ...state };
  }
};
