import {
  IEntityCount,
  IProductStatusCount,
  IProductLocationCount,
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

const GetProductStatusCounts = () => {
  return useQuery<IProductStatusCount[]>(
    productKeys.FETCH_PRODUCT_STATUS_COUNTS,
    productRequests.getProductStatusCounts
  );
};

const GetProductLocationCounts = () => {
  return useQuery<IProductLocationCount[]>(
    productKeys.FETCH_PRODUCT_LOCATION_COUNTS,
    productRequests.getProductLocationCounts
  );
};

const GetProductCategoryCounts = () => {
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
  GetProductStatusCounts,
  GetProductLocationCounts,
  GetProductCategoryCounts,
  GetCustomLogs,
  productKeys,
};
