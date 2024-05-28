import { ApiStatus } from "../interfaces/enums";

export const getLoadingByApiStatus = (status: ApiStatus) => {
  switch (status) {
    case ApiStatus.LOADING:
      return true;
    default:
      return false;
  }
};
