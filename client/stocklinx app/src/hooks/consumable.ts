import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IConsumable } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { consumableRequests } from "@/server/requests/consumable";
import { useMutation, useQuery } from "react-query";
import { userProductKeys } from "./userProduct";

export enum consumableKeys {
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
    consumableKeys.FETCH_CONSUMABLES,
    consumableRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IConsumable>({
    queryKey: [consumableKeys.FETCH_CONSUMABLE, id],
    queryFn: () => consumableRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: consumableKeys.CREATE_CONSUMABLE,
    mutationFn: (consumable: IConsumable) =>
      consumableRequests.create(consumable),
    onSuccess: (consumable) => {
      queryClient.setQueryData<IConsumable[]>(
        consumableKeys.FETCH_CONSUMABLES,
        (old) => {
          return old ? [...old, consumable] : [consumable];
        }
      );
      queryClient.invalidateQueries(consumableKeys.LOOKUP_CONSUMABLES);
      queryClient.invalidateQueries(consumableKeys.FILTER_CONSUMABLES);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: consumableKeys.CREATE_RANGE_CONSUMABLE,
    mutationFn: (consumables: IConsumable[]) =>
      consumableRequests.createRange(consumables),
    onSuccess: (consumables) => {
      queryClient.setQueryData<IConsumable[]>(
        consumableKeys.FETCH_CONSUMABLES,
        (old) => {
          return old ? [...old, ...consumables] : consumables;
        }
      );
      queryClient.invalidateQueries(consumableKeys.LOOKUP_CONSUMABLES);
      queryClient.invalidateQueries(consumableKeys.FILTER_CONSUMABLES);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: consumableKeys.UPDATE_CONSUMABLE,
    mutationFn: (consumable: IConsumable) =>
      consumableRequests.update(consumable),
    onSuccess: (consumable) => {
      queryClient.setQueryData<IConsumable[]>(
        consumableKeys.FETCH_CONSUMABLES,
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
        [consumableKeys.FETCH_CONSUMABLE, consumable.id],
        consumable
      );
      queryClient.invalidateQueries(consumableKeys.LOOKUP_CONSUMABLES);
      queryClient.invalidateQueries(consumableKeys.FILTER_CONSUMABLES);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: consumableKeys.DELETE_CONSUMABLE,
    mutationFn: (id: string) => consumableRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(consumableKeys.FETCH_CONSUMABLES);
      queryClient.invalidateQueries(consumableKeys.LOOKUP_CONSUMABLES);
      queryClient.invalidateQueries(consumableKeys.FILTER_CONSUMABLES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: consumableKeys.DELETE_RANGE_CONSUMABLE,
    mutationFn: (ids: string[]) => consumableRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(consumableKeys.FETCH_CONSUMABLES);
      queryClient.invalidateQueries(consumableKeys.LOOKUP_CONSUMABLES);
      queryClient.invalidateQueries(consumableKeys.FILTER_CONSUMABLES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: consumableKeys.FILTER_CONSUMABLES,
    mutationFn: (filters: QueryFilter[]) => consumableRequests.filter(filters),
    onSuccess(data: IConsumable[]) {
      queryClient.setQueryData<IConsumable[]>(
        consumableKeys.FILTER_CONSUMABLES,
        data
      );
    },
  });
};

const Lookup = () => {
  return useQuery(consumableKeys.LOOKUP_CONSUMABLES, consumableRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: consumableKeys.CHECK_IN_CONSUMABLE,
    mutationFn: (dto: UserProductCheckInDto) => consumableRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(userProductKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: consumableKeys.CHECK_OUT_CONSUMABLE,
    mutationFn: (dto: UserProductCheckOutDto) =>
      consumableRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(userProductKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
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
