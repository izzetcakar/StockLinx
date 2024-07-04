import { categoryRequests } from "@/server/requests/category";
import { baseHooks } from "./baseHooks";

const hooks = baseHooks("CATEGORY");

const GetAll = () => {
  return hooks.GetAll(categoryRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, categoryRequests.get);
};

const Create = () => {
  return hooks.Create(categoryRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(categoryRequests.createRange);
};

const Update = () => {
  return hooks.Update(categoryRequests.update);
};

const Remove = () => {
  return hooks.Remove(categoryRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(categoryRequests.removeRange);
};

const Filter = () => {
  return hooks.Filter();
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(categoryRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(categoryRequests.lookup);
};

export const useCategory = {
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
