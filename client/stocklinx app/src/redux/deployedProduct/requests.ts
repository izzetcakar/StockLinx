import { IDeployedProduct } from "../../interfaces/serverInterfaces";
import { request } from "../../server/api";
const requestUrl = "DeployedProduct/";

const getAll = () => {
  return request<IDeployedProduct>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IDeployedProduct>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (deployedProduct: IDeployedProduct) => {
  return request<IDeployedProduct>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: deployedProduct,
  });
};
const createRange = (deployedProducts: IDeployedProduct[]) => {
  return request<IDeployedProduct>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: deployedProducts,
  });
};
const update = (deployedProduct: IDeployedProduct) => {
  return request<IDeployedProduct>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: deployedProduct,
  });
};
const remove = (id: string) => {
  return request<IDeployedProduct>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<IDeployedProduct>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const deployedProductRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
