import { modelRequests } from "@/server/requests/model";
import { baseHooks } from "./baseHooks";

const hooks = baseHooks("MODEL");

const GetAll = () => {
  return hooks.GetAll(modelRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, modelRequests.get);
};

const Create = () => {
  return hooks.Create(modelRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(modelRequests.createRange);
};

const Update = () => {
  return hooks.Update(modelRequests.update);
};

const Remove = () => {
  return hooks.Remove(modelRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(modelRequests.removeRange);
};

const Filter = () => {
  return hooks.Filter();
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(modelRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(modelRequests.lookup);
};

export const useModel = {
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
