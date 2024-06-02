import { IFieldSetCustomField } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "FieldSetCustomField/";

const getAll = () => {
  return request<IFieldSetCustomField>({
    requestUrl: requestUrl,
    apiType: "get",
  });
};
const get = (id: string) => {
  return request<IFieldSetCustomField>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (fieldSetCustomField: IFieldSetCustomField) => {
  return request<IFieldSetCustomField>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: fieldSetCustomField,
  });
};
const createRange = (fieldSetCustomFields: IFieldSetCustomField[]) => {
  return request<IFieldSetCustomField>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: fieldSetCustomFields,
  });
};
const update = (fieldSetCustomField: IFieldSetCustomField) => {
  return request<IFieldSetCustomField>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: fieldSetCustomField,
  });
};
const remove = (id: string) => {
  return request<IFieldSetCustomField>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<IFieldSetCustomField>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};
const synchronize = (fieldSetCustomFields: IFieldSetCustomField[]) => {
  return request<IFieldSetCustomField>({
    requestUrl: requestUrl + "synchronize",
    apiType: "post",
    queryData: fieldSetCustomFields,
  });
};

export const fieldSetCustomFieldRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  synchronize,
};
