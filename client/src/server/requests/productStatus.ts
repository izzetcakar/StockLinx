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
  return baseRequests.createRange<IProductStatus>(requestUrl, productStatuss);
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

const lookup = () => {
  return baseRequests.lookup(requestUrl);
};

const getDtos = async (ids: string[]) => {
  return baseRequests.getDtos(requestUrl, ids);
};

export default {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  lookup,
  getDtos,
};
