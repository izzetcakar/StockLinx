import { supplierRequests } from "@/server/requests/supplier";
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

const Filter = () => {
  return hooks.Filter(supplierRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(supplierRequests.lookup);
};
export const useSupplier = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  Lookup,
};
