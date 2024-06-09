import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IPermission } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { permissionRequests } from "@/server/requests/permission";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
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
    queryKeys.FETCH_PERMISSIONS,
    permissionRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IPermission>({
    queryKey: [queryKeys.FETCH_PERMISSION, id],
    queryFn: () => permissionRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_PERMISSION,
    mutationFn: (permission: IPermission) =>
      permissionRequests.create(permission),
    onSuccess: (permission) => {
      queryClient.invalidateQueries(queryKeys.FETCH_PERMISSION);
      queryClient.setQueryData<IPermission[]>(
        queryKeys.FETCH_PERMISSIONS,
        (old) => {
          return old ? [...old, permission] : [permission];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_PERMISSION,
    mutationFn: (permissions: IPermission[]) =>
      permissionRequests.createRange(permissions),
    onSuccess: (permissions) => {
      queryClient.setQueryData<IPermission[]>(
        queryKeys.FETCH_PERMISSIONS,
        (old) => {
          return old ? [...old, ...permissions] : permissions;
        }
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_PERMISSION,
    mutationFn: (id: string) => permissionRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_PERMISSIONS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_PERMISSION,
    mutationFn: (ids: string[]) => permissionRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_PERMISSIONS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_PERMISSIONS,
    mutationFn: (filters: QueryFilter[]) => permissionRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IPermission[]>(
        queryKeys.FILTER_PERMISSIONS,
        data
      );
    },
  });
};

const Sync = () => {
  return useMutation({
    mutationKey: queryKeys.SYNC_PERMISSIONS,
    mutationFn: (permissions: IPermission[]) =>
      permissionRequests.sync(permissions),
    onSuccess: (data: IPermission[]) => {
      queryClient.setQueryData<IPermission[]>(queryKeys.SYNC_PERMISSIONS, data);
      queryClient.invalidateQueries(queryKeys.SYNC_PERMISSIONS);
      queryClient.invalidateQueries(queryKeys.FETCH_PERMISSIONS);
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
