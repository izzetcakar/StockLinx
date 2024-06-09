import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IConsumable } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { consumableRequests } from "@/server/requests/consumable";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_CONSUMABLES = "FETCH_CONSUMABLES",
  FETCH_CONSUMABLE = "FETCH_CONSUMABLE",
  CREATE_CONSUMABLE = "CREATE_CONSUMABLE",
  UPDATE_CONSUMABLE = "UPDATE_CONSUMABLE",
  DELETE_CONSUMABLE = "DELETE_CONSUMABLE",
  CREATE_RANGE_CONSUMABLE = "CREATE_RANGE_CONSUMABLE",
  DELETE_RANGE_CONSUMABLE = "DELETE_RANGE_CONSUMABLE",
  CHECK_IN_CONSUMABLE = "CHECK_IN_CONSUMABLE",
  CHECK_OUT_CONSUMABLE = "CHECK_OUT_CONSUMABLE",
  FILTER_CONSUMABLES = "FILTER_CONSUMABLES",
  LOOKUP_CONSUMABLES = "LOOKUP_CONSUMABLES",
}

const GetAll = () => {
  return useQuery<IConsumable[]>(
    queryKeys.FETCH_CONSUMABLES,
    consumableRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IConsumable>({
    queryKey: [queryKeys.FETCH_CONSUMABLE, id],
    queryFn: () => consumableRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_CONSUMABLE,
    mutationFn: (consumable: IConsumable) =>
      consumableRequests.create(consumable),
    onSuccess: (consumable) => {
      queryClient.invalidateQueries(queryKeys.FETCH_CONSUMABLE);
      queryClient.setQueryData<IConsumable[]>(
        queryKeys.FETCH_CONSUMABLES,
        (old) => {
          return old ? [...old, consumable] : [consumable];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_CONSUMABLE,
    mutationFn: (consumables: IConsumable[]) =>
      consumableRequests.createRange(consumables),
    onSuccess: (consumables) => {
      queryClient.setQueryData<IConsumable[]>(
        queryKeys.FETCH_CONSUMABLES,
        (old) => {
          return old ? [...old, ...consumables] : consumables;
        }
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_CONSUMABLE,
    mutationFn: (consumable: IConsumable) =>
      consumableRequests.update(consumable),
    onSuccess: (consumable) => {
      queryClient.setQueryData<IConsumable[]>(
        queryKeys.FETCH_CONSUMABLES,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === consumable.id);
            old[index] = consumable;
            return [...old];
          }
          return [consumable];
        }
      );
      queryClient.setQueryData<IConsumable>(
        [queryKeys.FETCH_CONSUMABLE, consumable.id],
        consumable
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_CONSUMABLE,
    mutationFn: (id: string) => consumableRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_CONSUMABLES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_CONSUMABLE,
    mutationFn: (ids: string[]) => consumableRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_CONSUMABLES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_CONSUMABLES,
    mutationFn: (filters: QueryFilter[]) => consumableRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IConsumable[]>(
        queryKeys.FILTER_CONSUMABLES,
        data
      );
    },
  });
};

const Lookup = () => {
  return useQuery(queryKeys.LOOKUP_CONSUMABLES, consumableRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: queryKeys.CHECK_IN_CONSUMABLE,
    mutationFn: (dto: UserProductCheckInDto) => consumableRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.CHECK_IN_CONSUMABLE);
      queryClient.invalidateQueries(queryKeys.FETCH_CONSUMABLES);
    },
  });
};

const CheckOut = () => {
  useMutation({
    mutationKey: queryKeys.CHECK_OUT_CONSUMABLE,
    mutationFn: (dto: UserProductCheckOutDto) =>
      consumableRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.CHECK_OUT_CONSUMABLE);
      queryClient.invalidateQueries(queryKeys.FETCH_CONSUMABLES);
    },
  });
};

export const useConsumable = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  Lookup,
  CheckIn,
  CheckOut,
};
