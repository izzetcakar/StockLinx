import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { ISupplier } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Supplier/";

const getAll = async (): Promise<ISupplier[]> => {
  return (await request<ISupplier>({ requestUrl: requestUrl, apiType: "get" }))
    .data as ISupplier[];
};

const get = async (id: string): Promise<ISupplier> => {
  return (
    await request<ISupplier>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as ISupplier;
};

const create = async (consumable: ISupplier): Promise<ISupplier> => {
  return (
    await request<ISupplier>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as ISupplier;
};

const createRange = async (consumables: ISupplier[]): Promise<ISupplier[]> => {
  return (
    await request<ISupplier>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as ISupplier[];
};

const update = async (consumable: ISupplier): Promise<ISupplier> => {
  return (
    await request<ISupplier>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as ISupplier;
};

const remove = (id: string) => {
  return request<ISupplier>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<ISupplier>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<ISupplier[]> => {
  return (
    await request<ISupplier>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as ISupplier[];
};

export const supplierRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
