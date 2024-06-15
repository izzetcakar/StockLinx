import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IPermission } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { permissionRequests } from "@/server/requests/permission";
import { useMutation, useQuery } from "react-query";

export enum permissionKeys {
  FETCH_PERMISSIONS = "FETCH_PERMISSIONS",
  FETCH_PERMISSION = "FETCH_PERMISSION",
  CREATE_PERMISSION = "CREATE_PERMISSION",
  UPDATE_PERMISSION = "UPDATE_PERMISSION",
  DELETE_PERMISSION = "DELETE_PERMISSION",
  CREATE_RANGE_PERMISSION = "CREATE_RANGE_PERMISSION",
  DELETE_RANGE_PERMISSION = "DELETE_RANGE_PERMISSION",
  CHECK_IN_PERMISSION = "CHECK_IN_PERMISSION",
  CHECK_OUT_PERMISSION = "CHECK_OUT_PERMISSION",
  FILTER_PERMISSIONS = "FILTER_PERMISSIONS",
  SYNC_PERMISSIONS = "SYNC_PERMISSIONS",
}

const GetAll = () => {
  return useQuery<IPermission[]>(
    permissionKeys.FETCH_PERMISSIONS,
    permissionRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IPermission>({
    queryKey: [permissionKeys.FETCH_PERMISSION, id],
    queryFn: () => permissionRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: permissionKeys.CREATE_PERMISSION,
    mutationFn: (permission: IPermission) =>
      permissionRequests.create(permission),
    onSuccess: (permission) => {
      queryClient.setQueryData<IPermission[]>(
        permissionKeys.FETCH_PERMISSIONS,
        (old) => {
          return old ? [...old, permission] : [permission];
        }
      );
      queryClient.invalidateQueries(permissionKeys.FILTER_PERMISSIONS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: permissionKeys.CREATE_RANGE_PERMISSION,
    mutationFn: (permissions: IPermission[]) =>
      permissionRequests.createRange(permissions),
    onSuccess: (permissions) => {
      queryClient.setQueryData<IPermission[]>(
        permissionKeys.FETCH_PERMISSIONS,
        (old) => {
          return old ? [...old, ...permissions] : permissions;
        }
      );
      queryClient.invalidateQueries(permissionKeys.FILTER_PERMISSIONS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: permissionKeys.DELETE_PERMISSION,
    mutationFn: (id: string) => permissionRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(permissionKeys.FETCH_PERMISSIONS);
      queryClient.invalidateQueries(permissionKeys.FILTER_PERMISSIONS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: permissionKeys.DELETE_RANGE_PERMISSION,
    mutationFn: (ids: string[]) => permissionRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(permissionKeys.FETCH_PERMISSIONS);
      queryClient.invalidateQueries(permissionKeys.FILTER_PERMISSIONS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: permissionKeys.FILTER_PERMISSIONS,
    mutationFn: (filters: QueryFilter[]) => permissionRequests.filter(filters),
    onSuccess(data: IPermission[]) {
      queryClient.setQueryData<IPermission[]>(
        permissionKeys.FILTER_PERMISSIONS,
        data
      );
    },
  });
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
      queryClient.invalidateQueries(permissionKeys.SYNC_PERMISSIONS);
      queryClient.invalidateQueries(permissionKeys.FETCH_PERMISSIONS);
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
  Sync,
};
