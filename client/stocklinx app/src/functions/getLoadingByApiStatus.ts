import { ApiStatus } from "../interfaces/interfaces";

export const getLoadingByApiStatus = (status: ApiStatus) => {
  switch (status) {
    case ApiStatus.Loading:
      return true;
    default:
      return false;
  }
};
