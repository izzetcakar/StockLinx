import { ICustomField } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "CustomField/";

const getAll = async (): Promise<ICustomField[]> => {
  return (
    await request<ICustomField>({ requestUrl: requestUrl, apiType: "get" })
  ).data as ICustomField[];
};

const get = async (id: string): Promise<ICustomField> => {
  return (
    await request<ICustomField>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as ICustomField;
};

const create = async (customField: ICustomField): Promise<ICustomField> => {
  return (
    await request<ICustomField>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: customField,
    })
  ).data as ICustomField;
};

const createRange = async (
  customFields: ICustomField[]
): Promise<ICustomField[]> => {
  return (
    await request<ICustomField>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: customFields,
    })
  ).data as ICustomField[];
};

const update = async (customField: ICustomField): Promise<ICustomField> => {
  return (
    await request<ICustomField>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: customField,
    })
  ).data as ICustomField;
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
