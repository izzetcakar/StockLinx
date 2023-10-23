import { IProductStatus } from "../../interfaces/interfaces";
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

export const productStatusRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
