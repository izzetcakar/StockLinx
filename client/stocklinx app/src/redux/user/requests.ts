import { IUser, IUserLoginDto } from "../../interfaces/interfaces";
import { request } from "../../server/api";

const requestUrl = "User/";

const getAll = () => {
  return request<IUser>({ requestUrl: requestUrl, apiType: "get" });
};
const get = () => {
  return request<IUser>({
    requestUrl: requestUrl,
    apiType: "get",
  });
};
const signIn = (loginDto: IUserLoginDto) => {
  return request<IUserLoginDto>({
    requestUrl: requestUrl + "login",
    queryData: loginDto,
    apiType: "post",
  });
};
const getWithToken = () => {
  return request<IUser>({
    requestUrl: requestUrl + "getWithToken",
    apiType: "get",
  });
};

export const userRequests = {
  getAll,
  get,
  signIn,
  getWithToken,
};
