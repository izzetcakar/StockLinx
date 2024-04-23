import { IUser, IUserLoginDto } from "../../interfaces/serverInterfaces";
import { request } from "../../server/api";

const requestUrl = "User/";

const getAll = () => {
  return request<IUser>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IUser>({
    requestUrl: requestUrl + id,
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
const createRange = (users: IUser[]) => {
  return request<IUser>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: users,
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
const removeRange = (ids: string[]) => {
  return request<IUser>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const userRequests = {
  getAll,
  get,
  signIn,
  getWithToken,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
