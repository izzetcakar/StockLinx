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
  return useQuery<IAccessory[]>(
    queryKeys.FETCH_ACCESSORIES,
    accessoryRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IAccessory>({
    queryKey: [queryKeys.FETCH_ACCESSORY, id],
    queryFn: () => accessoryRequests.get(id),
  });
};

const Create = (accessory: IAccessory) => {
  return useMutation<IAccessory>({
    mutationKey: queryKeys.CREATE_ACCESSORY,
    mutationFn: () => accessoryRequests.create(accessory),
    onSuccess: () => {
      queryClient.setQueryData<IAccessory[]>(
        queryKeys.CREATE_ACCESSORY,
        (old) => {
          return old ? [...old, accessory] : [accessory];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORIES);
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORY);
    },
  });
};

const CreateRange = (accessorıes: IAccessory[]) => {
  return useMutation<IAccessory[]>({
    mutationKey: queryKeys.CREATE_RANGE_ACCESSORY,
    mutationFn: () => accessoryRequests.createRange(accessorıes),
    onSuccess: () => {
      queryClient.setQueriesData<IAccessory[]>(
        queryKeys.CREATE_RANGE_ACCESSORY,
        (old) => {
          return old ? [...old, ...accessorıes] : accessorıes;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_ACCESSORY);
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORIES);
    },
  });
};

const Update = (accessory: IAccessory) => {
  return useMutation<IAccessory>({
    mutationKey: queryKeys.UPDATE_ACCESSORY,
    mutationFn: () => accessoryRequests.update(accessory),
    onSuccess: () => {
      queryClient.setQueryData<IAccessory[]>(
        queryKeys.UPDATE_ACCESSORY,
        (old) => {
          return old
            ? old.map((item) => (item.id === accessory.id ? accessory : item))
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_ACCESSORY);
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORIES);
      queryClient.invalidateQueries([queryKeys.FETCH_ACCESSORY, accessory.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_ACCESSORY,
    mutationFn: () => accessoryRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IAccessory[]>(
        queryKeys.DELETE_ACCESSORY,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_ACCESSORY);
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORIES);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_ACCESSORY,
    mutationFn: () => accessoryRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IAccessory[]>(
        queryKeys.DELETE_RANGE_ACCESSORY,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_ACCESSORY);
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORIES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_ACCESSORIES,
    mutationFn: (filters: QueryFilter[]) => accessoryRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IAccessory[]>(
        queryKeys.FILTER_ACCESSORIES,
        data
      );
    },
  });
};

const CheckIn = () => {
  useMutation({
    mutationKey: queryKeys.CHECK_IN_ACCESSORY,
    mutationFn: (dto: UserProductCheckInDto) => accessoryRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.CHECK_IN_ACCESSORY);
      queryClient.invalidateQueries(queryKeys.FETCH_ACCESSORIES);
    },
  });
};

const CheckOut = () => {
  useMutation({
    mutationKey: queryKeys.CHECK_OUT_ACCESSORY,
    mutationFn: (dto: UserProductCheckOutDto) =>
      accessoryRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.CHECK_OUT_ACCESSORY);
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
