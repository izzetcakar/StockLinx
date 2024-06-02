import { ICustomField } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "CustomField/";

const getAll = () => {
  return request<ICustomField>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<ICustomField>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (customField: ICustomField) => {
  return request<ICustomField>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: customField,
  });
};
const createRange = (customFields: ICustomField[]) => {
  return request<ICustomField>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: customFields,
  });
};
const update = (customField: ICustomField) => {
  return request<ICustomField>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: customField,
  });
};
const remove = (id: string) => {
  return request<ICustomField>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<ICustomField>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const customFieldRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
