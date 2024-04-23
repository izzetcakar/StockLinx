import { IPermission } from "../../interfaces/serverInterfaces";
import { request } from "../../server/api";
const requestUrl = "Permission/";

const getAll = () => {
  return request<IPermission>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IPermission>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (permission: IPermission) => {
  return request<IPermission>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: permission,
  });
};
const createRange = (permissions: IPermission[]) => {
  return request<IPermission>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: permissions,
  });
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
const sync = (permissions: IPermission[]) => {
  return request<IPermission>({
    requestUrl: requestUrl + "sync",
    apiType: "post",
    queryData: permissions,
  });
};

export const permissionRequests = {
  getAll,
  get,
  create,
  createRange,
  remove,
  removeRange,
  sync,
};
