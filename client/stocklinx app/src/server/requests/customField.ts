import { ICustomField } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "CustomField/";

const getAll = () => {
  return baseRequests.getAll<ICustomField>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<ICustomField>(requestUrl, id);
};

const create = (customField: ICustomField) => {
  return baseRequests.create<ICustomField>(requestUrl, customField);
};

const createRange = (customFields: ICustomField[]) => {
  return baseRequests.createRange<ICustomField>(requestUrl, customFields);
};

const update = (customField: ICustomField) => {
  return baseRequests.update<ICustomField>(requestUrl, customField);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const lookup = () => {
  return baseRequests.lookup(requestUrl);
};

export const customFieldRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  lookup,
};
