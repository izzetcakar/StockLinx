import { companyRequests } from "@/server/requests/company";
import { baseHooks } from "./baseHooks";

const hooks = baseHooks("COMPANY");

const GetAll = () => {
  return hooks.GetAll(companyRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, companyRequests.get);
};

const Create = () => {
  return hooks.Create(companyRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(companyRequests.createRange);
};

const Update = () => {
  return hooks.Update(companyRequests.update);
};

const Remove = () => {
  return hooks.Remove(companyRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(companyRequests.removeRange);
};

const Filter = () => {
  return hooks.Filter(companyRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(companyRequests.lookup);
};

export const useCompany = {
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
