import { productStatusRequests } from "@requests";
import { baseHooks } from "./baseHooks";

const hooks = baseHooks("PRODUCTSTATUS");

const GetAll = () => {
  return hooks.GetAll(productStatusRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, productStatusRequests.get);
};

const Create = () => {
  return hooks.Create(productStatusRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(productStatusRequests.createRange);
};

const Update = () => {
  return hooks.Update(productStatusRequests.update);
};

const Remove = () => {
  return hooks.Remove(productStatusRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(productStatusRequests.removeRange);
};

const Filter = () => {
  return hooks.Filter();
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(productStatusRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(productStatusRequests.lookup);
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
