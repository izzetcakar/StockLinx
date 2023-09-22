import { genericConst } from "./constant";

export interface GenericState {
  loading: number;
}

export interface GenericPayload {
  loading: number;
}
//CLIENT ACTION TYPES
export interface SetLoading {
  type: typeof genericConst.SET_LOADING;
  payload: number;
}
export interface ResetLoading {
  type: typeof genericConst.RESET_LOADING;
}
export interface IncreaseLoading {
  type: typeof genericConst.INCREASE_LOADING;
}
export interface DecreaseLoading {
  type: typeof genericConst.DECREASE_LOADING;
}

export type GenericActions =
  | SetLoading
  | ResetLoading
  | IncreaseLoading
  | DecreaseLoading;
