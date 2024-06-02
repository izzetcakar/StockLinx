import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAssetProduct } from "@/interfaces/serverInterfaces";
import { request } from "@/server/api";
import { getQueryFilter } from "@/utils/filterUtilts";
const requestUrl = "AssetProduct/";

const getAll = () => {
  return request<IAssetProduct>({ requestUrl: requestUrl, apiType: "get" });
};

const get = (id: string) => {
  return request<IAssetProduct>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};

const create = (assetProduct: IAssetProduct) => {
  return request<IAssetProduct>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: assetProduct,
  });
};

const createRange = (assetProducts: IAssetProduct[]) => {
  return request<IAssetProduct>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: assetProducts,
  });
};

const update = (assetProduct: IAssetProduct) => {
  return request<IAssetProduct>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: assetProduct,
  });
};

const remove = (id: string) => {
  return request<IAssetProduct>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IAssetProduct>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = (queryFilters: QueryFilter[]) => {
  return request<IAssetProduct>({
    requestUrl: requestUrl + "filter",
    apiType: "get",
    params: getQueryFilter(queryFilters),
  });
};

export const assetProductRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
