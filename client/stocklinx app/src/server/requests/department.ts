import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IDepartment } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "Department/";

const getAll = () => {
  return baseRequests.getAll<IDepartment>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IDepartment>(requestUrl, id);
};

const create = (department: IDepartment) => {
  return baseRequests.create<IDepartment>(requestUrl, department);
};

const createRange = (departments: IDepartment[]) => {
  return baseRequests.createRange<IDepartment>(requestUrl, departments);
};

const update = (department: IDepartment) => {
  return baseRequests.update<IDepartment>(requestUrl, department);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IDepartment>(requestUrl, queryFilters);
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
