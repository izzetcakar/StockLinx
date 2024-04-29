import { genericConst } from "./constant";

export type GenericState = {
  loading: number;
  error: string | null;
};

export type GenericPayload = {
  loading: number;
  error: string | null;
};
//CLIENT ACTION TYPES
export type SetLoading = {
  type: typeof genericConst.SET_LOADING;
  payload: number;
};
export type ResetLoading = {
  type: typeof genericConst.RESET_LOADING;
};
export type IncreaseLoading = {
  type: typeof genericConst.INCREASE_LOADING;
};
export type DecreaseLoading = {
  type: typeof genericConst.DECREASE_LOADING;
};
export type SetError = {
  type: typeof genericConst.SET_ERROR;
  payload: string | null;
};
export type ClearError = {
  type: typeof genericConst.CLEAR_ERROR;
};

export type GenericActions =
  | SetLoading
  | ResetLoading
  | IncreaseLoading
  | DecreaseLoading
  | SetError
  | ClearError;
