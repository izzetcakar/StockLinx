import {
  IEntityCount,
  IProductCategoryCount,
  IProductLocationCount,
  IProductStatusCount,
} from "../../interfaces/serverInterfaces";
import { request } from "../../server/api";

const requestUrl = "Generic/";

const getEntityCounts = () => {
  return request<IEntityCount>({
    requestUrl: requestUrl + "entityCount",
    apiType: "get",
  });
};
const getProductStatusCounts = () => {
  return request<IProductStatusCount>({
    requestUrl: requestUrl + "productStatusCount",
    apiType: "get",
  });
};
const getProductLocationCounts = () => {
  return request<IProductLocationCount>({
    requestUrl: requestUrl + "productLocationCount",
    apiType: "get",
  });
};
const getProductCategoryCounts = () => {
  return request<IProductCategoryCount>({
    requestUrl: requestUrl + "productCategoryCount",
    apiType: "get",
  });
};
const getCustomLogs = () => {
  return request<IProductCategoryCount>({
    requestUrl: "CustomLog/",
    apiType: "get",
  });
};

export const productRequests = {
  getEntityCounts,
  getProductStatusCounts,
  getProductLocationCounts,
  getProductCategoryCounts,
  getCustomLogs,
};
