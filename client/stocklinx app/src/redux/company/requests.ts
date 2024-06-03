import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { ICompany } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Company/";

const getAll = async (): Promise<ICompany[]> => {
  return (await request<ICompany>({ requestUrl: requestUrl, apiType: "get" }))
    .data as ICompany[];
};

const get = async (id: string): Promise<ICompany> => {
  return (
    await request<ICompany>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as ICompany;
};

const create = async (company: ICompany): Promise<ICompany> => {
  return (
    await request<ICompany>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: company,
    })
  ).data as ICompany;
};

const createRange = async (companies: ICompany[]): Promise<ICompany[]> => {
  return (
    await request<ICompany>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: companies,
    })
  ).data as ICompany[];
};

const update = async (company: ICompany): Promise<ICompany> => {
  return (
    await request<ICompany>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: company,
    })
  ).data as ICompany;
};

const remove = (id: string) => {
  return request<ICompany>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<ICompany>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<ICompany[]> => {
  return (
    await request<ICompany>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as ICompany[];
};

export const companyRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
