import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAccessory } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { accessoryRequests } from "@/server/requests/accessory";
import { useMutation, useQuery } from "react-query";
import { userProductKeys } from "./userProduct";

export enum accessoryKeys {
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
  LOOKUP_ACCESSORIES = "LOOKUP_ACCESSORIES",
}

const GetAll = () => {
  return useQuery(accessoryKeys.FETCH_ACCESSORIES, accessoryRequests.getAll);
};

const Get = (id: string) => {
  return useQuery<IAccessory>({
    queryKey: [accessoryKeys.FETCH_ACCESSORY, id],
    queryFn: () => accessoryRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: accessoryKeys.CREATE_ACCESSORY,
    mutationFn: (accessory: IAccessory) => accessoryRequests.create(accessory),
    onSuccess: (accessory) => {
      queryClient.setQueryData<IAccessory[]>(
        accessoryKeys.FETCH_ACCESSORIES,
        (old) => {
          return old ? [...old, accessory] : [accessory];
        }
      );
      queryClient.invalidateQueries(accessoryKeys.LOOKUP_ACCESSORIES);
      queryClient.invalidateQueries(accessoryKeys.FILTER_ACCESSORIES);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: accessoryKeys.CREATE_RANGE_ACCESSORY,
    mutationFn: (accessories: IAccessory[]) =>
      accessoryRequests.createRange(accessories),
    onSuccess: (accessories) => {
      queryClient.setQueryData<IAccessory[]>(
        accessoryKeys.FETCH_ACCESSORIES,
        (old) => {
          return old ? [...old, ...accessories] : accessories;
        }
      );
      queryClient.invalidateQueries(accessoryKeys.LOOKUP_ACCESSORIES);
      queryClient.invalidateQueries(accessoryKeys.FILTER_ACCESSORIES);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: accessoryKeys.UPDATE_ACCESSORY,
    mutationFn: (accessory: IAccessory) => accessoryRequests.update(accessory),
    onSuccess: (accessory) => {
      queryClient.setQueryData<IAccessory[]>(
        accessoryKeys.FETCH_ACCESSORIES,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === accessory.id);
            old[index] = accessory;
            return [...old];
          }
          return [accessory];
        }
      );
      queryClient.setQueryData<IAccessory>(
        [accessoryKeys.FETCH_ACCESSORY, accessory.id],
        accessory
      );
      queryClient.invalidateQueries(accessoryKeys.LOOKUP_ACCESSORIES);
      queryClient.invalidateQueries(accessoryKeys.FILTER_ACCESSORIES);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: accessoryKeys.DELETE_ACCESSORY,
    mutationFn: (id: string) => accessoryRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(accessoryKeys.FETCH_ACCESSORIES);
      queryClient.invalidateQueries(accessoryKeys.LOOKUP_ACCESSORIES);
      queryClient.invalidateQueries(accessoryKeys.FILTER_ACCESSORIES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: accessoryKeys.DELETE_RANGE_ACCESSORY,
    mutationFn: (ids: string[]) => accessoryRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(accessoryKeys.FETCH_ACCESSORIES);
      queryClient.invalidateQueries(accessoryKeys.LOOKUP_ACCESSORIES);
      queryClient.invalidateQueries(accessoryKeys.FILTER_ACCESSORIES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: accessoryKeys.FILTER_ACCESSORIES,
    mutationFn: (filters: QueryFilter[]) => accessoryRequests.filter(filters),
    onSuccess(data: IAccessory[]) {
      queryClient.setQueryData<IAccessory[]>(
        accessoryKeys.FILTER_ACCESSORIES,
        data
      );
    },
  });
};

const Lookup = () => {
  return useQuery(accessoryKeys.LOOKUP_ACCESSORIES, accessoryRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: accessoryKeys.CHECK_IN_ACCESSORY,
    mutationFn: (dto: UserProductCheckInDto) => accessoryRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(userProductKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: accessoryKeys.CHECK_OUT_ACCESSORY,
    mutationFn: (dto: UserProductCheckOutDto) =>
      accessoryRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(userProductKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
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
  Lookup,
  CheckIn,
  CheckOut,
};
