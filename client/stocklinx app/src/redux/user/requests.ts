import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IUser, IUserLoginDto } from "@interfaces/serverInterfaces";
import { request } from "@request";

const requestUrl = "User/";

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
const getAll = async (): Promise<IUser[]> => {
  return (await request<IUser>({ requestUrl: requestUrl, apiType: "get" }))
    .data as IUser[];
};

const get = async (id: string): Promise<IUser> => {
  return (
    await request<IUser>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IUser;
};

const create = async (consumable: IUser): Promise<IUser> => {
  return (
    await request<IUser>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as IUser;
};

const createRange = async (consumables: IUser[]): Promise<IUser[]> => {
  return (
    await request<IUser>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as IUser[];
};

const update = async (consumable: IUser): Promise<IUser> => {
  return (
    await request<IUser>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as IUser;
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

const filter = async (queryFilters: QueryFilter[]): Promise<IUser[]> => {
  return (
    await request<IUser>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IUser[];
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
