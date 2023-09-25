import { genericConst } from "./constant";
import { GenericActions, GenericState } from "./type";

const initialState: GenericState = {
  loading: 0,
  error: null,
};

export default (state = initialState, action: GenericActions) => {
  switch (action.type) {
    case genericConst.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case genericConst.RESET_LOADING:
      return {
        ...state,
        loading: 0,
      };
    case genericConst.INCREASE_LOADING:
      return {
        ...state,
        loading: state.loading + 1,
      };
    case genericConst.DECREASE_LOADING:
      return {
        ...state,
        loading: state.loading <= 1 ? 0 : state.loading - 1,
      };
    case genericConst.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case genericConst.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return { ...state };
  }
};
