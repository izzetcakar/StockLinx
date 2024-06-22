import { IPermission } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { permissionRequests } from "@/server/requests/permission";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { permissionKeys } from "./keys";

const hooks = baseHooks("PERMISSION");

const GetAll = () => {
  return hooks.GetAll(permissionRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, permissionRequests.get);
};

const Create = () => {
  return hooks.Create(permissionRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(permissionRequests.createRange);
};

const Remove = () => {
  return hooks.Remove(permissionRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(permissionRequests.removeRange);
};

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, permissionRequests.filter);
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(permissionRequests.filter);
};

const Sync = () => {
  return useMutation({
    mutationKey: permissionKeys.SYNC_PERMISSIONS,
    mutationFn: (permissions: IPermission[]) =>
      permissionRequests.sync(permissions),
    onSuccess: (data: IPermission[]) => {
      queryClient.setQueryData<IPermission[]>(
        permissionKeys.SYNC_PERMISSIONS,
        data
      );
      queryClient.invalidateQueries("FETCH_ALL_PERMISSION");
    },
  });
};

export const usePermission = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Remove,
  RemoveRange,
  Filter,
  ApplyFilters,
  Sync,
};
