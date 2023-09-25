import { genericConst } from "./constant";
import {
  SetLoading,
  ResetLoading,
  IncreaseLoading,
  DecreaseLoading,
} from "./type";

//CLIENT ACTIONS
const setLoading = (payload: number): SetLoading => ({
  type: genericConst.SET_LOADING,
  payload,
});
const resetLoading = (): ResetLoading => ({
  type: genericConst.RESET_LOADING,
});
const increaseLoading = (): IncreaseLoading => ({
  type: genericConst.INCREASE_LOADING,
});
const decreaseLoading = (): DecreaseLoading => ({
  type: genericConst.DECREASE_LOADING,
});
const setError = (payload: string | null) => ({
  type: genericConst.SET_ERROR,
  payload,
});
const clearError = () => ({
  type: genericConst.CLEAR_ERROR,
});

export const genericActions = {
  setLoading,
  resetLoading,
  increaseLoading,
  decreaseLoading,
  setError,
  clearError,
};
