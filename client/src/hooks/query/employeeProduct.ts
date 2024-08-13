import { employeeProductRequests } from "@requests";
import { baseHooks } from "./baseHooks";

const hooks = baseHooks("EMPLOYEEPRODUCT");

const GetAll = () => {
  return hooks.GetAll(employeeProductRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, employeeProductRequests.get);
};

const Create = () => {
  return hooks.Create(employeeProductRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(employeeProductRequests.createRange);
};

const Update = () => {
  return hooks.Update(employeeProductRequests.update);
};

const Remove = () => {
  return hooks.Remove(employeeProductRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(employeeProductRequests.removeRange);
};

export default {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
};
