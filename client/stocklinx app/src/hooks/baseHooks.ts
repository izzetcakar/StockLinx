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
        queryClient.invalidateQueries("LOOKUP_" + entity);
      },
    });
  };

  const Update = (request: (dto: any) => Promise<any>) => {
    return useMutation({
      mutationKey: "UPDATE_" + entity,
      mutationFn: (dto: any) => request(dto),
      onSuccess: (dto) => {
        queryClient.setQueryData<any[]>("FETCH_ALL" + entity, (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === (dto as any)?.id);
            old[index] = dto;
            return [...old];
          }
          return [dto];
        });
        queryClient.setQueryData(["FETCH_" + entity, (dto as any)?.id], dto);
        queryClient.invalidateQueries("LOOKUP_" + entity);
      },
    });
  };

  const Remove = (request: (id: string) => Promise<any>) => {
    return useMutation({
      mutationKey: "DELETE_" + entity,
      mutationFn: (id: string) => request(id),
      onSuccess: () => {
        queryClient.invalidateQueries("FETCH_ALL_" + entity);
        queryClient.invalidateQueries("LOOKUP_" + entity);
      },
    });
  };

  const RemoveRange = (request: (ids: string[]) => Promise<any>) => {
    return useMutation({
      mutationKey: "DELETE_RANGE_" + entity,
      mutationFn: (ids: string[]) => request(ids),
      onSuccess: () => {
        queryClient.invalidateQueries("FETCH_ALL_" + entity);
        queryClient.invalidateQueries("LOOKUP_" + entity);
      },
    });
  };

  const Filter = (request: (filters: QueryFilter[]) => Promise<any[]>) => {
    return useMutation({
      mutationKey: "FILTER_" + entity,
      mutationFn: (filters: QueryFilter[]) => request(filters),
      onSuccess(data: any[]) {
        queryClient.setQueryData<any[]>("FETCH_ALL_" + entity, data);
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
    Filter,
    Lookup,
  };
};
