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
}

const GetAll = () => {
  return useQuery<IConsumable[]>(
    queryKeys.FETCH_CONSUMABLES,
    consumableRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<IConsumable>({
    queryKey: [queryKeys.FETCH_CONSUMABLE, id],
    queryFn: () => consumableRequests.get(id),
  });
};

const Create =(consumable: IConsumable) => {
  return useMutation<IConsumable>({
    mutationKey: queryKeys.CREATE_CONSUMABLE,
    mutationFn: () => consumableRequests.create(consumable),
    onSuccess: () => {
      queryClient.setQueryData<IConsumable[]>(
        queryKeys.CREATE_CONSUMABLE,
        (old) => {
          return old ? [...old, consumable] : [consumable];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_CONSUMABLES);
      queryClient.invalidateQueries(queryKeys.FETCH_CONSUMABLE);
    },
  });
};

const CreateRange = (consumables: IConsumable[]) => {
  return useMutation<IConsumable[]>({
    mutationKey: queryKeys.CREATE_RANGE_CONSUMABLE,
    mutationFn: () => consumableRequests.createRange(consumables),
    onSuccess: () => {
      queryClient.setQueriesData<IConsumable[]>(
        queryKeys.CREATE_RANGE_CONSUMABLE,
        (old) => {
          return old ? [...old, ...consumables] : consumables;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_CONSUMABLE);
      queryClient.invalidateQueries(queryKeys.FETCH_CONSUMABLES);
    },
  });
};

const Update = (consumable: IConsumable) => {
  return useMutation<IConsumable>({
    mutationKey: queryKeys.UPDATE_CONSUMABLE,
    mutationFn: () => consumableRequests.update(consumable),
    onSuccess: () => {
      queryClient.setQueryData<IConsumable[]>(
        queryKeys.UPDATE_CONSUMABLE,
        (old) => {
          return old
            ? old.map((item) => (item.id === consumable.id ? consumable : item))
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_CONSUMABLE);
      queryClient.invalidateQueries(queryKeys.FETCH_CONSUMABLES);
      queryClient.invalidateQueries([
        queryKeys.FETCH_CONSUMABLE,
        consumable.id,
      ]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_CONSUMABLE,
    mutationFn: () => consumableRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IConsumable[]>(
        queryKeys.DELETE_CONSUMABLE,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_CONSUMABLE);
      queryClient.invalidateQueries(queryKeys.FETCH_CONSUMABLES);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_CONSUMABLE,
    mutationFn: () => consumableRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IConsumable[]>(
        queryKeys.DELETE_RANGE_CONSUMABLE,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_CONSUMABLE);
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
  CheckIn,
  CheckOut,
};
