import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IPermission } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Permission/";

const getAll = async (): Promise<IPermission[]> => {
  return (
    await request<IPermission>({ requestUrl: requestUrl, apiType: "get" })
  ).data as IPermission[];
};

const get = async (id: string): Promise<IPermission> => {
  return (
    await request<IPermission>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IPermission;
};

const create = async (consumable: IPermission): Promise<IPermission> => {
  return (
    await request<IPermission>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as IPermission;
};

const createRange = async (
  consumables: IPermission[]
): Promise<IPermission[]> => {
  return (
    await request<IPermission>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as IPermission[];
};

const remove = (id: string) => {
  return request<IPermission>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IPermission>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<IPermission[]> => {
  return (
    await request<IPermission>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IPermission[];
};

const sync = async (permissions: IPermission[]): Promise<IPermission[]> => {
  return (
    await request<IPermission>({
      requestUrl: requestUrl + "sync",
      apiType: "post",
      queryData: permissions,
    })
  ).data as IPermission[];
};

export const permissionRequests = {
  getAll,
  get,
  create,
  createRange,
  remove,
  removeRange,
  sync,
  filter,
};
