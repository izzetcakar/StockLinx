import { manufacturerRequests } from "@/server/requests/manufacturer";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

const hooks = baseHooks("MANUFACTURER");

const GetAll = () => {
  return hooks.GetAll(manufacturerRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, manufacturerRequests.get);
};

const Create = () => {
  return hooks.Create(manufacturerRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(manufacturerRequests.createRange);
};

const Update = () => {
  return hooks.Update(manufacturerRequests.update);
};

const Remove = () => {
  return hooks.Remove(manufacturerRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(manufacturerRequests.removeRange);
};

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, manufacturerRequests.filter);
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(manufacturerRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(manufacturerRequests.lookup);
};

export const useManufacturer = {
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
