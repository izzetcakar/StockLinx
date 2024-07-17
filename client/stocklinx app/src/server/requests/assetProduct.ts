import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAssetProduct } from "@/interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "AssetProduct/";

const getAll = () => {
  return baseRequests.getAll<IAssetProduct>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IAssetProduct>(requestUrl, id);
};

const create = (assetProduct: IAssetProduct) => {
  return baseRequests.create<IAssetProduct>(requestUrl, assetProduct);
};

const createRange = (assetProducts: IAssetProduct[]) => {
  return baseRequests.createRange<IAssetProduct>(requestUrl, assetProducts);
};

const update = (assetProduct: IAssetProduct) => {
  return baseRequests.update<IAssetProduct>(requestUrl, assetProduct);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IAssetProduct>(requestUrl, queryFilters);
};

export default {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
