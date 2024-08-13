import { manufacturerRequests } from "@requests";
import { baseHooks } from "./baseHooks";

const hooks = baseHooks("MANUFACTURER");

const GetAll = () => {
  return hooks.GetAll(manufacturerRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, manufacturerRequests.get);
};

const Create = () => {
  return hooks.Create(manufacturerRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(manufacturerRequests.createRange);
};

const Update = () => {
  return hooks.Update(manufacturerRequests.update);
};

const Remove = () => {
  return hooks.Remove(manufacturerRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(manufacturerRequests.removeRange);
};

const Lookup = () => {
  return hooks.Lookup(manufacturerRequests.lookup);
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
