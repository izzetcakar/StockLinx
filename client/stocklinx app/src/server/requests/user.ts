import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IUser, IUserLoginDto } from "@interfaces/serverInterfaces";
import { request } from "@request";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "User/";

const getAll = () => {
  return baseRequests.getAll<IUser>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IUser>(requestUrl, id);
};

const create = (user: IUser) => {
  return baseRequests.create<IUser>(requestUrl, user);
};

const createRange = (users: IUser[]) => {
  return baseRequests.createRange<IUser>(requestUrl, users);
};

const update = (user: IUser) => {
  return baseRequests.update<IUser>(requestUrl, user);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IUser>(requestUrl, queryFilters);
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
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
