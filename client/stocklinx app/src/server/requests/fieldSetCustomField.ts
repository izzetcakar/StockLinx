import { IFieldSetCustomField } from "@interfaces/serverInterfaces";
import { request } from "@request";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "FieldSetCustomField/";

const getAll = () => {
  return baseRequests.getAll<IFieldSetCustomField>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IFieldSetCustomField>(requestUrl, id);
};

const create = (fieldSetCustomField: IFieldSetCustomField) => {
  return baseRequests.create<IFieldSetCustomField>(
    requestUrl,
    fieldSetCustomField
  );
};

const createRange = (fieldSetCustomFields: IFieldSetCustomField[]) => {
  return baseRequests.createRange<IFieldSetCustomField>(
    requestUrl,
    fieldSetCustomFields
  );
};

const update = (fieldSetCustomField: IFieldSetCustomField) => {
  return baseRequests.update<IFieldSetCustomField>(
    requestUrl,
    fieldSetCustomField
  );
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
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
