import {
  IEntityCount,
  IProductStatusCount,
  IProductCompanyCount,
  IProductCategoryCount,
  ICustomLog,
} from "@/interfaces/serverInterfaces";
import { productRequests } from "@requests";
import { useQuery } from "react-query";
import { productKeys } from "./keys";

const GetEntityCounts = () => {
  return useQuery<IEntityCount[]>(
    productKeys.FETCH_PRODUCT_COUNTS,
    productRequests.getEntityCounts
  );
};

const GetStatusCounts = () => {
  return useQuery<IProductStatusCount[]>(
    productKeys.FETCH_PRODUCT_STATUS_COUNTS,
    productRequests.getProductStatusCounts
  );
};

const GetCompanyCounts = () => {
  return useQuery<IProductCompanyCount[]>(
    productKeys.FETCH_PRODUCT_LOCATION_COUNTS,
    productRequests.getProductLocationCounts
  );
};

const GetCategoryCounts = () => {
  return useQuery<IProductCategoryCount[]>(
    productKeys.FETCH_PRODUCT_CATEGORY_COUNTS,
    productRequests.getProductCategoryCounts
  );
};

const GetCustomLogs = () => {
  return useQuery<ICustomLog[]>(
    productKeys.FETCH_CUSTOM_LOGS,
    productRequests.getCustomLogs
  );
};

export default {
  GetEntityCounts,
  GetStatusCounts,
  GetCompanyCounts,
  GetCategoryCounts,
  GetCustomLogs,
  productKeys,
};
