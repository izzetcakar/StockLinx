import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IUserProduct } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "UserProduct/";

const getAll = async (): Promise<IUserProduct[]> => {
  return (
    await request<IUserProduct>({ requestUrl: requestUrl, apiType: "get" })
  ).data as IUserProduct[];
};

const get = async (id: string): Promise<IUserProduct> => {
  return (
    await request<IUserProduct>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IUserProduct;
};

const create = async (consumable: IUserProduct): Promise<IUserProduct> => {
  return (
    await request<IUserProduct>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as IUserProduct;
};

const createRange = async (
  consumables: IUserProduct[]
): Promise<IUserProduct[]> => {
  return (
    await request<IUserProduct>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as IUserProduct[];
};

const update = async (consumable: IUserProduct): Promise<IUserProduct> => {
  return (
    await request<IUserProduct>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as IUserProduct;
};

const remove = (id: string) => {
  return request<IUserProduct>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IUserProduct>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<IUserProduct[]> => {
  return (
    await request<IUserProduct>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IUserProduct[];
};

export const userProductRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
