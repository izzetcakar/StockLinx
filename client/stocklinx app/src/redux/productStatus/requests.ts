import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IProductStatus } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "ProductStatus/";

const getAll = async (): Promise<IProductStatus[]> => {
  return (
    await request<IProductStatus>({ requestUrl: requestUrl, apiType: "get" })
  ).data as IProductStatus[];
};

const get = async (id: string): Promise<IProductStatus> => {
  return (
    await request<IProductStatus>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IProductStatus;
};

const create = async (consumable: IProductStatus): Promise<IProductStatus> => {
  return (
    await request<IProductStatus>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as IProductStatus;
};

const createRange = async (
  consumables: IProductStatus[]
): Promise<IProductStatus[]> => {
  return (
    await request<IProductStatus>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as IProductStatus[];
};

const update = async (consumable: IProductStatus): Promise<IProductStatus> => {
  return (
    await request<IProductStatus>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as IProductStatus;
};

const remove = (id: string) => {
  return request<IProductStatus>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IProductStatus>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = async (
  queryFilters: QueryFilter[]
): Promise<IProductStatus[]> => {
  return (
    await request<IProductStatus>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IProductStatus[];
};

export const productStatusRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
