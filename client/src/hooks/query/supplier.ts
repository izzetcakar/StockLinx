import { supplierRequests } from "@requests";
import { baseHooks } from "./baseHooks";

const hooks = baseHooks("SUPPLIER");

const GetAll = () => {
  return hooks.GetAll(supplierRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, supplierRequests.get);
};

const Create = () => {
  return hooks.Create(supplierRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(supplierRequests.createRange);
};

const Update = () => {
  return hooks.Update(supplierRequests.update);
};

const Remove = () => {
  return hooks.Remove(supplierRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(supplierRequests.removeRange);
};

const Lookup = () => {
  return hooks.Lookup(supplierRequests.lookup);
};
export default {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Lookup,
};
