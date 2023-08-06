import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getPending = (state: RootState) => state.user.pending;

const getUsers = (state: RootState) => state.user.users;

const getError = (state: RootState) => state.user.error;

export const getUsersSelector = createSelector(getUsers, (users) => users);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
