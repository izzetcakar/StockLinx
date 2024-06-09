import {
  IEntityCount,
  IProductStatusCount,
  IProductLocationCount,
  IProductCategoryCount,
  ICustomLog,
} from "@/interfaces/serverInterfaces";
import { productRequests } from "@/server/requests/product";
import { useQuery } from "react-query";

enum queryKeys {
  FETCH_PRODUCT_COUNTS = "FETCH_PRODUCT_COUNTS",
  FETCH_PRODUCT_STATUS_COUNTS = "FETCH_PRODUCT_STATUS_COUNTS",
  FETCH_PRODUCT_LOCATION_COUNTS = "FETCH_PRODUCT_LOCATION_COUNTS",
  FETCH_PRODUCT_CATEGORY_COUNTS = "FETCH_PRODUCT_CATEGORY_COUNTS",
  FETCH_CUSTOM_LOGS = "FETCH_CUSTOM_LOGS",
}

const GetEntityCounts = () => {
  return useQuery<IEntityCount[]>(
    queryKeys.FETCH_PRODUCT_COUNTS,
    productRequests.getEntityCounts
  );
};

const GetProductStatusCounts = () => {
  return useQuery<IProductStatusCount[]>(
    queryKeys.FETCH_PRODUCT_STATUS_COUNTS,
    productRequests.getProductStatusCounts
  );
};

const GetProductLocationCounts = () => {
  return useQuery<IProductLocationCount[]>(
    queryKeys.FETCH_PRODUCT_LOCATION_COUNTS,
    productRequests.getProductLocationCounts
  );
};

const GetProductCategoryCounts = () => {
  return useQuery<IProductCategoryCount[]>(
    queryKeys.FETCH_PRODUCT_CATEGORY_COUNTS,
    productRequests.getProductCategoryCounts
  );
};

const GetCustomLogs = () => {
  return useQuery<ICustomLog[]>(
    queryKeys.FETCH_CUSTOM_LOGS,
    productRequests.getCustomLogs
  );
};

export const useProduct = {
  GetEntityCounts,
  GetProductStatusCounts,
  GetProductLocationCounts,
  GetProductCategoryCounts,
  GetCustomLogs,
  queryKeys,
};
