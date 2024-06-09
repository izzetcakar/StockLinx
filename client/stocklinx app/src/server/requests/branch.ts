import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { baseRequests } from "@/utils/requestUtils";
import { IBranch } from "@/interfaces/serverInterfaces";

const requestUrl = "Branch/";

const getAll = () => {
  return baseRequests.getAll<IBranch>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IBranch>(requestUrl, id);
};

const create = (branch: IBranch) => {
  return baseRequests.create<IBranch>(requestUrl, branch);
};

const createRange = (branches: IBranch[]) => {
  return baseRequests.createRange<IBranch>(requestUrl, branches);
};

const update = (branch: IBranch) => {
  return baseRequests.update<IBranch>(requestUrl, branch);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IBranch>(requestUrl, queryFilters);
};

const lookup = () => {
  return baseRequests.lookup(requestUrl);
};

export const branchRequests = {
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
