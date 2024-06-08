import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAccessory } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { accessoryRequests } from "@/server/requests/accessory";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_ACCESSORIES = "FETCH_ACCESSORIES",
  FETCH_ACCESSORY = "FETCH_ACCESSORY",
  CREATE_ACCESSORY = "CREATE_ACCESSORY",
  UPDATE_ACCESSORY = "UPDATE_ACCESSORY",
  DELETE_ACCESSORY = "DELETE_ACCESSORY",
  CREATE_RANGE_ACCESSORY = "CREATE_RANGE_ACCESSORY",
  DELETE_RANGE_ACCESSORY = "DELETE_RANGE_ACCESSORY",
  CHECK_IN_ACCESSORY = "CHECK_IN_ACCESSORY",
  CHECK_OUT_ACCESSORY = "CHECK_OUT_ACCESSORY",
  FILTER_ACCESSORIES = "FILTER_ACCESSORIES",
}

const GetAll = () => {
  return useQuery(queryKeys.FETCH_ACCESSORIES, accessoryRequests.getAll);
};

const Get = (id: string) => {
  return useQuery<IAccessory>({
    queryKey: [queryKeys.FETCH_ACCESSORY, id],
    queryFn: () => accessoryRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_ACCESSORY,
    mutationFn: (accessory: IAccessory) => accessoryRequests.create(accessory),
    onSuccess: (accessory) => {
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORY);
      queryClient.setQueryData<IAccessory[]>(
        queryKeys.FETCH_ACCESSORIES,
        (old) => {
          return old ? [...old, accessory] : [accessory];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_ACCESSORY,
    mutationFn: (accessorıes: IAccessory[]) =>
      accessoryRequests.createRange(accessorıes),
    onSuccess: (accessories) => {
      queryClient.setQueryData<IAccessory[]>(
        queryKeys.FETCH_ACCESSORIES,
        (old) => {
          return old ? [...old, ...accessories] : accessories;
        }
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_ACCESSORY,
    mutationFn: (accessory: IAccessory) => accessoryRequests.update(accessory),
    onSuccess: (accesory) => {
      queryClient.setQueryData<IAccessory[]>(
        queryKeys.FETCH_ACCESSORIES,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === accesory.id);
            old[index] = accesory;
            return [...old];
          }
          return [accesory];
        }
      );
      queryClient.setQueryData<IAccessory>(
        [queryKeys.FETCH_ACCESSORY, accesory.id],
        accesory
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_ACCESSORY,
    mutationFn: (id: string) => accessoryRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORIES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_ACCESSORY,
    mutationFn: (ids: string[]) => accessoryRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORIES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_ACCESSORIES,
    mutationFn: (filters: QueryFilter[]) => accessoryRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IAccessory[]>(queryKeys.FETCH_ACCESSORIES, data);
    },
  });
};

const CheckIn = () => {
  useMutation({
    mutationKey: queryKeys.CHECK_IN_ACCESSORY,
    mutationFn: (dto: UserProductCheckInDto) => accessoryRequests.checkIn(dto),
    onSuccess: (dto) => {
      queryClient.invalidateQueries([
        queryKeys.FETCH_ACCESSORY,
        dto.accessoryId,
      ]);
    },
  });
};

const CheckOut = () => {
  useMutation({
    mutationKey: queryKeys.CHECK_OUT_ACCESSORY,
    mutationFn: (dto: UserProductCheckOutDto) =>
      accessoryRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORY);
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORIES);
    },
  });
};

export const useAccessory = {
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