import { ISupplier } from "../../interfaces/interfaces";
import { request } from "../../server/api";
const requestUrl = "Supplier/";

const getAll = () => {
  return request<ISupplier>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<ISupplier>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (supplier: ISupplier) => {
  return request<ISupplier>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: supplier,
  });
};
const createRange = (suppliers: ISupplier[]) => {
  return request<ISupplier>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: suppliers,
  });
};
const update = (supplier: ISupplier) => {
  return request<ISupplier>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: supplier,
  });
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

export const supplierRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
