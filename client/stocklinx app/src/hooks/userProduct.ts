import { userProductRequests } from "@/server/requests/userProduct";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

const hooks = baseHooks("USERPRODUCT");

const GetAll = () => {
  return hooks.GetAll(userProductRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, userProductRequests.get);
};

const Create = () => {
  return hooks.Create(userProductRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(userProductRequests.createRange);
};

const Update = () => {
  return hooks.Update(userProductRequests.update);
};

const Remove = () => {
  return hooks.Remove(userProductRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(userProductRequests.removeRange);
};

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, userProductRequests.filter);
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(userProductRequests.filter);
};

export const useUserProduct = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  ApplyFilters,
};
