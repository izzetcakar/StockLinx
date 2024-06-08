import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IPermission } from "@interfaces/serverInterfaces";
import { request } from "@request";
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

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IPermission>(requestUrl, queryFilters);
};

const sync = async (permissions: IPermission[]): Promise<IPermission[]> => {
  return (
    await request<IPermission>({
      requestUrl: requestUrl + "sync",
      apiType: "post",
      queryData: permissions,
    })
  ).data as IPermission[];
};

export const permissionRequests = {
  getAll,
  get,
  create,
  createRange,
  remove,
  removeRange,
  sync,
  filter,
};
