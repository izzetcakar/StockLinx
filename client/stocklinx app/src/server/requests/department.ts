import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IDepartment } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Department/";

const getAll = async (): Promise<IDepartment[]> => {
  return (
    await request<IDepartment>({ requestUrl: requestUrl, apiType: "get" })
  ).data as IDepartment[];
};

const get = async (id: string): Promise<IDepartment> => {
  return (
    await request<IDepartment>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IDepartment;
};

const create = async (consumable: IDepartment): Promise<IDepartment> => {
  return (
    await request<IDepartment>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as IDepartment;
};

const createRange = async (
  consumables: IDepartment[]
): Promise<IDepartment[]> => {
  return (
    await request<IDepartment>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as IDepartment[];
};

const update = async (consumable: IDepartment): Promise<IDepartment> => {
  return (
    await request<IDepartment>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as IDepartment;
};

const remove = (id: string) => {
  return request<IDepartment>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IDepartment>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<IDepartment[]> => {
  return (
    await request<IDepartment>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IDepartment[];
};

export const departmentRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
