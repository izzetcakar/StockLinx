import { IManufacturer } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "Manufacturer/";

const getAll = () => {
  return baseRequests.getAll<IManufacturer>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IManufacturer>(requestUrl, id);
};

const create = (manufacturer: IManufacturer) => {
  return baseRequests.create<IManufacturer>(requestUrl, manufacturer);
};

const createRange = (manufacturers: IManufacturer[]) => {
  return baseRequests.createRange<IManufacturer>(requestUrl, manufacturers);
};

const update = (manufacturer: IManufacturer) => {
  return baseRequests.update<IManufacturer>(requestUrl, manufacturer);
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

export default {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  lookup,
};
