import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IProductStatus } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "ProductStatus/";

const getAll = () => {
  return request<IProductStatus>({ requestUrl: requestUrl, apiType: "get" });
};

const get = (id: string) => {
  return request<IProductStatus>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};

const create = (productStatus: IProductStatus) => {
  return request<IProductStatus>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: productStatus,
  });
};

const createRange = (productStatuses: IProductStatus[]) => {
  return request<IProductStatus>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: productStatuses,
  });
};

const update = (productStatus: IProductStatus) => {
  return request<IProductStatus>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: productStatus,
  });
};

const remove = (id: string) => {
  return request<IProductStatus>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IProductStatus>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = (payload: QueryFilter[]) => {
  return request<IProductStatus>({
    requestUrl: requestUrl + "filter",
    apiType: "get",
    queryData: getQueryFilter(payload),
  });
};

export const productStatusRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
