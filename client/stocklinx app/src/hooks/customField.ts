import { customFieldRequests } from "@/server/requests/customField";
import { baseHooks } from "./baseHooks";

const hooks = baseHooks("CUSTOMFIELD");

const GetAll = () => {
  return hooks.GetAll(customFieldRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, customFieldRequests.get);
};

const Create = () => {
  return hooks.Create(customFieldRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(customFieldRequests.createRange);
};

const Update = () => {
  return hooks.Update(customFieldRequests.update);
};

const Remove = () => {
  return hooks.Remove(customFieldRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(customFieldRequests.removeRange);
};

const Lookup = () => {
  return hooks.Lookup(customFieldRequests.lookup);
};

export const useCustomField = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Lookup,
};
