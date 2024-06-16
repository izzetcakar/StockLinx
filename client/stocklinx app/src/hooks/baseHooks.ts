import { LookupData, QueryFilter } from "@/interfaces/gridTableInterfaces";
import { queryClient } from "@/main";
import { useMutation, useQuery } from "react-query";

export const baseHooks = (entity: string) => {
  const GetAll = (request: () => Promise<any[]>) => {
    return useQuery("FETCH_ALL_" + entity, request);
  };

  const Get = (id: string, request: (id: string) => Promise<any>) => {
    return useQuery({
      queryKey: ["FETCH_" + entity, id],
      queryFn: () => request(id),
    });
  };

  const Create = (request: (dto: any) => Promise<any>) => {
    return useMutation({
      mutationKey: "CREATE_" + entity,
      mutationFn: (dto: any) => request(dto),
      onSuccess: (dto) => {
        queryClient.setQueryData<any[]>("FETCH_ALL_" + entity, (old) => {
          return old ? [...old, dto] : [dto];
        });
        queryClient.setQueryData<any[]>("FILTER_" + entity, (old) => {
          return old ? [...old, dto] : [dto];
        });
        queryClient.invalidateQueries("LOOKUP_" + entity);
      },
    });
  };

  const CreateRange = (request: (dto: any) => Promise<any[]>) => {
    return useMutation({
      mutationKey: "CREATE_RANGE_" + entity,
      mutationFn: (dtos: any[]) => request(dtos),
      onSuccess: (dtos) => {
        queryClient.setQueryData<any[]>("FETCH_ALL_" + entity, (old) => {
          return old ? [...old, ...dtos] : dtos;
        });
        queryClient.setQueryData<any[]>("FILTER_" + entity, (old) => {
          return old ? [...old, ...dtos] : dtos;
        });
        queryClient.invalidateQueries("LOOKUP_" + entity);
      },
    });
  };

  const Update = (request: (dto: any) => Promise<any>) => {
    return useMutation({
      mutationKey: "UPDATE_" + entity,
      mutationFn: (dto: any) => request(dto),
      onSuccess: (dto) => {
        queryClient.setQueryData("FETCH_ALL" + entity, (old) => {
          old ? (old as any[]).map((x) => (x.id === dto.id ? dto : x)) : [dto];
        });
        queryClient.setQueryData("FILTER_" + entity, (old) => {
          old ? (old as any[]).map((x) => (x.id === dto.id ? dto : x)) : [dto];
        });
        queryClient.setQueryData(["FETCH_" + entity, dto.id], dto);
        queryClient.invalidateQueries("LOOKUP_" + entity);
      },
    });
  };

  const Remove = (request: (id: string) => Promise<any>) => {
    return useMutation({
      mutationKey: "DELETE_" + entity,
      mutationFn: (id: string) => request(id),
      onSuccess: (_, id) => {
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
      onSuccess: (_, ids) => {
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

  const Filter = (
    filters: QueryFilter[],
    request: (filters: QueryFilter[]) => Promise<any[]>
  ) => {
    return useQuery({
      queryKey: "FILTER_" + entity,
      queryFn: () => request(filters),
      enabled: false,
    });
  };

  const ApplyFilter = (request: (filters: QueryFilter[]) => Promise<any[]>) => {
    return useMutation({
      mutationKey: "APPLY_FILTER_" + entity,
      mutationFn: (filters: QueryFilter[]) => request(filters),
      onSuccess: (filters) => {
        queryClient.setQueryData("FILTER_" + entity, filters);
      },
    });
  };

  const Lookup = (request: () => Promise<LookupData[]>) => {
    return useQuery("LOOKUP_" + entity, request);
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
