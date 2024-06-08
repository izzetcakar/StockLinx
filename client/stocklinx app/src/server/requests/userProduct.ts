import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IUserProduct } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "UserProduct/";

const getAll = () => {
  return baseRequests.getAll<IUserProduct>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IUserProduct>(requestUrl, id);
};

const create = (userProduct: IUserProduct) => {
  return baseRequests.create<IUserProduct>(requestUrl, userProduct);
};

const createRange = (userProducts: IUserProduct[]) => {
  return baseRequests.createRange<IUserProduct>(requestUrl, userProducts);
};

const update = (userProduct: IUserProduct) => {
  return baseRequests.update<IUserProduct>(requestUrl, userProduct);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IUserProduct>(requestUrl, queryFilters);
};

export const userProductRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
