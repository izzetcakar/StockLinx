import { componentConst } from "./constant";
import { ComponentActions, ComponentState } from "./type";

const initialState: ComponentState = {
  component: null,
  components: [],
  selectData: [],
};

export default (state = initialState, action: ComponentActions) => {
  switch (action.type) {
    case componentConst.FETCH_COMPONENTS_REQUEST:
      return {
        ...state,
      };
    case componentConst.FETCH_COMPONENTS_SUCCESS:
      return {
        ...state,
        components: action.payload.components,
        selectData: action.payload.components.map((component) => ({
          value: component.id as string,
          label: component.name,
        })),
      };
    case componentConst.FETCH_COMPONENTS_FAILURE:
      return {
        ...state,
        components: [],
      };
    case componentConst.FETCH_COMPONENT_REQUEST:
      return {
        ...state,
      };
    case componentConst.FETCH_COMPONENT_SUCCESS:
      return {
        ...state,
        component: action.payload.component,
      };
    case componentConst.FETCH_COMPONENT_FAILURE:
      return {
        ...state,
        component: null,
      };
    case componentConst.CREATE_COMPONENT_REQUEST:
      return {
        ...state,
      };
    case componentConst.CREATE_COMPONENT_SUCCESS:
      return {
        ...state,
      };
    case componentConst.CREATE_COMPONENT_FAILURE:
      return {
        ...state,
      };
    case componentConst.CREATE_RANGE_COMPONENT_REQUEST:
      return {
        ...state,
      };
    case componentConst.CREATE_RANGE_COMPONENT_SUCCESS:
      return {
        ...state,
      };
    case componentConst.CREATE_RANGE_COMPONENT_FAILURE:
      return {
        ...state,
      };
    case componentConst.UPDATE_COMPONENT_REQUEST:
      return {
        ...state,
      };
    case componentConst.UPDATE_COMPONENT_SUCCESS:
      return {
        ...state,
      };
    case componentConst.UPDATE_COMPONENT_FAILURE:
      return {
        ...state,
      };
    case componentConst.REMOVE_COMPONENT_REQUEST:
      return {
        ...state,
      };
    case componentConst.REMOVE_COMPONENT_SUCCESS:
      return {
        ...state,
        components: state.components.filter(
          (component) => component.id !== action.payload.id
        ),
      };
    case componentConst.REMOVE_COMPONENT_FAILURE:
      return {
        ...state,
      };
    case componentConst.REMOVE_RANGE_COMPONENT_REQUEST:
      return {
        ...state,
      };
    case componentConst.REMOVE_RANGE_COMPONENT_SUCCESS:
      return {
        ...state,
        components: state.components.filter(
          (component) => !action.payload.ids.includes(component.id)
        ),
      };
    case componentConst.REMOVE_RANGE_COMPONENT_FAILURE:
      return {
        ...state,
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
