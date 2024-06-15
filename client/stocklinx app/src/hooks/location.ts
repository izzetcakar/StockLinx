import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { ILocation } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { locationRequests } from "@/server/requests/location";
import { useMutation, useQuery } from "react-query";

export enum locationKeys {
  FETCH_LOCATIONS = "FETCH_LOCATIONS",
  FETCH_LOCATION = "FETCH_LOCATION",
  CREATE_LOCATION = "CREATE_LOCATION",
  UPDATE_LOCATION = "UPDATE_LOCATION",
  DELETE_LOCATION = "DELETE_LOCATION",
  CREATE_RANGE_LOCATION = "CREATE_RANGE_LOCATION",
  DELETE_RANGE_LOCATION = "DELETE_RANGE_LOCATION",
  CHECK_IN_LOCATION = "CHECK_IN_LOCATION",
  CHECK_OUT_LOCATION = "CHECK_OUT_LOCATION",
  FILTER_LOCATIONS = "FILTER_LOCATIONS",
  LOOKUP_LOCATIONS = "LOOKUP_LOCATIONS",
}

const GetAll = () => {
  return useQuery<ILocation[]>(
    locationKeys.FETCH_LOCATIONS,
    locationRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<ILocation>({
    queryKey: [locationKeys.FETCH_LOCATION, id],
    queryFn: () => locationRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: locationKeys.CREATE_LOCATION,
    mutationFn: (location: ILocation) => locationRequests.create(location),
    onSuccess: (location) => {
      queryClient.setQueryData<ILocation[]>(
        locationKeys.FETCH_LOCATIONS,
        (old) => {
          return old ? [...old, location] : [location];
        }
      );
      queryClient.invalidateQueries(locationKeys.LOOKUP_LOCATIONS);
      queryClient.invalidateQueries(locationKeys.FILTER_LOCATIONS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: locationKeys.CREATE_RANGE_LOCATION,
    mutationFn: (locations: ILocation[]) =>
      locationRequests.createRange(locations),
    onSuccess: (locations) => {
      queryClient.setQueryData<ILocation[]>(
        locationKeys.FETCH_LOCATIONS,
        (old) => {
          return old ? [...old, ...locations] : locations;
        }
      );
      queryClient.invalidateQueries(locationKeys.LOOKUP_LOCATIONS);
      queryClient.invalidateQueries(locationKeys.FILTER_LOCATIONS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: locationKeys.UPDATE_LOCATION,
    mutationFn: (location: ILocation) => locationRequests.update(location),
    onSuccess: (location) => {
      queryClient.setQueryData<ILocation[]>(
        locationKeys.FETCH_LOCATIONS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === location.id);
            old[index] = location;
            return [...old];
          }
          return [location];
        }
      );
      queryClient.setQueryData<ILocation>(
        [locationKeys.FETCH_LOCATION, location.id],
        location
      );
      queryClient.invalidateQueries(locationKeys.LOOKUP_LOCATIONS);
      queryClient.invalidateQueries(locationKeys.FILTER_LOCATIONS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: locationKeys.DELETE_LOCATION,
    mutationFn: (id: string) => locationRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(locationKeys.FETCH_LOCATIONS);
      queryClient.invalidateQueries(locationKeys.LOOKUP_LOCATIONS);
      queryClient.invalidateQueries(locationKeys.FILTER_LOCATIONS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: locationKeys.DELETE_RANGE_LOCATION,
    mutationFn: (ids: string[]) => locationRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(locationKeys.FETCH_LOCATIONS);
      queryClient.invalidateQueries(locationKeys.LOOKUP_LOCATIONS);
      queryClient.invalidateQueries(locationKeys.FILTER_LOCATIONS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: locationKeys.FILTER_LOCATIONS,
    mutationFn: (filters: QueryFilter[]) => locationRequests.filter(filters),
    onSuccess(data: ILocation[]) {
      queryClient.setQueryData<ILocation[]>(
        locationKeys.FILTER_LOCATIONS,
        data
      );
    },
  });
};

const Lookup = () => {
  return useQuery(locationKeys.LOOKUP_LOCATIONS, locationRequests.lookup);
};

export const useLocation = {
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
