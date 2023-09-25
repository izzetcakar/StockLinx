import { genericConst } from "./constant";

export interface GenericState {
  loading: number;
  error: string | null;
}

export interface GenericPayload {
  loading: number;
  error: string | null;
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
export interface SetError {
  type: typeof genericConst.SET_ERROR;
  payload: string | null;
}
export interface ClearError {
  type: typeof genericConst.CLEAR_ERROR;
}

export type GenericActions =
  | SetLoading
  | ResetLoading
  | IncreaseLoading
  | DecreaseLoading
  | SetError
  | ClearError;
