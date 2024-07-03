import { permissionRequests } from "@/server/requests/permission";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

const hooks = baseHooks("PERMISSION");

const GetAll = () => {
  return hooks.GetAll(permissionRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, permissionRequests.get);
};

const Create = () => {
  return hooks.Create(permissionRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(permissionRequests.createRange);
};

const Remove = () => {
  return hooks.Remove(permissionRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(permissionRequests.removeRange);
};

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, permissionRequests.filter);
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(permissionRequests.filter);
};

export const usePermission = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Remove,
  RemoveRange,
  Filter,
  ApplyFilters,
};
