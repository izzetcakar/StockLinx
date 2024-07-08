import { LookupData, QueryFilter } from "@/interfaces/gridTableInterfaces";
import { queryClient } from "@/main";
import {
  closeNotification,
  openNotificationLoading,
  openNotificationSuccess,
} from "@/utils/notificationUtils";
import { closeModal } from "@mantine/modals";
import { useMutation, useQuery } from "react-query";

export const baseHooks = (entity: string) => {
  const lowerCaseEntity = entity.toLowerCase();

  const mutateSettle = (entity: string) => {
    closeNotification("notification-loading");
    closeModal(entity + "-modal");
  };

  const GetAll = (request: () => Promise<any[]>) => {
    return useQuery({
      queryKey: "FETCH_ALL_" + entity,
      queryFn: request,
      initialData: null,
    });
  };

  const Get = (id: string, request: (id: string) => Promise<any>) => {
    return useQuery({
      queryKey: ["FETCH_" + entity, id],
      queryFn: () => request(id),
      initialData: [],
    });
  };

  const Create = (request: (dto: any) => Promise<any>) => {
    return useMutation({
      mutationKey: "CREATE_" + entity,
      mutationFn: (dto: any) => request(dto),
      onMutate: () => {
        openNotificationLoading("Creating " + lowerCaseEntity);
      },
      onSettled: () => {
        mutateSettle(lowerCaseEntity);
      },
      onSuccess: (res) => {
        openNotificationSuccess("Successfully created " + lowerCaseEntity);
        queryClient.setQueryData<any[]>("FETCH_ALL_" + entity, (old) => {
          return old ? [...old, res] : [res];
        });
        queryClient.setQueryData<any[]>("FILTER_" + entity, (old) => {
          return old ? [...old, res] : [res];
        });
        queryClient.invalidateQueries("LOOKUP_" + entity);
      },
    });
  };

  const CreateRange = (request: (dto: any) => Promise<any[]>) => {
    return useMutation({
      mutationKey: "CREATE_RANGE_" + entity,
      mutationFn: (dtos: any[]) => request(dtos),
      onMutate: () => {
        openNotificationLoading("Creating " + lowerCaseEntity + "s");
      },
      onSettled: () => {
        mutateSettle(lowerCaseEntity);
      },
      onSuccess: (res) => {
        openNotificationSuccess("Successfully created " + lowerCaseEntity + " items");
        queryClient.setQueryData<any[]>("FETCH_ALL_" + entity, (old) => {
          return old ? [...old, ...res] : res;
        });
        queryClient.setQueryData<any[]>("FILTER_" + entity, (old) => {
          return old ? [...old, ...res] : res;
        });
        queryClient.invalidateQueries("LOOKUP_" + entity);
      },
    });
  };

  const Update = (request: (dto: any) => Promise<any>) => {
    return useMutation({
      mutationKey: "UPDATE_" + entity,
      mutationFn: (dto: any) => request(dto),
      onMutate: () => {
        openNotificationLoading("Updating " + lowerCaseEntity);
      },
      onSettled: () => {
        mutateSettle(lowerCaseEntity);
      },
      onSuccess: (res) => {
        openNotificationSuccess("Successfully updated " + lowerCaseEntity);
        queryClient.setQueryData<any[]>("FETCH_ALL" + entity, (old) => {
          return old
            ? (old as any[]).map((x) => (x.id === res.id ? res : x))
            : [res];
        });
        queryClient.setQueryData<any[]>("FILTER_" + entity, (old) => {
          return old
            ? (old as any[]).map((x) => (x.id === res.id ? res : x))
            : [res];
        });
        queryClient.setQueryData(["FETCH_" + entity, res.id], res);
        queryClient.invalidateQueries("LOOKUP_" + entity);
      },
    });
  };

  const Remove = (request: (id: string) => Promise<any>) => {
    return useMutation({
      mutationKey: "DELETE_" + entity,
      mutationFn: (id: string) => request(id),
      onMutate: () => {
        openNotificationLoading("Deleting " + lowerCaseEntity);
      },
      onSettled: () => {
        mutateSettle(lowerCaseEntity);
      },
      onSuccess: (_, id) => {
        openNotificationSuccess("Successfully deleted " + lowerCaseEntity);
        queryClient.setQueryData<any[]>("FETCH_ALL_" + entity, (old) => {
          return old ? old.filter((x) => x.id !== id) : [];
        });
        queryClient.setQueryData<any[]>("FILTER_" + entity, (old) => {
          return old ? old.filter((x) => x.id !== id) : [];
        });
        queryClient.setQueryData(["FETCH_" + entity, id], null);
        queryClient.setQueryData<LookupData[]>("LOOKUP_" + entity, (old) => {
          return old ? old.filter((x) => x.value !== id) : [];
        });
      },
    });
  };

  const RemoveRange = (request: (ids: string[]) => Promise<any>) => {
    return useMutation({
      mutationKey: "DELETE_RANGE_" + entity,
      mutationFn: (ids: string[]) => request(ids),
      onMutate: () => {
        openNotificationLoading("Deleting " + lowerCaseEntity + "s");
      },
      onSettled: () => {
        mutateSettle(lowerCaseEntity);
      },
      onSuccess: (_, ids) => {
        openNotificationSuccess("Successfully deleted " + lowerCaseEntity + " items");
        queryClient.setQueryData<any[]>("FETCH_ALL_" + entity, (old) => {
          return old ? old.filter((x) => !ids.includes(x.id)) : [];
        });
        queryClient.setQueryData<any[]>("FILTER_" + entity, (old) => {
          return old ? old.filter((x) => !ids.includes(x.id)) : [];
        });
        queryClient.setQueryData<LookupData[]>("LOOKUP_" + entity, (old) => {
          return old ? old.filter((x) => !ids.includes(x.value)) : [];
        });
      },
    });
  };

  const Filter = () => {
    return useQuery({
      queryKey: "FILTER_" + entity,
      queryFn: () => null,
      enabled: false,
      initialData: [],
    });
  };

  const ApplyFilter = (request: (filters: QueryFilter[]) => Promise<any[]>) => {
    return useMutation({
      mutationKey: "APPLY_FILTER_" + entity,
      mutationFn: (filters: QueryFilter[]) => request(filters),
      onSuccess: (res) => {
        queryClient.setQueryData("FILTER_" + entity, res);
      },
    });
  };

  const Lookup = (request: () => Promise<LookupData[]>) => {
    return useQuery({
      queryKey: "LOOKUP_" + entity,
      queryFn: request,
      initialData: [],
    });
  };

  return {
    GetAll,
    Get,
    Create,
    CreateRange,
    Update,
    Remove,
    RemoveRange,
    ApplyFilter,
    Filter,
    Lookup,
  };
};
