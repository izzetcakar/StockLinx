import {
  ICustomLog,
  IEntityCount,
  IProductCategoryCount,
  IProductLocationCount,
  IProductStatusCount,
} from "@interfaces/serverInterfaces";
import { request } from "@request";

const requestUrl = "Generic/";

const getEntityCounts = async (): Promise<IEntityCount[]> => {
  return (
    await request<IEntityCount>({
      requestUrl: requestUrl + "entityCount",
      apiType: "get",
    })
  ).data as IEntityCount[];
};

const getProductStatusCounts = async (): Promise<IProductStatusCount[]> => {
  return (
    await request<IProductStatusCount>({
      requestUrl: requestUrl + "productStatusCount",
      apiType: "get",
    })
  ).data as IProductStatusCount[];
};

const getProductLocationCounts = async (): Promise<IProductLocationCount[]> => {
  return (
    await request<IProductLocationCount>({
      requestUrl: requestUrl + "productLocationCount",
      apiType: "get",
    })
  ).data as IProductLocationCount[];
};

const getProductCategoryCounts = async (): Promise<IProductCategoryCount[]> => {
  return (
    await request<IProductCategoryCount>({
      requestUrl: requestUrl + "productCategoryCount",
      apiType: "get",
    })
  ).data as IProductCategoryCount[];
};

const getCustomLogs = async (): Promise<ICustomLog[]> => {
  return (
    await request<ICustomLog>({
      requestUrl: "CustomLog/",
      apiType: "get",
    })
  ).data as ICustomLog[];
};

export const productRequests = {
  getEntityCounts,
  getProductStatusCounts,
  getProductLocationCounts,
  getProductCategoryCounts,
  getCustomLogs,
};
