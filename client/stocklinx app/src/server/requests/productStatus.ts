import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IProductStatus } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "ProductStatus/";

const getAll = () => {
  return baseRequests.getAll<IProductStatus>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IProductStatus>(requestUrl, id);
};

const create = (productStatus: IProductStatus) => {
  return baseRequests.create<IProductStatus>(requestUrl, productStatus);
};

const createRange = (productStatuss: IProductStatus[]) => {
  return baseRequests.createRange<IProductStatus>(
    requestUrl,
    productStatuss
  );
};

const update = (productStatus: IProductStatus) => {
  return baseRequests.update<IProductStatus>(requestUrl, productStatus);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IProductStatus>(requestUrl, queryFilters);
};

export const productStatusRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
