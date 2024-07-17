import { IFieldSet } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "FieldSet/";

const getAll = () => {
  return baseRequests.getAll<IFieldSet>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IFieldSet>(requestUrl, id);
};

const create = (fieldSet: IFieldSet) => {
  return baseRequests.create<IFieldSet>(requestUrl, fieldSet);
};

const createRange = (fieldSets: IFieldSet[]) => {
  return baseRequests.createRange<IFieldSet>(requestUrl, fieldSets);
};

const update = (fieldSet: IFieldSet) => {
  return baseRequests.update<IFieldSet>(requestUrl, fieldSet);
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

export default {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  lookup,
};
