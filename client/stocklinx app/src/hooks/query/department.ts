import { departmentRequests } from "@requests";
import { baseHooks } from "./baseHooks";

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

const Filter = () => {
  return hooks.Filter();
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(departmentRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(departmentRequests.lookup);
};

export default {
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
