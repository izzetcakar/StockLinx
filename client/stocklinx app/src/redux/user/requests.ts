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
const create = (user: IUser) => {
  return request<IUser>({
    requestUrl: requestUrl,
    queryData: user,
    apiType: "post",
  });
};
const update = (user: IUser) => {
  return request<IUser>({
    requestUrl: requestUrl,
    queryData: user,
    apiType: "put",
  });
};
const remove = (id: string) => {
  return request<IUser>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

export const userRequests = {
  getAll,
  get,
  signIn,
  getWithToken,
  create,
  update,
  remove,
};
