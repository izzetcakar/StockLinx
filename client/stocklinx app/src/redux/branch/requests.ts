import { IBranch } from "../../interfaces/interfaces";
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

export const branchRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
