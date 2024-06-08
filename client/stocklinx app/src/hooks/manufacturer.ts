import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IManufacturer } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { manufacturerRequests } from "@/server/requests/manufacturer";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_MANUFACTURERS = "FETCH_MANUFACTURERS",
  FETCH_MANUFACTURER = "FETCH_MANUFACTURER",
  CREATE_MANUFACTURER = "CREATE_MANUFACTURER",
  UPDATE_MANUFACTURER = "UPDATE_MANUFACTURER",
  DELETE_MANUFACTURER = "DELETE_MANUFACTURER",
  CREATE_RANGE_MANUFACTURER = "CREATE_RANGE_MANUFACTURER",
  DELETE_RANGE_MANUFACTURER = "DELETE_RANGE_MANUFACTURER",
  CHECK_IN_MANUFACTURER = "CHECK_IN_MANUFACTURER",
  CHECK_OUT_MANUFACTURER = "CHECK_OUT_MANUFACTURER",
  FILTER_MANUFACTURERS = "FILTER_MANUFACTURERS",
}

const GetAll = () => {
  return useQuery<IManufacturer[]>(
    queryKeys.FETCH_MANUFACTURERS,
    manufacturerRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<IManufacturer>({
    queryKey: [queryKeys.FETCH_MANUFACTURER, id],
    queryFn: () => manufacturerRequests.get(id),
  });
};

const Create =(manufacturer: IManufacturer) => {
  return useMutation<IManufacturer>({
    mutationKey: queryKeys.CREATE_MANUFACTURER,
    mutationFn: () => manufacturerRequests.create(manufacturer),
    onSuccess: () => {
      queryClient.setQueryData<IManufacturer[]>(
        queryKeys.CREATE_MANUFACTURER,
        (old) => {
          return old ? [...old, manufacturer] : [manufacturer];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_MANUFACTURERS);
      queryClient.invalidateQueries(queryKeys.FETCH_MANUFACTURER);
    },
  });
};

const CreateRange = (manufacturers: IManufacturer[]) => {
  return useMutation<IManufacturer[]>({
    mutationKey: queryKeys.CREATE_RANGE_MANUFACTURER,
    mutationFn: () => manufacturerRequests.createRange(manufacturers),
    onSuccess: () => {
      queryClient.setQueriesData<IManufacturer[]>(
        queryKeys.CREATE_RANGE_MANUFACTURER,
        (old) => {
          return old ? [...old, ...manufacturers] : manufacturers;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_MANUFACTURER);
      queryClient.invalidateQueries(queryKeys.FETCH_MANUFACTURERS);
    },
  });
};

const Update = (manufacturer: IManufacturer) => {
  return useMutation<IManufacturer>({
    mutationKey: queryKeys.UPDATE_MANUFACTURER,
    mutationFn: () => manufacturerRequests.update(manufacturer),
    onSuccess: () => {
      queryClient.setQueryData<IManufacturer[]>(
        queryKeys.UPDATE_MANUFACTURER,
        (old) => {
          return old
            ? old.map((item) =>
                item.id === manufacturer.id ? manufacturer : item
              )
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_MANUFACTURER);
      queryClient.invalidateQueries(queryKeys.FETCH_MANUFACTURERS);
      queryClient.invalidateQueries([
        queryKeys.FETCH_MANUFACTURER,
        manufacturer.id,
      ]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_MANUFACTURER,
    mutationFn: () => manufacturerRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IManufacturer[]>(
        queryKeys.DELETE_MANUFACTURER,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_MANUFACTURER);
      queryClient.invalidateQueries(queryKeys.FETCH_MANUFACTURERS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_MANUFACTURER,
    mutationFn: () => manufacturerRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IManufacturer[]>(
        queryKeys.DELETE_RANGE_MANUFACTURER,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_MANUFACTURER);
      queryClient.invalidateQueries(queryKeys.FETCH_MANUFACTURERS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_MANUFACTURERS,
    mutationFn: (filters: QueryFilter[]) =>
      manufacturerRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IManufacturer[]>(
        queryKeys.FILTER_MANUFACTURERS,
        data
      );
    },
  });
};

export const useManufacturer = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
};
