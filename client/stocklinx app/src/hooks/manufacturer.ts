import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IManufacturer } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { manufacturerRequests } from "@/server/requests/manufacturer";
import { useMutation, useQuery } from "react-query";

export enum manufacturerKeys {
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
  LOOKUP_MANUFACTURERS = "LOOKUP_MANUFACTURERS",
}

const GetAll = () => {
  return useQuery<IManufacturer[]>(
    manufacturerKeys.FETCH_MANUFACTURERS,
    manufacturerRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IManufacturer>({
    queryKey: [manufacturerKeys.FETCH_MANUFACTURER, id],
    queryFn: () => manufacturerRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: manufacturerKeys.CREATE_MANUFACTURER,
    mutationFn: (manufacturer: IManufacturer) =>
      manufacturerRequests.create(manufacturer),
    onSuccess: (manufacturer) => {
      queryClient.setQueryData<IManufacturer[]>(
        manufacturerKeys.FETCH_MANUFACTURERS,
        (old) => {
          return old ? [...old, manufacturer] : [manufacturer];
        }
      );
      queryClient.invalidateQueries(manufacturerKeys.LOOKUP_MANUFACTURERS);
      queryClient.invalidateQueries(manufacturerKeys.FILTER_MANUFACTURERS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: manufacturerKeys.CREATE_RANGE_MANUFACTURER,
    mutationFn: (manufacturers: IManufacturer[]) =>
      manufacturerRequests.createRange(manufacturers),
    onSuccess: (manufacturers) => {
      queryClient.setQueryData<IManufacturer[]>(
        manufacturerKeys.FETCH_MANUFACTURERS,
        (old) => {
          return old ? [...old, ...manufacturers] : manufacturers;
        }
      );
      queryClient.invalidateQueries(manufacturerKeys.LOOKUP_MANUFACTURERS);
      queryClient.invalidateQueries(manufacturerKeys.FILTER_MANUFACTURERS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: manufacturerKeys.UPDATE_MANUFACTURER,
    mutationFn: (manufacturer: IManufacturer) =>
      manufacturerRequests.update(manufacturer),
    onSuccess: (manufacturer) => {
      queryClient.setQueryData<IManufacturer[]>(
        manufacturerKeys.FETCH_MANUFACTURERS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === manufacturer.id);
            old[index] = manufacturer;
            return [...old];
          }
          return [manufacturer];
        }
      );
      queryClient.setQueryData<IManufacturer>(
        [manufacturerKeys.FETCH_MANUFACTURER, manufacturer.id],
        manufacturer
      );
      queryClient.invalidateQueries(manufacturerKeys.LOOKUP_MANUFACTURERS);
      queryClient.invalidateQueries(manufacturerKeys.FILTER_MANUFACTURERS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: manufacturerKeys.DELETE_MANUFACTURER,
    mutationFn: (id: string) => manufacturerRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(manufacturerKeys.FETCH_MANUFACTURERS);
      queryClient.invalidateQueries(manufacturerKeys.LOOKUP_MANUFACTURERS);
      queryClient.invalidateQueries(manufacturerKeys.FILTER_MANUFACTURERS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: manufacturerKeys.DELETE_RANGE_MANUFACTURER,
    mutationFn: (ids: string[]) => manufacturerRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(manufacturerKeys.FETCH_MANUFACTURERS);
      queryClient.invalidateQueries(manufacturerKeys.LOOKUP_MANUFACTURERS);
      queryClient.invalidateQueries(manufacturerKeys.FILTER_MANUFACTURERS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: manufacturerKeys.FILTER_MANUFACTURERS,
    mutationFn: (filters: QueryFilter[]) =>
      manufacturerRequests.filter(filters),
    onSuccess(data: IManufacturer[]) {
      queryClient.setQueryData<IManufacturer[]>(
        manufacturerKeys.FILTER_MANUFACTURERS,
        data
      );
    },
  });
};

const Lookup = () => {
  return useQuery(
    manufacturerKeys.LOOKUP_MANUFACTURERS,
    manufacturerRequests.lookup
  );
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
  Lookup,
};
