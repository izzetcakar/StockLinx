import { departmentRequests } from "@/server/requests/department";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

const hooks = baseHooks("DEPARTMENT");

const GetAll = () => {
  return hooks.GetAll(departmentRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, departmentRequests.get);
};

const Create = () => {
  return hooks.Create(departmentRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(departmentRequests.createRange);
};

const Update = () => {
  return hooks.Update(departmentRequests.update);
};

const Remove = () => {
  return hooks.Remove(departmentRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(departmentRequests.removeRange);
};

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, departmentRequests.filter);
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(departmentRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(departmentRequests.lookup);
};

export const useDepartment = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  ApplyFilters,
  Lookup,
};
