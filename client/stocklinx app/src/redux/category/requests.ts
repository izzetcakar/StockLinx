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

export const categoryRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
