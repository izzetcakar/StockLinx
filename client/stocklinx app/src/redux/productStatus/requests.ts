import { IProductStatus } from "../../interfaces/serverInterfaces";
import { request } from "../../server/api";
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

export const productStatusRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
