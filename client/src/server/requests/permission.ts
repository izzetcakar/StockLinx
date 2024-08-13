import { IPermission } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";
const requestUrl = "Permission/";

const getAll = () => {
  return baseRequests.getAll<IPermission>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IPermission>(requestUrl, id);
};

const create = (permission: IPermission) => {
  return baseRequests.create<IPermission>(requestUrl, permission);
};

const createRange = (permissions: IPermission[]) => {
  return baseRequests.createRange<IPermission>(requestUrl, permissions);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const getDtos = async (ids: string[]) => {
  return baseRequests.getDtos(requestUrl, ids);
};

export default {
  getAll,
  get,
  create,
  createRange,
  remove,
  removeRange,
  getDtos,
};
