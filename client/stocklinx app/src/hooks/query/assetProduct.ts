import { assetProductRequests } from "@/server/requests/assetProduct";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

const hooks = baseHooks("ASSETPRODUCT");

const GetAll = () => {
  return hooks.GetAll(assetProductRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, assetProductRequests.get);
};

const Create = () => {
  return hooks.Create(assetProductRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(assetProductRequests.createRange);
};

const Update = () => {
  return hooks.Update(assetProductRequests.update);
};

const Remove = () => {
  return hooks.Remove(assetProductRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(assetProductRequests.removeRange);
};

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, assetProductRequests.filter);
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(assetProductRequests.filter);
};

export const useAssetProduct = {
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
