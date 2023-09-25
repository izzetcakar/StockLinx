import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getUsers = (state: RootState) => state.user.users;

export const getUsersSelector = createSelector(getUsers, (users) => users);
