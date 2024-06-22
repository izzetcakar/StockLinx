import { locationRequests } from "@/server/requests/location";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

const hooks = baseHooks("LOCATION");

const GetAll = () => {
  return hooks.GetAll(locationRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, locationRequests.get);
};

const Create = () => {
  return hooks.Create(locationRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(locationRequests.createRange);
};

const Update = () => {
  return hooks.Update(locationRequests.update);
};

const Remove = () => {
  return hooks.Remove(locationRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(locationRequests.removeRange);
};

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, locationRequests.filter);
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(locationRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(locationRequests.lookup);
};

export const useLocation = {
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
