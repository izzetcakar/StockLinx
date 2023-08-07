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

export const supplierRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
