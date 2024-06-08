import { IFieldSetCustomField } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "FieldSetCustomField/";

const getAll = async (): Promise<IFieldSetCustomField[]> => {
  return (
    await request<IFieldSetCustomField>({
      requestUrl: requestUrl,
      apiType: "get",
    })
  ).data as IFieldSetCustomField[];
};

const get = async (id: string): Promise<IFieldSetCustomField> => {
  return (
    await request<IFieldSetCustomField>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IFieldSetCustomField;
};

const create = async (
  consumable: IFieldSetCustomField
): Promise<IFieldSetCustomField> => {
  return (
    await request<IFieldSetCustomField>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as IFieldSetCustomField;
};

const createRange = async (
  consumables: IFieldSetCustomField[]
): Promise<IFieldSetCustomField[]> => {
  return (
    await request<IFieldSetCustomField>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as IFieldSetCustomField[];
};

const update = async (
  consumable: IFieldSetCustomField
): Promise<IFieldSetCustomField> => {
  return (
    await request<IFieldSetCustomField>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as IFieldSetCustomField;
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
