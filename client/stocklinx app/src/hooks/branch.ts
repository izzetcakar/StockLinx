import { branchRequests } from "@/server/requests/branch";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

const hooks = baseHooks("BRANCH");

const GetAll = () => {
  return hooks.GetAll(branchRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, branchRequests.get);
};

const Create = () => {
  return hooks.Create(branchRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(branchRequests.createRange);
};

const Update = () => {
  return hooks.Update(branchRequests.update);
};

const Remove = () => {
  return hooks.Remove(branchRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(branchRequests.removeRange);
};

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, branchRequests.filter);
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(branchRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(branchRequests.lookup);
};

export const useBranch = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  Lookup,
  ApplyFilters,
};
