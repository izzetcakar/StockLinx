import { modelRequests } from "@requests";
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

const Lookup = () => {
  return hooks.Lookup(modelRequests.lookup);
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
