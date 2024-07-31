import {
  ICustomLog,
  IEntityCount,
  IProductCategoryCount,
  IProductCompanyCount,
  IProductStatusCount,
} from "@interfaces/serverInterfaces";
import { request } from "@request";

const requestUrl = "Generic/";

const getEntityCounts = async (): Promise<IEntityCount[]> => {
  return (
    await request<IEntityCount>({
      requestUrl: requestUrl + "entitycount",
      apiType: "get",
    })
  ).data as IEntityCount[];
};

const getProductStatusCounts = async (): Promise<IProductStatusCount[]> => {
  return (
    await request<IProductStatusCount>({
      requestUrl: requestUrl + "product/statuscount",
      apiType: "get",
    })
  ).data as IProductStatusCount[];
};

const getProductLocationCounts = async (): Promise<IProductCompanyCount[]> => {
  return (
    await request<IProductCompanyCount>({
      requestUrl: requestUrl + "product/companycount",
      apiType: "get",
    })
  ).data as IProductCompanyCount[];
};

const getProductCategoryCounts = async (): Promise<IProductCategoryCount[]> => {
  return (
    await request<IProductCategoryCount>({
      requestUrl: requestUrl + "product/categorycount",
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

export default {
  getEntityCounts,
  getProductStatusCounts,
  getProductLocationCounts,
  getProductCategoryCounts,
  getCustomLogs,
};
