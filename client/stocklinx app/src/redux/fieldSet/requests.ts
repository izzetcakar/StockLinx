import { IFieldSet } from "../../interfaces/interfaces";
import { request } from "../../server/api";
const requestUrl = "FieldSet/";

const getAll = () => {
  return request<IFieldSet>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IFieldSet>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (fieldSet: IFieldSet) => {
  return request<IFieldSet>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: fieldSet,
  });
};
const createRange = (fieldSets: IFieldSet[]) => {
  return request<IFieldSet>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: fieldSets,
  });
};
const update = (fieldSet: IFieldSet) => {
  return request<IFieldSet>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: fieldSet,
  });
};
const remove = (id: string) => {
  return request<IFieldSet>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<IFieldSet>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const fieldSetRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
