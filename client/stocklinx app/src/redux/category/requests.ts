import { ICategory } from "../../interfaces/interfaces";
import { request } from "../../server/api";
const requestUrl = "Category/";

const getAll = () => {
  return request<ICategory>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<ICategory>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (category: ICategory) => {
  return request<ICategory>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: category,
  });
};
const createRange = (categories: ICategory[]) => {
  return request<ICategory>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: categories,
  });
};
const update = (category: ICategory) => {
  return request<ICategory>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: category,
  });
};
const remove = (id: string) => {
  return request<ICategory>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<ICategory>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const categoryRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
