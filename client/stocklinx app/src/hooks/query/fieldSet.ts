import { fieldSetRequests } from "@requests";
import { baseHooks } from "./baseHooks";

const hooks = baseHooks("FIELDSET");

const GetAll = () => {
  return hooks.GetAll(fieldSetRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, fieldSetRequests.get);
};

const Create = () => {
  return hooks.Create(fieldSetRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(fieldSetRequests.createRange);
};

const Update = () => {
  return hooks.Update(fieldSetRequests.update);
};

const Remove = () => {
  return hooks.Remove(fieldSetRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(fieldSetRequests.removeRange);
};

const Lookup = () => {
  return hooks.Lookup(fieldSetRequests.lookup);
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
