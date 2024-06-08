import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { ICategory } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "Category/";

const getAll = () => {
  return baseRequests.getAll<ICategory>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<ICategory>(requestUrl, id);
};

const create = (category: ICategory) => {
  return baseRequests.create<ICategory>(requestUrl, category);
};

const createRange = (categories: ICategory[]) => {
  return baseRequests.createRange<ICategory>(requestUrl, categories);
};

const update = (category: ICategory) => {
  return baseRequests.update<ICategory>(requestUrl, category);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<ICategory>(requestUrl, queryFilters);
};

export const categoryRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
