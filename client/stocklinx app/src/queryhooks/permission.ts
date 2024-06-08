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

const Get =(id: string) => {
  return useQuery<IPermission>({
    queryKey: [queryKeys.FETCH_PERMISSION, id],
    queryFn: () => permissionRequests.get(id),
  });
};

const Create =(permission: IPermission) => {
  return useMutation<IPermission>({
    mutationKey: queryKeys.CREATE_PERMISSION,
    mutationFn: () => permissionRequests.create(permission),
    onSuccess: () => {
      queryClient.setQueryData<IPermission[]>(
        queryKeys.CREATE_PERMISSION,
        (old) => {
          return old ? [...old, permission] : [permission];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_PERMISSIONS);
      queryClient.invalidateQueries(queryKeys.FETCH_PERMISSION);
    },
  });
};

const CreateRange = (permissions: IPermission[]) => {
  return useMutation<IPermission[]>({
    mutationKey: queryKeys.CREATE_RANGE_PERMISSION,
    mutationFn: () => permissionRequests.createRange(permissions),
    onSuccess: () => {
      queryClient.setQueriesData<IPermission[]>(
        queryKeys.CREATE_RANGE_PERMISSION,
        (old) => {
          return old ? [...old, ...permissions] : permissions;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_PERMISSION);
      queryClient.invalidateQueries(queryKeys.FETCH_PERMISSIONS);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_PERMISSION,
    mutationFn: () => permissionRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IPermission[]>(
        queryKeys.DELETE_PERMISSION,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_PERMISSION);
      queryClient.invalidateQueries(queryKeys.FETCH_PERMISSIONS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_PERMISSION,
    mutationFn: () => permissionRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IPermission[]>(
        queryKeys.DELETE_RANGE_PERMISSION,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_PERMISSION);
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
  return useMutation<IPermission[]>({
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
