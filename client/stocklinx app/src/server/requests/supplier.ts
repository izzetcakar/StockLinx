import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { ISupplier } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "Supplier/";

const getAll = () => {
  return baseRequests.getAll<ISupplier>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<ISupplier>(requestUrl, id);
};

const create = (supplier: ISupplier) => {
  return baseRequests.create<ISupplier>(requestUrl, supplier);
};

const createRange = (suppliers: ISupplier[]) => {
  return baseRequests.createRange<ISupplier>(requestUrl, suppliers);
};

const update = (supplier: ISupplier) => {
  return baseRequests.update<ISupplier>(requestUrl, supplier);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<ISupplier>(requestUrl, queryFilters);
};

export const supplierRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
