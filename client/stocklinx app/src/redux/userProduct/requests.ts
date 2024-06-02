import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IUserProduct } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "UserProduct/";

const getAll = () => {
  return request<IUserProduct>({ requestUrl: requestUrl, apiType: "get" });
};

const get = (id: string) => {
  return request<IUserProduct>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};

const create = (userProduct: IUserProduct) => {
  return request<IUserProduct>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: userProduct,
  });
};

const createRange = (userProducts: IUserProduct[]) => {
  return request<IUserProduct>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: userProducts,
  });
};

const update = (userProduct: IUserProduct) => {
  return request<IUserProduct>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: userProduct,
  });
};

const remove = (id: string) => {
  return request<IUserProduct>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IUserProduct>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = (payload: QueryFilter[]) => {
  return request<IUserProduct>({
    requestUrl: requestUrl + "filter",
    apiType: "get",
    queryData: getQueryFilter(payload),
  });
};

export const userProductRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
