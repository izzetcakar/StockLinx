import { ILocation } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";
const requestUrl = "Location/";

const getAll = () => {
  return baseRequests.getAll<ILocation>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<ILocation>(requestUrl, id);
};

const create = (location: ILocation) => {
  return baseRequests.create<ILocation>(requestUrl, location);
};

const createRange = (locations: ILocation[]) => {
  return baseRequests.createRange<ILocation>(requestUrl, locations);
};

const update = (location: ILocation) => {
  return baseRequests.update<ILocation>(requestUrl, location);
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
