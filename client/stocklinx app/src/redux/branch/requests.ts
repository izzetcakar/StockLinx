import { IBranch } from "../../interfaces/serverInterfaces";
import { request } from "../../server/api";
const requestUrl = "Branch/";

const getAll = () => {
  return request<IBranch>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IBranch>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (branch: IBranch) => {
  return request<IBranch>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: branch,
  });
};
const createRange = (branches: IBranch[]) => {
  return request<IBranch>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: branches,
  });
};
const update = (branch: IBranch) => {
  return request<IBranch>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: branch,
  });
};
const remove = (id: string) => {
  return request<IBranch>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<IBranch>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const branchRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
