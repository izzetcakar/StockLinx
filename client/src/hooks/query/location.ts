import { locationRequests } from "@requests";
import { baseHooks } from "./baseHooks";

const hooks = baseHooks("LOCATION");

const GetAll = () => {
  return hooks.GetAll(locationRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, locationRequests.get);
};

const Create = () => {
  return hooks.Create(locationRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(locationRequests.createRange);
};

const Update = () => {
  return hooks.Update(locationRequests.update);
};

const Remove = () => {
  return hooks.Remove(locationRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(locationRequests.removeRange);
};

const Lookup = () => {
  return hooks.Lookup(locationRequests.lookup);
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
