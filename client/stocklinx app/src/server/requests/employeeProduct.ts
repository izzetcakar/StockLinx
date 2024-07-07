import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IEmployeeProduct } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "EmployeeProduct/";

const getAll = () => {
  return baseRequests.getAll<IEmployeeProduct>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IEmployeeProduct>(requestUrl, id);
};

const create = (employeeProduct: IEmployeeProduct) => {
  return baseRequests.create<IEmployeeProduct>(requestUrl, employeeProduct);
};

const createRange = (employeeProducts: IEmployeeProduct[]) => {
  return baseRequests.createRange<IEmployeeProduct>(requestUrl, employeeProducts);
};

const update = (employeeProduct: IEmployeeProduct) => {
  return baseRequests.update<IEmployeeProduct>(requestUrl, employeeProduct);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IEmployeeProduct>(requestUrl, queryFilters);
};

export const employeeProductRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
