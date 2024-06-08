import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAssetProduct } from "@/interfaces/serverInterfaces";
import { request } from "@/server/api";
import { getQueryFilter } from "@/utils/filterUtilts";
const requestUrl = "AssetProduct/";

const getAll = async (): Promise<IAssetProduct[]> => {
  return (
    await request<IAssetProduct>({ requestUrl: requestUrl, apiType: "get" })
  ).data as IAssetProduct[];
};

const get = async (id: string): Promise<IAssetProduct> => {
  return (
    await request<IAssetProduct>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IAssetProduct;
};

const create = async (assetProduct: IAssetProduct): Promise<IAssetProduct> => {
  return (
    await request<IAssetProduct>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: assetProduct,
    })
  ).data as IAssetProduct;
};

const createRange = (assetProducts: IAssetProduct[]) => {
  return request<IAssetProduct>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: assetProducts,
  });
};

const update = async (assetProduct: IAssetProduct): Promise<IAssetProduct> => {
  return (
    await request<IAssetProduct>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: assetProduct,
    })
  ).data as IAssetProduct;
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

const filter = async (
  queryFilters: QueryFilter[]
): Promise<IAssetProduct[]> => {
  return (
    await request<IAssetProduct>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IAssetProduct[];
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
