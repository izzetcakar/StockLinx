import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IModel } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "Model/";

const getAll = () => {
  return baseRequests.getAll<IModel>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IModel>(requestUrl, id);
};

const create = (model: IModel) => {
  return baseRequests.create<IModel>(requestUrl, model);
};

const createRange = (models: IModel[]) => {
  return baseRequests.createRange<IModel>(requestUrl, models);
};

const update = (model: IModel) => {
  return baseRequests.update<IModel>(requestUrl, model);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IModel>(requestUrl, queryFilters);
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
  filter,
  lookup,
};
