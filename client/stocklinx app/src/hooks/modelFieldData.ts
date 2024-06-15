import { modelFieldDataRequests } from "@/server/requests/modelFieldData";
import { baseHooks } from "./baseHooks";

const hooks = baseHooks("MODELFIELDDATA");

const GetAll = () => {
  return hooks.GetAll(modelFieldDataRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, modelFieldDataRequests.get);
};

const Create = () => {
  return hooks.Create(modelFieldDataRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(modelFieldDataRequests.createRange);
};

const Update = () => {
  return hooks.Update(modelFieldDataRequests.update);
};

const Remove = () => {
  return hooks.Remove(modelFieldDataRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(modelFieldDataRequests.removeRange);
};

export const useModelFieldData = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
};
